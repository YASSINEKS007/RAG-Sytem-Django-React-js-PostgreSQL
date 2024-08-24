from django.db import models
from django.utils import timezone

class ChatHistory(models.Model):
    question = models.TextField()
    question_timestamp = models.DateTimeField(auto_now_add=True)  # Timestamp for when the question is asked
    answer = models.TextField(null=True, blank=True)
    answer_timestamp = models.DateTimeField(null=True, blank=True)  # Timestamp for when the answer is generated

    

