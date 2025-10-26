# Minimal demo-only Django views (replace with DRF + SimpleJWT in real app)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

USERS = {}
SESSIONS = {}

@csrf_exempt
def register_view(request):
    if request.method != 'POST':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)
    payload = json.loads(request.body or '{}')
    email = payload.get('email')
    if email in USERS:
        return JsonResponse({'detail': 'User exists'}, status=400)
    USERS[email] = {
        'id': str(len(USERS)+1),
        'email': email,
        'full_name': payload.get('full_name') or 'User',
        'password': payload.get('password'),  # DEMO ONLY
    }
    return JsonResponse({'id': USERS[email]['id'], 'email': email, 'full_name': USERS[email]['full_name']}, status=201)

@csrf_exempt
def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)
    payload = json.loads(request.body or '{}')
    email = payload.get('email')
    user = USERS.get(email)
    if not user or user.get('password') != payload.get('password'):
        return JsonResponse({'detail': 'Invalid credentials'}, status=401)
    token = f"demo-{user['id']}"
    SESSIONS[token] = email
    return JsonResponse({'access': token, 'user': {'id': user['id'], 'email': user['email'], 'full_name': user['full_name']}})

@csrf_exempt
def me_view(request):
    auth = request.headers.get('Authorization','')
    if not auth.startswith('Bearer '):
        return JsonResponse({'detail': 'Not authenticated'}, status=401)
    token = auth.split(' ',1)[1]
    email = SESSIONS.get(token)
    if not email or email not in USERS:
        return JsonResponse({'detail': 'Invalid token'}, status=401)
    u = USERS[email]
    return JsonResponse({'id': u['id'], 'email': u['email'], 'full_name': u['full_name']})

@csrf_exempt
def logout_view(request):
    auth = request.headers.get('Authorization','')
    if auth.startswith('Bearer '):
        token = auth.split(' ',1)[1]
        SESSIONS.pop(token, None)
    return JsonResponse({'detail': 'ok'})
