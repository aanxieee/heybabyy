Django REST skeleton matching frontend routes

Expected endpoints:
- POST /api/auth/login/ { email, password } -> { access, user }
- POST /api/auth/register/ { email, password, full_name } -> 201
- GET  /api/auth/me/ -> { id, email, full_name }
- POST /api/auth/logout/ -> 204

Quick start (optional):
- python -m venv .venv
- .venv/Scripts/activate
- pip install django djangorestframework djangorestframework-simplejwt
- django-admin startproject core .
- python manage.py startapp authapi

Minimal views (pseudo):
- LoginView -> SimpleJWT token_obtain_pair override to include user
- RegisterView -> create user and return 201
- MeView -> IsAuthenticated returns current user
- LogoutView -> blacklist token (optional)
