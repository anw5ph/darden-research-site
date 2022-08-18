from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'daos/index.html')


def paneView(request):
    return render(request, 'daos/panes.html')
