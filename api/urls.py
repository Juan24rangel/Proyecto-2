from django.urls import path
from . import views
from . import auth_views

urlpatterns = [
    path('canciones/', views.CancionViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('canciones/<int:pk>/', views.CancionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('register/', auth_views.register, name='register'),
]
