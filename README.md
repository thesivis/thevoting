# thevoting

## Criando ambiente

```
virtualenv -p /usr/bin/python3.6 venv
source venv/bin/activate
pip install djangorestframework
pip install django
pip install django-cors-headers
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

Ainda nesse arquivo vamos permitir a conexão local.

Na seção INSTALLED_APPS adicione:
```
'corsheaders',
```
Já na seção de MIDDLEWARE adicione antes de CommonMiddleware:

```
'corsheaders.middleware.CorsMiddleware',
'django.middleware.common.CommonMiddleware',
```
E por fim ao final do arquivo adicione:

```
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False
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

## Configurando as urls

No arquivo thevotingapp/urls.py configure:

```
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^votacao/$', views.VotacaoList.as_view(), name='votacao-list'),
    url(r'^votacao/(?P<pk>[0-9]+)/$', views.VotacaoList.as_view(), name='votacao-detail'),
]
```

E no arquivo thevotingapi/urls.py:

```
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

urlpatterns = [
    url(r'^', include('thevotingapp.urls')),
    path('admin/', admin.site.urls),
]
```

## Configurando a paginação

No arquivo thevotingapi/settings.py adicione para ter a paginação na requisição:

```
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
```

## Testando as requisições

Para inserir um valor teste:

```
curl -X POST http://127.0.0.1:8000/votacao/ -H 'content-type: application/json' -d '{"nome": "teste", "documento": "01191249123","ativo": true,"dataInicio":"2019-05-08","dataFim":"2019-05-09"}'
```

Para listar os valores:
```
curl -X GET http://127.0.0.1:8000/votacao/ -H 'Aceppt: application/json'
curl -X GET http://127.0.0.1:8000/votacao/?page=2 -H 'Aceppt: application/json'
```


# Criando o projeto react para UI

Com o create-react-app instado digite:

```
create-react-app thevoting-ui
cd thevoting-ui
npm install --save react-router-dom react-bootstrap bootstrap jquery react-global-configuration react-bootstrap-table moment react-moment react react-dom react-scripts react-datepicker
```

## Configuração global 

```
import config from 'react-global-configuration';

config.set({ 
  url: 'http://localhost:8000/'
});
```

E use como:
```
config.get('url')
```

## Adicionando bootstrap
No arquivo index.js
```
import "bootstrap/dist/css/bootstrap.css";
```

## Trocar conteudo sem recarregar
No arquivo index.js

```
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Votacao from "./componentes/Votacao.js";
...

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/votacao" component={Votacao} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Paginação no BootstrapTable
```
constructor
    this.onPageChange = this.onPageChange.bind(this);

...

onPageChange(page, sizePerPage) {
    fetch(config.get('url')+'votacao/?page='+page)
        //.then( response => response.json())
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(data => this.setState({ votacoes : data, currentPage: page}));
}

...    

remote={true} pagination={true} fetchInfo={ { dataTotalSize: this.state.votacoes.count } }
     options={ { noDataText: 'Vazio', onPageChange: this.onPageChange,
        page: this.props.currentPage, hideSizePerPage: true
      } }
```

## Formatando data na tabela

```
import moment from 'moment';
```

Fora da classe adicione:
```
function dateFormatter(cell, row) {
    var date = cell;
    if(date)
        return moment.utc(date).format('DD/MM/YYYY');
    else return "";
}
```

E na coluna coloque:

```
<TableHeaderColumn dataField='dataInicio' width='120' dataFormat={dateFormatter}>Início</TableHeaderColumn>

```
