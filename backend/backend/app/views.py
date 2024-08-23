from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import os
from django.conf import settings


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

    # Save the file to the specified directory
    with open(file_path, "wb+") as destination:
        for chunk in uploaded_file.chunks():
            destination.write(chunk)

    return Response(
        {"message": "File uploaded successfully"}, status=status.HTTP_201_CREATED
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