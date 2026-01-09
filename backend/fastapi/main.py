from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from contextlib import asynccontextmanager
import time
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "https://heybabyy.openai.azure.com/")
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "")
AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "o4-mini")
AZURE_OPENAI_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")

# TinyBot system prompt for baby care assistant
TINYBOT_SYSTEM_PROMPT = """You are TinyBot, a friendly and knowledgeable AI assistant for HeyBabyy app. 
You specialize in baby care guidance for parents of infants (0-24 months).

Your personality:
- Warm, calm, and reassuring tone
- Use simple, clear language
- Be supportive and non-judgmental
- Always recommend consulting a pediatrician for medical concerns

Your expertise includes:
- Feeding schedules (breastfeeding, formula, solids introduction)
- Sleep routines and safe sleep practices
- Baby development milestones
- Vaccination schedules
- Common baby health concerns
- Diaper and hygiene tips
- Growth tracking guidance

Important rules:
- Never provide medical diagnoses
- Always suggest professional consultation for health concerns
- Keep responses concise but helpful
- Use emojis sparingly to be friendly 👶
- If unsure, say so and recommend consulting a pediatrician
"""

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


# ==============================
# TinyBot Chat Endpoint
# ==============================

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    success: bool

@app.post("/api/chat/", response_model=ChatResponse)
async def chat_with_tiny(payload: ChatRequest):
    """
    Chat with TinyBot using Azure OpenAI
    """
    if not AZURE_OPENAI_API_KEY:
        # Fallback response if Azure not configured
        return ChatResponse(
            reply="I'm TinyBot! 👶 Azure OpenAI is not configured yet. Please set up your API key to enable AI responses. In the meantime, check out our FAQs and Tips sections for baby care guidance!",
            success=False
        )
    
    try:
        # Build messages array
        messages = [{"role": "system", "content": TINYBOT_SYSTEM_PROMPT}]
        
        # Add conversation history
        for msg in payload.history[-10:]:  # Keep last 10 messages for context
            messages.append({"role": msg.role, "content": msg.content})
        
        # Add current user message
        messages.append({"role": "user", "content": payload.message})
        
        # Call Azure OpenAI
        url = f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}"
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                url,
                headers={
                    "Content-Type": "application/json",
                    "api-key": AZURE_OPENAI_API_KEY
                },
                json={
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7
                }
            )
            
            if response.status_code != 200:
                print(f"Azure OpenAI Error: {response.status_code} - {response.text}")
                return ChatResponse(
                    reply=f"Azure Error {response.status_code}: {response.text[:200]}",
                    success=False
                )
            
            data = response.json()
            reply = data["choices"][0]["message"]["content"]
            
            return ChatResponse(reply=reply, success=True)
            
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return ChatResponse(
            reply=f"Error: {str(e)}. Endpoint: {AZURE_OPENAI_ENDPOINT}, Deployment: {AZURE_OPENAI_DEPLOYMENT}",
            success=False
        )

@app.get("/api/chat/health/")
async def chat_health():
    """Check if Azure OpenAI is configured"""
    return {
        "azure_configured": bool(AZURE_OPENAI_API_KEY),
        "endpoint": AZURE_OPENAI_ENDPOINT if AZURE_OPENAI_API_KEY else None,
        "deployment": AZURE_OPENAI_DEPLOYMENT if AZURE_OPENAI_API_KEY else None
    }
