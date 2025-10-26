# HeyBabyy - Parent Pal Plus

## Project Overview

A comprehensive parent support application built with React, TypeScript, and modern web technologies.

## How to edit this code

There are several ways of editing your application.

**Use your preferred IDE**

Clone this repo and push changes using your favorite IDE.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Environment configuration

Copy `.env.example` to `.env.local` and adjust values:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_DEMO_AUTH=true
```

- Set `VITE_DEMO_AUTH=true` to run without a backend (demo login)
- Set `VITE_DEMO_AUTH=false` and point `VITE_API_BASE_URL` to your Django/FastAPI server when ready

## Backend quick start

This frontend expects these routes:

- `POST /api/auth/login/` { email, password } -> { access, user }
- `POST /api/auth/register/` { email, password, full_name }
- `GET  /api/auth/me/` -> { id, email, full_name }
- `POST /api/auth/logout/`

Starter skeletons are available under `backend/`:
- `backend/fastapi/` minimal FastAPI app (`main.py`)
- `backend/django/` minimal Django views and urls (replace with DRF + SimpleJWT for production)

## How can I deploy this project?

You can deploy this project using various platforms:
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: Deploy full-stack with backend support
- **AWS/Azure**: Deploy to cloud platforms

Build the project first:
```sh
npm run build
```

## Custom Domain

You can connect a custom domain through your hosting provider's dashboard (Vercel, Netlify, etc.).
