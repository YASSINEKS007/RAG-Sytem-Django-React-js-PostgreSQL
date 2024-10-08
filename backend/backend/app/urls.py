from django.urls import path
from .views import upload_file, list_files, search_query, get_chat_history

urlpatterns = [
    path("upload/", upload_file, name="upload_file"),
    path("files/", list_files, name="list_files"),
    path("response/", search_query, name="search_query"),
    path("chat-history/", get_chat_history, name="chat-history"),
]
