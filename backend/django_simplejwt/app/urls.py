from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView, LogoutView

urlpatterns = [
    path('api/auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/me/', MeView.as_view(), name='me'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
]
