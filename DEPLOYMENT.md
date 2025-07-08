# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account
- Render account

## Step 1: Prepare Your Repository

1. **Create a GitHub repository** and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Step 2: Deploy Backend on Render

1. **Go to Render.com** and sign up/login
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `your-app-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python wsgi.py`

5. **Set Environment Variables:**
   - `FLASK_DEBUG=false`
   - `SECRET_KEY=your-secret-key-here`
   - `CHECKPOINT_DIR=/opt/render/project/src/models`
   - `INPUT_DIR=/opt/render/project/src/input`
   - `OUTPUT_DIR=/opt/render/project/src/static/output`

6. **Deploy** - Render will automatically build and deploy your backend

## Step 3: Deploy Frontend on Vercel

1. **Go to Vercel.com** and sign up/login
2. **Import your GitHub repository**
3. **Configure the project:**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave empty or specify if different)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables:**
   - `VITE_API_BASE_URL=https://your-backend-app.onrender.com`
   - `VITE_APP_ENV=production`

5. **Deploy** - Vercel will automatically build and deploy your frontend

## Step 4: Update CORS Settings

Update your Flask app's CORS settings for production:

```python
# In app.py, update CORS configuration
CORS(app, origins=[
    "https://your-frontend-app.vercel.app",
    "https://your-custom-domain.com"
])
```

## Step 5: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### For Render (Backend):
1. Go to your service dashboard
2. Click "Settings" → "Custom Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Step 6: Environment-Specific Configurations

### Production optimizations:

1. **Update package.json** with production scripts:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && vercel --prod"
  }
}
```

2. **Create .env files** for different environments:
- `.env.development` - for local development
- `.env.production` - for production (already created)

## Step 7: Monitor and Maintain

### Vercel:
- Monitor deployments in Vercel dashboard
- Set up analytics and monitoring
- Configure automatic deployments on git push

### Render:
- Monitor service health in Render dashboard
- Set up log monitoring
- Configure automatic deployments on git push

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend CORS settings include your frontend domain
2. **Build Failures**: Check your build logs for missing dependencies
3. **Environment Variables**: Ensure all required environment variables are set
4. **File Paths**: Make sure file paths are correctly configured for production

### Useful Commands:

```bash
# Test production build locally
npm run build
npm run preview

# Check Vercel deployment status
vercel --prod

# View deployment logs
vercel logs your-deployment-url
```

## Security Considerations

1. **Never commit sensitive data** to your repository
2. **Use environment variables** for all sensitive configuration
3. **Set up proper CORS** policies
4. **Use HTTPS** for all production deployments
5. **Regularly update dependencies** for security patches

## Performance Optimization

1. **Enable gzip compression** in your Flask app
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Optimize images** and assets
5. **Use proper HTTP headers** for caching

Your application will be accessible at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend-app.onrender.com`
