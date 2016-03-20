"""proj_book URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from app_book import views

urlpatterns = [
    url(r'^authors$', views.AuthorList.as_view(), name='author_list'),
    url(r'^edit/(?P<pk>\d+)$', views.BookUpdate.as_view(), name='book_edit'),
    url(r'^add$', views.BookAdd.as_view(), name='book_add'),
    url(r'^latestbook$', views.latestbook, name='latest_book'),
]
