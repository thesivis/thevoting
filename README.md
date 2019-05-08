# thevoting

## Criando ambiente

```
virtualenv -p /usr/bin/python3.6 venv
source venv/bin/activate
pip install djangorestframework
pip install django
```

## Criando a aplicação

```
django-admin startproject thevotingapi
cd thevotingapi/
python manage.py startapp thevotingapp
python manage.py migrate
```
