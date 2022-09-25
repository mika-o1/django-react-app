import time

from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_app import serializers
from django_app import models


# Create your views here.

def index(request):
    context = {}
    return render(request, 'index.html', context)


@api_view(http_method_names=['GET', 'POST', 'PUT', 'PUTCH', 'DELETE', 'OPTIONS'])
@permission_classes([AllowAny])
def users(request):
    time.sleep(2)
    if request.method == "GET":
        page = int(request.GET.get("page", 1))
        limit = int(request.GET.get("limit", 3))

        user_list = User.objects.all()
        paginator_obj = Paginator(user_list, limit)
        current_page = paginator_obj.get_page(page).object_list
        serialized_user_list = serializers.UserSerializer(instance=current_page, many=True).data

        response = {"list": serialized_user_list, "x-total-count": len(user_list)}
        return Response(data=response)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(http_method_names=['GET', 'POST', 'PUT', 'PUTCH', 'DELETE', 'OPTIONS'])
@permission_classes([AllowAny])
def chat(request, sms_id=None):
    time.sleep(2)

    try:
        if sms_id:
            if request.method == "GET":
                obj = models.TextModel.objects.get(id=sms_id)
                serialized_object = serializers.ChatSerializer(instance=obj, many=False).data
                return Response(data=serialized_object, status=status.HTTP_200_OK)
            elif request.method == "PUT" and request.method == "PUTCH":
                text = str(request.POST.get("text", ""))
                if text:
                    models.TextModel.objects.create(
                        user=User.objects.get(id=1),
                        text=text,
                    )
                return Response(status=status.HTTP_201_CREATED)
            elif request.method == "DELETE":
                obj = models.TextModel.objects.get(id=sms_id)
                obj.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            if request.method == "GET":
                page = int(request.GET.get("page", 1))
                limit = int(request.GET.get("limit", 3))

                object_list = models.TextModel.objects.all()
                paginator_obj = Paginator(object_list, limit)
                current_page = paginator_obj.get_page(page).object_list
                serialized_object_list = serializers.ChatSerializer(instance=current_page, many=True).data

                response = {"list": serialized_object_list, "x-total-count": len(object_list)}
                return Response(data=response, status=status.HTTP_200_OK)
            elif request.method == "POST":
                text = str(request.POST.get("text", ""))
                if text:
                    models.TextModel.objects.create(
                        text=text,
                    )
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as error:
        print(f"error: {error}")
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)