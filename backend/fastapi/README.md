FastAPI skeleton matching frontend routes

Expected endpoints:
- POST /api/auth/login/ { email, password } -> { access, user }
- POST /api/auth/register/ { email, password, full_name } -> 201
- GET  /api/auth/me/ -> { id, email, full_name }
- POST /api/auth/logout/ -> 204 (client deletes token)

Quick start:
- python -m venv .venv
- .venv/Scripts/activate
- pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] pydantic-settings
- create main.py with routers/auth.py implementing JWT
