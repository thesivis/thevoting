from rest_framework import generics
from .models import Votacao
from .serializers import VotacaoSerializer
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Permission
from django.http import JsonResponse

class VotacaoList(generics.ListCreateAPIView):

    queryset = Votacao.objects.all()
    serializer_class = VotacaoSerializer

class VotacaoDestroyView(generics.DestroyAPIView):
    queryset = Votacao.objects.all()
    serializer_class = VotacaoSerializer

class VotacaoUpdateView(generics.UpdateAPIView):
    queryset = Votacao.objects.all()
    serializer_class = VotacaoSerializer



def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    data = {}
    if(username is not None):
        try:
            print('teste', username)
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            print('criando', username)
            user = User.objects.create_user(username=username, password=password)
        print('*******************',user.pk)
        user = authenticate(username=username, password=password)
        print('-------------',user)
        if user is not None:
            # the password verified for the user
            if user.is_active:
                login(request, user)
                data["login"] = "Sucesso"
                return JsonResponse(data)
    data["login"] = "Failed"
    return JsonResponse(data)
