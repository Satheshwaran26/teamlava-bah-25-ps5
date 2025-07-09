# Deploy Both Frontend and Backend on Render.com

## Step-by-Step Deployment Guide

### Prerequisites
1. Create a [Render.com](https://render.com) account
2. Push your code to GitHub (if not already done)

---

## Part 1: Deploy Backend (Flask API)

### 1. Create Web Service for Backend
1. Go to Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `teamlava-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: `Oregon (US West)` or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

### 2. Set Environment Variables for Backend
In your Render backend service settings, add these environment variables:
```
FLASK_DEBUG=false
SECRET_KEY=your-super-secret-key-here
CHECKPOINT_DIR=./Test_Chunks
INPUT_DIR=./INPUT
OUTPUT_DIR=./static/output
PORT=10000
```

### 3. Deploy Backend
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note the URL (e.g., `https://teamlava-backend.onrender.com`)

---

## Part 2: Deploy Frontend (Vite React)

### 1. Create Static Site for Frontend
1. Go to Render Dashboard → "New" → "Static Site"
2. Connect your GitHub repository
3. Configure the site:
   - **Name**: `teamlava-frontend` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: `/` (leave empty if repo root)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### 2. Set Environment Variables for Frontend
In your Render frontend service settings, add:
```
VITE_API_BASE_URL=https://teamlava-backend.onrender.com
VITE_APP_ENV=production
```
**Important**: Replace `teamlava-backend` with your actual backend service name!

### 3. Deploy Frontend
- Click "Create Static Site"
- Wait for deployment (3-5 minutes)
- Your frontend will be available at `https://teamlava-frontend.onrender.com`

---

## Part 3: Update CORS Settings

After both services are deployed, update the backend CORS configuration:

1. Go to your backend service on Render
2. Update the environment variables to include your frontend URL:
   - Add: `FRONTEND_URL=https://teamlava-frontend.onrender.com`

3. Or manually update the CORS origins in `app.py`:
```python
CORS(app, origins=[
    "https://teamlava-frontend.onrender.com",  # Your actual frontend URL
    "http://localhost:5173",
    "http://localhost:3000"
], supports_credentials=True)
```

---

## Part 4: Test the Deployment

### 1. Test Backend
Visit: `https://teamlava-backend.onrender.com/`
Should return:
```json
{
  "message": "Satellite Change Detection API",
  "status": "running",
  "health": {
    "status": "healthy",
    "models_loaded": false,
    "note": "Models required for prediction functionality. Server is running but predictions disabled."
  }
}
```

### 2. Test Frontend
Visit: `https://teamlava-frontend.onrender.com`
- Should load without CORS errors
- Backend connection should work

---

## Part 5: Upload Models (Optional)

To enable predictions, you need to upload your `.pth` model files:

### Method 1: Git-based Upload
1. Create `backend/Test_Chunks/` directory locally
2. Copy your `.pth` files there
3. Commit and push to GitHub
4. Render will redeploy automatically

### Method 2: Direct Upload
1. Use Render's shell access
2. Create directories and upload files

---

## Expected URLs After Deployment

- **Backend API**: `https://teamlava-backend.onrender.com`
- **Frontend**: `https://teamlava-frontend.onrender.com`

---

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check build logs in Render dashboard
2. **CORS Errors**: Ensure frontend URL is in backend CORS settings
3. **503 Errors**: Models not loaded (expected if no .pth files uploaded)
4. **Environment Variables**: Make sure all required env vars are set

### Debugging:
- Check Render service logs
- Test individual endpoints
- Verify environment variables

---

## Advantages of Render vs Vercel + Render:

✅ **Single Platform**: Both frontend and backend on same platform
✅ **Easier Management**: One dashboard for both services
✅ **Free Tier**: Both services can run on free tier
✅ **Auto-Deploy**: Automatic deployments from GitHub
✅ **Custom Domains**: Easy to set up custom domains
✅ **SSL**: Automatic HTTPS certificates

---

## Cost:
- **Free Tier**: Both services can run free with some limitations
- **Paid Tier**: ~$7/month per service for better performance

This setup will be much simpler to manage than splitting between Vercel and Render!
