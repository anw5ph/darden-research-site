from django.shortcuts import render
from django.http import HttpResponse


def paneView(request):
    return render(request, 'daos/panes.html')
