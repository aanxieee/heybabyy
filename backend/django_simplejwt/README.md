Django REST Framework + SimpleJWT auth skeleton

Install:

```
pip install django djangorestframework djangorestframework-simplejwt
```

settings.py:

```
INSTALLED_APPS = [
  'rest_framework',
  'rest_framework_simplejwt',
  'django.contrib.auth',
]

REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': (
    'rest_framework_simplejwt.authentication.JWTAuthentication',
  ),
}
```

urls.py:

```
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView, LogoutView

urlpatterns = [
  path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/auth/register/', RegisterView.as_view(), name='register'),
  path('api/auth/me/', MeView.as_view(), name='me'),
  path('api/auth/logout/', LogoutView.as_view(), name='logout'),
]
```

views.py:

```
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name')
        if not email or not password:
            return Response({'detail': 'email and password required'}, status=400)
        if User.objects.filter(username=email).exists():
            return Response({'detail': 'user exists'}, status=400)
        user = User.objects.create_user(username=email, email=email, password=password)
        if full_name and ' ' in full_name:
            first, last = full_name.split(' ', 1)
            user.first_name = first
            user.last_name = last
            user.save()
        return Response({'id': user.id, 'email': user.email, 'full_name': user.get_full_name()}, status=201)

class MeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        u = request.user
        return Response({'id': u.id, 'email': u.email, 'full_name': u.get_full_name() or u.username})

class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        # If using token blacklisting add blacklist logic here
        return Response({'detail': 'ok'})
```

This aligns with the frontend AuthApi. Replace or extend according to your domain model.
