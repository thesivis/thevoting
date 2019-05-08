from django.shortcuts import render

from rest_framework import generics
from .models import Votacao
from .serializers import VotacaoSerializer

# Create your views here.


class VotacaoList(generics.ListCreateAPIView):

    queryset = Votacao.objects.all()
    serializer_class = VotacaoSerializer