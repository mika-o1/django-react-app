from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django_app import models


# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['url', 'username', 'email', 'is_staff']
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TextModel
        # fields = ['url', 'username', 'email', 'is_staff']
        fields = '__all__'
