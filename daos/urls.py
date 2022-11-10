from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

app_name = 'daos'
urlpatterns = [
    path('', views.index, name='home'),
    path('pane_view/', views.paneView, name='pane-view'),
    path('week_view/', views.weekView, name='week-view'),

]
