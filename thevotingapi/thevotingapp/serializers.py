from rest_framework import serializers
from .models import Votacao


class VotacaoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Votacao
        fields = '__all__'