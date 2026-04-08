# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account with your repo pushed
- Vercel account (free at vercel.com)
- MongoDB Atlas cluster (free tier available)

### Step 1: Prepare your .env

Update `backend/.env` with production values:

```
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/fsd_project
JWT_SECRET=your_strong_secret_key_here
PORT=5000
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 3: Connect to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select your repository
5. Vercel will auto-detect settings from `vercel.json`

### Step 4: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key

### Step 5: Deploy

Click "Deploy" and wait for build to complete.

**Your app URL:** `https://your-project-name.vercel.app`

---

## Render Deployment

### For Backend API

1. **Push to GitHub** (same as above)

2. **Create Render Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Fill in the form:
     - **Name**: your-app-backend
     - **Runtime**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `node backend/server.js`
     - **Port**: `5000`

3. **Add Environment Variables**
   - In Render dashboard, go to Environment
   - Add:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Deploy** - takes 2-3 minutes

**Backend URL:** `https://your-app-backend.onrender.com`

### For Frontend UI

1. **Create Static Site**
   - Render Dashboard → "New +" → "Static Site"
   - Select repository
   - Fill in the form:
     - **Name**: your-app-frontend
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Publish Directory**: `frontend/build`

2. **Update Frontend API URL**
   - No environment variables needed - the frontend will call the backend API directly
   - In `frontend/src/components/Login.jsx` and `AiAdvisor.jsx`, update:
     ```javascript
     const apiUrl = "https://your-app-backend.onrender.com";
     ```

3. **Deploy** - takes 1-2 minutes

**Frontend URL:** `https://your-app-frontend.onrender.com`

---

## Environment Variables Summary

### Backend (`backend/.env`)

```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/fsd_project
JWT_SECRET=your_secret_key_min_32_chars
PORT=5000
```

### Frontend (Local Development `frontend/.env.local`)

```
REACT_APP_API_URL=http://localhost:5000
```

### Frontend (Production - automatically set)

- Vercel: Uses `/api` (relative path via vercel.json rewrites)
- Render: Update components to use backend URL or add `.env.production`

---

## Troubleshooting

### MongoDB Connection Failed

- Verify connection string from MongoDB Atlas
- Add your IP to MongoDB Atlas whitelist
- Ensure credentials are correct

### API calls returning 404

- Check environment variables are set correctly
- Ensure backend server is running
- Verify API routes in `backend/routes/`

### Cors errors

- Backend already has `cors()` middleware configured
- Ensure REACT_APP_API_URL is pointing to correct backend URL

---

## Switching Environments

**For local development:**

```bash
# Frontend reads from frontend/.env.local
npm start

# Backend reads from backend/.env
npm run dev
```

**For production:**

- Environment variables are set in Vercel/Render dashboard
- No .env files needed
