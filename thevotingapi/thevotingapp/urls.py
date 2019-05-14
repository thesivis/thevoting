"""thevotingapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.conf.urls import url
from rest_framework.authtoken import views as v

urlpatterns = [
    url(r'^votacao/$', views.VotacaoList.as_view(), name='votacao-list'),
    url(r'^votacao/(?P<pk>[0-9]+)/$', views.VotacaoList.as_view(), name='votacao-detail'),
    url(r'^api-token-auth/$', views.CustomAuthToken.as_view(),name='api-token-auth'),
    url(r'^login/$', views.login_user,name='login_user'),
]

