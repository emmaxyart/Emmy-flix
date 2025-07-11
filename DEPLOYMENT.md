# Emmflix Deployment Guide

## Vercel Deployment

### Prerequisites
1. **TMDB API Key**: Get your free API key from [The Movie Database](https://www.themoviedb.org/settings/api)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Step-by-Step Deployment

#### 1. Environment Variables Setup
In your Vercel dashboard, add these environment variables:

**Required Variables:**
```
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_API_KEY=your_actual_tmdb_api_key_here
```

#### 2. Deploy to Vercel

**Option A: Vercel Dashboard**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variables in the "Environment Variables" section
4. Click "Deploy"

**Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_TMDB_API_KEY
vercel env add NEXT_PUBLIC_TMDB_BASE_URL

# Redeploy with environment variables
vercel --prod
```

#### 3. Verify Deployment
1. Visit your deployed URL
2. Check that movies load properly
3. Test search functionality
4. Verify theme switching works

### Build Configuration

The project is configured to handle missing environment variables gracefully during build:
- Returns empty results if API key is missing
- Logs warnings instead of throwing errors
- Allows build to complete successfully

### Troubleshooting

**Build Fails with "TMDB environment variables not configured":**
- Ensure `NEXT_PUBLIC_TMDB_API_KEY` is set in Vercel environment variables
- Verify the API key is valid by testing at [TMDB API](https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY)

**Movies not loading after deployment:**
- Check Vercel function logs for API errors
- Verify environment variables are set correctly
- Test the `/api/test-connection` endpoint

**Theme not working:**
- This is a client-side feature and should work automatically
- Check browser console for any JavaScript errors

### Performance Optimization

The deployment includes:
- ✅ Static page generation
- ✅ Image optimization
- ✅ Code splitting
- ✅ Automatic caching
- ✅ Edge functions for API routes

### Security Notes

- API key is exposed to client-side (required for TMDB)
- No sensitive server-side data is exposed
- All API calls are made to TMDB's public API
- Rate limiting is handled by TMDB

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed

---

**Need Help?**
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Contact: emmanueledobor34@gmail.com
