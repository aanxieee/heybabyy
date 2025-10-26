# Minimal Django urls example (place inside your project)
from django.urls import path
from . import views

urlpatterns = [
    path('api/auth/login/', views.login_view, name='login'),
    path('api/auth/register/', views.register_view, name='register'),
    path('api/auth/me/', views.me_view, name='me'),
    path('api/auth/logout/', views.logout_view, name='logout'),
]
