# Weather Master - Deployment Guide

## 🚀 Hosting Options

This guide covers deploying your Weather Master application to production.

### Recommended Stack
- **Backend**: Render (Free tier available)
- **Frontend**: Vercel (Free tier available)

---

## 📦 Backend Deployment (Render)

### Step 1: Prepare Your Repository

Your code is already on GitHub at: `https://github.com/Agentic-JJ-Web3/Weather-Master.git` ✅

### Step 2: Sign Up for Render

1. Go to https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended for easy integration)

### Step 3: Create a New Web Service

1. Click "New +" button → "Web Service"
2. Connect your GitHub repository: `Agentic-JJ-Web3/Weather-Master`
3. Configure the service:

   **Basic Settings:**
   - **Name**: `weather-master-api` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `weather-master-backend`
   - **Runtime**: `Python 3`
   
   **Build & Deploy:**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Step 4: Add Environment Variables

In the Render dashboard, go to "Environment" section and add:

```
WEATHER_API_KEY=your_weatherapi_key_here
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
CORS_ORIGINS=http://localhost:3000,https://your-frontend-url.vercel.app
```

> [!IMPORTANT]
> Replace `your_weatherapi_key_here` with your actual WeatherAPI.com key
> 
> You'll update `CORS_ORIGINS` after deploying the frontend

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your backend
3. Wait for deployment to complete (usually 2-5 minutes)
4. Your API will be available at: `https://weather-master-api.onrender.com`

### Step 6: Test Your Backend

Visit these URLs to verify:
- Health check: `https://your-app.onrender.com/api/health`
- API docs: `https://your-app.onrender.com/docs`

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Sign Up for Vercel

1. Go to https://vercel.com/
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Import your repository: `Agentic-JJ-Web3/Weather-Master`
3. Configure the project:

   **Framework Preset**: Next.js (auto-detected)
   
   **Root Directory**: `weather-master-frontend`
   
   **Build Settings** (usually auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Add Environment Variables

In the "Environment Variables" section, add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

> [!IMPORTANT]
> Replace `your-backend-url.onrender.com` with your actual Render backend URL

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. Wait for deployment (usually 1-3 minutes)
4. Your app will be available at: `https://weather-master-xxx.vercel.app`

### Step 5: Update Backend CORS

Go back to Render and update the `CORS_ORIGINS` environment variable:

```
CORS_ORIGINS=https://your-frontend-url.vercel.app
```

Then redeploy the backend service.

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured correctly
- [ ] CORS settings updated with frontend URL
- [ ] Test the application end-to-end
- [ ] WeatherAPI.com API key is working

---

## 🧪 Testing Your Deployed App

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Enter a city name (e.g., "London")
3. Click "Search"
4. Verify all features work:
   - Current weather displays
   - Forecast shows (3 days)
   - Clothing suggestions appear
   - Activity suggestions appear

---

## 🔧 Alternative Hosting Options

### Backend Alternatives

#### 1. Railway.app
- Similar to Render
- Free tier available
- Easy GitHub integration
- **Setup**: Connect repo → Set root directory → Deploy

#### 2. Heroku
- Popular platform
- Free tier discontinued (paid plans available)
- **Setup**: Create app → Connect GitHub → Configure buildpack

#### 3. DigitalOcean App Platform
- $5/month minimum
- More control and features
- **Setup**: Create app → Connect repo → Configure

### Frontend Alternatives

#### 1. Netlify
- Similar to Vercel
- Free tier available
- **Setup**: Import from Git → Configure build settings → Deploy

#### 2. GitHub Pages (Static Export)
- Free hosting
- Requires Next.js static export
- **Setup**: Add `output: 'export'` to next.config.js → Build → Deploy

#### 3. Cloudflare Pages
- Free tier available
- Fast global CDN
- **Setup**: Connect repo → Configure build → Deploy

---

## 🐳 Docker Deployment (Advanced)

If you prefer Docker-based deployment:

### Using Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  backend:
    build: ./weather-master-backend
    ports:
      - "8000:8000"
    environment:
      - WEATHER_API_KEY=${WEATHER_API_KEY}
      - WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
      - CORS_ORIGINS=http://localhost:3000
    
  frontend:
    build: ./weather-master-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

**Run with:**
```bash
docker-compose up -d
```

### Deploy to Cloud with Docker

- **AWS ECS**: Container service
- **Google Cloud Run**: Serverless containers
- **Azure Container Instances**: Simple container hosting

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Testing)

| Service | Backend (Render) | Frontend (Vercel) |
|---------|------------------|-------------------|
| Cost | Free | Free |
| Limitations | Spins down after inactivity | Unlimited bandwidth |
| Build Minutes | 500 min/month | Unlimited |
| Custom Domain | ✅ Yes | ✅ Yes |

**Total Monthly Cost: $0**

### Production Tier (For Real Traffic)

| Service | Backend (Render) | Frontend (Vercel) |
|---------|------------------|-------------------|
| Cost | $7/month | $20/month (Pro) |
| Features | Always on, faster | Analytics, team features |

**Total Monthly Cost: ~$27/month**

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** ✅ (Already in .gitignore)
2. **Use environment variables** for all secrets
3. **Enable HTTPS** (automatic on Render/Vercel)
4. **Restrict CORS** to your frontend domain only
5. **Monitor API usage** on WeatherAPI.com dashboard
6. **Set rate limiting** if needed (Render/Vercel provide this)

---

## 📊 Monitoring & Maintenance

### Backend Monitoring (Render)
- View logs in Render dashboard
- Set up email alerts for failures
- Monitor API response times

### Frontend Monitoring (Vercel)
- Analytics dashboard available
- Error tracking built-in
- Performance metrics

### WeatherAPI.com
- Monitor API usage in dashboard
- Free tier: 1 million calls/month
- Set up alerts for quota limits

---

## 🆘 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- **Solution**: Check Render logs, verify environment variables

**Problem**: CORS errors
- **Solution**: Update `CORS_ORIGINS` with exact frontend URL (no trailing slash)

**Problem**: API key not working
- **Solution**: Verify key is correct in Render environment variables

### Frontend Issues

**Problem**: Can't connect to backend
- **Solution**: Check `NEXT_PUBLIC_API_URL` is correct, verify backend is running

**Problem**: Build fails
- **Solution**: Check Vercel build logs, ensure all dependencies in package.json

**Problem**: Environment variables not working
- **Solution**: Redeploy after adding env vars (Vercel requires rebuild)

---

## 🎯 Quick Start Commands

### Local Development
```bash
# Backend
cd weather-master-backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd weather-master-frontend
npm install
npm run dev
```

### Production Build Test
```bash
# Backend
cd weather-master-backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend
cd weather-master-frontend
npm run build
npm start
```

---

## 📝 Custom Domain Setup (Optional)

### Render (Backend)
1. Go to Settings → Custom Domain
2. Add your domain (e.g., `api.yoursite.com`)
3. Update DNS records as instructed
4. SSL certificate auto-generated

### Vercel (Frontend)
1. Go to Settings → Domains
2. Add your domain (e.g., `weather.yoursite.com`)
3. Update DNS records as instructed
4. SSL certificate auto-generated

---

## ✨ You're Ready to Deploy!

Follow the steps above to get your Weather Master app live on the internet. Start with the free tiers on Render and Vercel, then upgrade as needed.

**Estimated deployment time**: 15-30 minutes

Good luck! 🚀
