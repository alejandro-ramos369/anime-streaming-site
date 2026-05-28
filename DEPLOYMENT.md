# Deployment Guide

This guide explains how to deploy your AnimeWatch website to various hosting platforms.

## Quick Start - Recommended Options

### Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and offers excellent support for React applications.

1. **Sign up** at https://vercel.com

2. **Connect your GitHub repository**:
   - Click "New Project"
   - Select your repository
   - Vercel will auto-detect the Vite configuration

3. **Deploy**:
   - Click "Deploy"
   - Your site will be live in seconds!

**Pros**:
- Automatic deployments on git push
- Free tier with generous limits
- Global CDN
- Instant preview deployments

**Your URL**: `https://anime-streaming-site.vercel.app`

### Option 2: Netlify

Netlify is another popular choice with excellent React support.

1. **Sign up** at https://netlify.com

2. **Connect your GitHub repository**:
   - Click "New site from Git"
   - Select your repository
   - Netlify will auto-detect the build settings

3. **Deploy**:
   - Click "Deploy site"
   - Your site will be live!

**Pros**:
- Automatic deployments
- Free tier
- Global CDN
- Easy environment variables

**Your URL**: `https://anime-streaming-site.netlify.app`

## Manual Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with all the optimized files.

### Deploy to GitHub Pages

1. Update `vite.config.ts` to add base path:
```typescript
export default defineConfig({
  base: '/anime-streaming-site/',
  // ... rest of config
})
```

2. Build the project:
```bash
npm run build
```

3. Push to GitHub:
```bash
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

4. Enable GitHub Pages in repository settings

**Your URL**: `https://yourusername.github.io/anime-streaming-site`

### Deploy to AWS S3 + CloudFront

1. **Create S3 bucket**:
```bash
aws s3 mb s3://anime-streaming-site
```

2. **Upload files**:
```bash
aws s3 sync dist/ s3://anime-streaming-site --delete
```

3. **Create CloudFront distribution** for CDN

4. **Set bucket policy** for public access

### Deploy to Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**:
```bash
firebase init hosting
```

3. **Deploy**:
```bash
npm run build
firebase deploy
```

## Environment Variables

The application uses the AniList GraphQL API which doesn't require authentication for public queries. No environment variables are needed for basic functionality.

## Custom Domain

After deploying to any platform, you can add a custom domain:

1. **Register domain** at any registrar (Namecheap, GoDaddy, etc.)
2. **Update DNS records** to point to your hosting provider
3. **Enable HTTPS** (usually automatic)

Example DNS records:
- Vercel: Add CNAME to `cname.vercel.com`
- Netlify: Add CNAME to `anime-streaming-site.netlify.app`

## Monitoring & Analytics

### Add Google Analytics

1. Create a Google Analytics account
2. Get your tracking ID
3. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Monitor Performance

- Vercel Analytics: Built-in
- Netlify Analytics: Available in settings
- Google PageSpeed Insights: https://pagespeed.web.dev

## Troubleshooting

### Build fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules dist && npm install`
- Check for TypeScript errors: `npm run build`

### Site shows blank page
- Check browser console for errors
- Verify API calls to AniList are working
- Check that `dist/` folder has files

### Slow performance
- Enable CDN caching
- Optimize images
- Check API response times

## Continuous Deployment

All platforms support automatic deployments:

1. Push to main branch
2. Platform automatically builds and deploys
3. Site updates in seconds

## Rollback

If something breaks:

1. **Vercel**: Click "Deployments" and select previous version
2. **Netlify**: Click "Deploys" and select previous version
3. **GitHub Pages**: Revert commit and push

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally with `npm run preview`

---

Happy deploying! 🚀
