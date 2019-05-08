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

Depois de criados os modelos no arquivo models.py, execute os comandos:

```
python manage.py makemigratios
python manage.py migrate
```
