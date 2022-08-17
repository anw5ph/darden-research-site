from django.urls import path
from . import views

app_name = 'daos'
urlpatterns = [
    path('pane_view/', views.paneView, name='pane-view'),
]
