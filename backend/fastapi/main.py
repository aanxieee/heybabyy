from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from contextlib import asynccontextmanager
import time

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("=" * 60)
    print("🎉 HeyBabyy Backend Started!")
    print("=" * 60)
    print("Demo Credentials:")
    print("  📧 Email: 9876543210@demo.com")
    print("  🔑 Password: demo123")
    print("  📱 Mobile: 9876543210")
    print("  🔢 OTP: 123456")
    print("=" * 60)
    print(f"📍 API Docs: http://localhost:8000/docs")
    print("=" * 60)
    yield
    # Shutdown (if needed)

app = FastAPI(title="HeyBabyy Auth API (FastAPI skeleton)", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory demo store (replace with DB)
USERS = {
    "9876543210@demo.com": {
        "id": "demo-user-1",
        "email": "9876543210@demo.com",
        "full_name": "Demo User",
        "password": "demo123"  # WARNING: demo only, hash in real apps
    }
}
TOKENS = {}

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

@app.post("/api/auth/register/")
async def register(payload: RegisterRequest):
    if payload.email in USERS:
        raise HTTPException(status_code=400, detail="User exists")
    USERS[payload.email] = {
        "id": str(len(USERS)+1),
        "email": payload.email,
        "full_name": payload.full_name or "User",
        "password": payload.password,  # WARNING: demo only, hash in real apps
    }
    return {"id": USERS[payload.email]["id"], "email": payload.email, "full_name": USERS[payload.email]["full_name"]}

@app.post("/api/auth/login/")
async def login(payload: LoginRequest):
    u = USERS.get(payload.email)
    if not u or u["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = f"demo-{int(time.time())}-{u['id']}"
    TOKENS[token] = u["email"]
    return {"access": token, "user": {"id": u["id"], "email": u["email"], "full_name": u["full_name"]}}

@app.get("/api/auth/me/")
async def me(authorization: Optional[str] = None):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ",1)[1]
    email = TOKENS.get(token)
    if not email or email not in USERS:
        raise HTTPException(status_code=401, detail="Invalid token")
    u = USERS[email]
    return {"id": u["id"], "email": u["email"], "full_name": u["full_name"]}

@app.post("/api/auth/logout/")
async def logout(authorization: Optional[str] = None):
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ",1)[1]
        TOKENS.pop(token, None)
    return {"detail": "ok"}
