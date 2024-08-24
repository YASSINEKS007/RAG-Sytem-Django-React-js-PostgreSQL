import os

from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import os
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores.pgvector import DistanceStrategy
from langchain_postgres.vectorstores import PGVector
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.chains.llm import LLMChain
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.prompts import PromptTemplate
from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector


CONNECTION_STRING = f"postgresql+psycopg://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
embeddings = HuggingFaceEmbeddings()

collection_name = "my_docs"


vector_store = PGVector(
    embeddings=embeddings,
    collection_name=collection_name,
    connection=CONNECTION_STRING,
    use_jsonb=True,
)

llm = Ollama(model="mistral")

prompt = """
1. Use the following pieces of context to answer the question at the end.
2. If you don't know the answer, just say that "I don't know" but don't make up an answer on your own.\n
3. Keep the answer crisp and limited to 3,4 sentences.

Context: {context}

Question: {question}

Helpful Answer:"""


QA_CHAIN_PROMPT = PromptTemplate.from_template(prompt)

llm_chain = LLMChain(llm=llm, prompt=QA_CHAIN_PROMPT, callbacks=None, verbose=False)

document_prompt = PromptTemplate(
    input_variables=["page_content", "source"],
    template="Context:\ncontent:{page_content}\nsource:{source}",
)

combine_documents_chain = StuffDocumentsChain(
    llm_chain=llm_chain,
    document_variable_name="context",
    document_prompt=document_prompt,
    callbacks=None,
    verbose=False,
)


@api_view(["GET"])
@permission_classes([AllowAny])
def list_files(request):
    upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
    files_info = []

    try:
        for filename in os.listdir(upload_dir):
            file_path = os.path.join(upload_dir, filename)
            if os.path.isfile(file_path):
                file_size = os.path.getsize(file_path)
                files_info.append({"name": filename, "size": file_size})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(files_info, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def upload_file(request):
    if "file" not in request.FILES:
        return Response(
            {"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    uploaded_file = request.FILES["file"]
    file_name = uploaded_file.name
    file_path = os.path.join(settings.MEDIA_ROOT, "uploads", file_name)

    with open(file_path, "wb+") as destination:
        for chunk in uploaded_file.chunks():
            destination.write(chunk)

    loader = PDFPlumberLoader(file_path)
    docs = loader.load()

    text_splitter = SemanticChunker(HuggingFaceEmbeddings())
    documents = text_splitter.split_documents(docs)

    vector_store.add_documents(documents)

    return Response(
        {"message": "File uploaded successfully"}, status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def search_query(request):
    query = request.GET.get("query", "")
    print("query is : ", query)

    if not query:
        return Response(
            {"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    qa = RetrievalQA(
        combine_documents_chain=combine_documents_chain,
        verbose=False,
        retriever=retriever,
        return_source_documents=False,
    )

    response = qa({"query": query})
    answer = response.get("result", "No answer found")
    print("Answer:", answer)

    if answer:
        return Response({"answer": answer}, status=status.HTTP_200_OK)

    return Response({"error": "No results found"}, status=status.HTTP_404_NOT_FOUND)
