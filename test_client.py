#coding=utf-8
from django.test import Client
c = Client(enforce_csrf_checks=True)


response = c.post('http://127.0.0.1:8000/votacao/', {'username': 'teste', 'password': 'smith'})
print(response.status_code)
print(response.content)
