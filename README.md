# thevoting

## Criando ambiente

```
virtualenv -p /usr/bin/python3.6 venv
source venv/bin/activate
pip install djangorestframework
pip install django
pip install psycopg2
```

## Criando a aplicação

```
django-admin startproject thevotingapi
cd thevotingapi/
python manage.py startapp thevotingapp
python manage.py migrate
```

## Configurando o banco

Edite o arquivo setting.py

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME','thevoting'),
        'USER': os.environ.get('DB_USER','postgres'),
        'PASSWORD': os.environ.get('DB_PASS','123'),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Criando os Modelos

No arquivo thevotingapp/models.py crie os modelos do banco:

```
from django.db import models

class Votacao(models.Model):
    class Meta:
        db_table = "votacao"

    nome = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255, null=True)
    documento = models.CharField(max_length=20)
    ativo = models.BooleanField()
    dataInicio = models.DateField()
    dataFim = models.DateField()
    imagem = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.nome
```

Depois de criados os modelos no arquivo models.py, execute os comandos:

```
python manage.py makemigratios
python manage.py migrate
```

##  Criando os Serializers

Crie o arquivo thevotingapp/serializers.py, e adicione as classes que serão serializadas:

```
from rest_framework import serializers
from .models import Votacao

class VotacaoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Votacao
        fields = '__all__'
```
##  Criando os 'views'

No arquivo thevotingapp/views.py vamos adicionar as 'views' para realizarmos as requisições:

```
from django.shortcuts import render
from rest_framework import generics
from .models import Votacao
from .serializers import VotacaoSerializer

class VotacaoList(generics.ListCreateAPIView):

    queryset = Votacao.objects.all()
    serializer_class = VotacaoSerializer
```
