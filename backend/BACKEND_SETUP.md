# HeyBabyy - Backend Setup

## Quick Start - Choose One Option:

### Option 1: Demo Mode (No Backend Required) ✅ RECOMMENDED FOR TESTING
1. The `.env.local` file is already configured with `VITE_DEMO_AUTH=true`
2. Restart your Vite dev server:
   ```powershell
   npm run dev
   ```
3. The app will use fake authentication without needing a backend

### Option 2: Run FastAPI Backend

#### Prerequisites
- Python 3.8+ installed
- pip installed

#### Steps

1. **Navigate to FastAPI directory:**
   ```powershell
   cd backend/fastapi
   ```

2. **Create virtual environment:**
   ```powershell
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

4. **Install dependencies:**
   ```powershell
   pip install fastapi uvicorn pydantic
   ```

5. **Run the server:**
   ```powershell
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Update `.env.local` in project root:**
   ```env
   # VITE_DEMO_AUTH=true  # Comment this out
   VITE_API_BASE_URL=http://localhost:8000
   ```

7. **Restart Vite dev server** (in a new terminal, from project root):
   ```powershell
   npm run dev
   ```

#### API Endpoints Available
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- API docs: http://localhost:8000/docs

### Option 3: Django Backend
See `backend/django/README.md` for Django setup instructions.

---

## Current Issue Fix

The errors you see (`ERR_CONNECTION_REFUSED`) happen because:
1. Your frontend tries to connect to `http://localhost:8000`
2. No backend server is running on that port

**Immediate fix**: The `.env.local` file I created enables demo mode, which bypasses the backend entirely.

**After creating `.env.local`, restart your dev server for changes to take effect.**
