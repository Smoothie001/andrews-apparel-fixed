# 🚀 Deployment Guide - Andrew's Apparel

Complete guide for deploying to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup](#database-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Railway Deployment](#railway-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Custom Domain](#custom-domain)
8. [SSL/HTTPS](#ssl-https)
9. [Monitoring](#monitoring)
10. [Backup Strategy](#backup-strategy)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass locally
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] API keys are production keys (not test)
- [ ] Email configuration is set up
- [ ] Stripe webhooks are configured
- [ ] Images are optimized
- [ ] SEO meta tags are set
- [ ] Error handling is robust
- [ ] Security headers are configured

---

## Database Setup

### Option 1: Neon (Recommended)

1. **Sign up** at [neon.tech](https://neon.tech)

2. **Create project**:
   - Project name: andrews-apparel-prod
   - Region: Choose closest to your users
   - PostgreSQL version: 15

3. **Get connection string**:
   ```
   postgresql://user:password@host/database?sslmode=require
   ```

4. **Benefits**:
   - Serverless (scales to zero)
   - Free tier: 0.5 GB storage
   - Automatic backups
   - Branch database for testing

### Option 2: Supabase

1. **Sign up** at [supabase.com](https://supabase.com)

2. **Create project**:
   - Organization: Your name
   - Project name: andrews-apparel
   - Database password: Generate strong password
   - Region: Choose closest

3. **Get connection string**:
   - Go to Settings → Database
   - Copy "Connection string" under "Connection pooling"
   - Use "Transaction" mode

### Option 3: Railway

1. **Sign up** at [railway.app](https://railway.app)

2. **Create PostgreSQL**:
   - New Project → PostgreSQL
   - Copy DATABASE_URL from Variables tab

---

## Vercel Deployment

### Step 1: Prepare Repository

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/andrews-apparel.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select andrews-apparel

3. **Configure build**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add environment variables**:
   - Click "Environment Variables"
   - Add all variables from `.env`
   - Make sure to use PRODUCTION values

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~5 minutes)

### Step 3: Configure Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Railway Deployment

### Full-Stack on Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to project
railway link

# Add PostgreSQL
railway add postgresql

# Set environment variables
railway variables set KEY=value

# Deploy
railway up

# Open in browser
railway open
```

### Configuration

Create `railway.toml`:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[healthchecks]]
path = "/api/health"
intervalSeconds = 60
timeoutSeconds = 10
```

---

## Environment Variables

### Production Variables

```env
# Database (Required)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# JWT Secret (Required - GENERATE NEW)
JWT_SECRET="GENERATE_WITH: openssl rand -base64 32"

# Stripe PRODUCTION Keys (Required)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email Production (Required)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="contact@andrewsapparel.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="Andrew's Apparel <noreply@andrewsapparel.com>"

# App Configuration (Required)
NEXT_PUBLIC_APP_URL="https://andrewsapparel.com"
NEXT_PUBLIC_APP_NAME="Andrew's Apparel"

# WhatsApp Business Number
NEXT_PUBLIC_WHATSAPP_NUMBER="+2348034567890"

# Paystack Production (Optional)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_..."
PAYSTACK_SECRET_KEY="sk_live_..."
```

### Setting Variables on Vercel

```bash
# Via CLI
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production

# Or in dashboard
# Settings → Environment Variables → Add
```

---

## Post-Deployment

### 1. Initialize Database

```bash
# Via Vercel CLI
vercel env pull .env.production
DATABASE_URL="..." npx prisma db push

# Or SSH into deployment
vercel ssh
npm run db:push
npm run db:seed
exit
```

### 2. Configure Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to Live Mode
3. Developers → Webhooks → Add endpoint
4. Endpoint URL: `https://andrewsapparel.com/api/webhooks/stripe`
5. Events to send:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
6. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 3. Test Payment Flow

```bash
# Use Stripe test mode first
# Test card: 4242 4242 4242 4242
# Then switch to live mode
```

### 4. Setup Email DNS

For custom domain email:

1. **SPF Record**:
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.google.com ~all
   ```

2. **DKIM** (from Gmail):
   - Google Admin → Apps → Gmail → Authenticate
   - Generate DKIM keys
   - Add TXT records

---

## Custom Domain

### On Vercel

1. Go to project Settings → Domains
2. Add domain: `andrewsapparel.com`
3. Add DNS records (from Vercel):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for DNS propagation (5-60 minutes)
5. Vercel auto-provisions SSL certificate

### On Railway

1. Settings → Domains
2. Add custom domain
3. Update DNS records as shown
4. SSL auto-provisioned

---

## SSL/HTTPS

Both Vercel and Railway provide automatic SSL certificates via Let's Encrypt.

### Verify SSL

```bash
# Check certificate
curl -vI https://andrewsapparel.com

# Should show:
# - SSL certificate: Valid
# - Server: Vercel or Railway
# - Status: 200 OK
```

### Force HTTPS

In `next.config.js`:

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://andrewsapparel.com/:path*',
        permanent: true,
      },
    ];
  },
};
```

---

## Monitoring

### Vercel Analytics

1. Go to project → Analytics
2. Enable Web Analytics
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Devices
   - Locations

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs

# Configure DSN in .env
NEXT_PUBLIC_SENTRY_DSN="https://..."
```

### Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
- Monitor: https://andrewsapparel.com
- Check interval: 5 minutes
- Alert: Email/SMS on downtime

---

## Backup Strategy

### Database Backups

**Neon**: Automatic daily backups (7-day retention)

**Manual backup**:

```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20250216.sql
```

### Code Backups

- GitHub repository (primary)
- Vercel deployment history
- Local git repository

### Media Files

If using Cloudinary:
- Automatic backups
- Media Library has version history

---

## Performance Optimization

### Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};
```

### Caching Strategy

```javascript
// Example API route
export const revalidate = 3600; // 1 hour

export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
```

---

## Security Checklist

- [x] Environment variables secured
- [x] JWT secret is strong and unique
- [x] Database uses SSL
- [x] API routes protected
- [x] Input validation everywhere
- [x] CORS configured properly
- [x] Rate limiting on auth routes
- [x] XSS protection enabled
- [x] CSRF tokens on forms
- [x] SQL injection protected (Prisma)

---

## Troubleshooting

### Build Fails

```bash
# Check build logs
vercel logs

# Common issues:
# - Missing environment variables
# - Prisma generation failed
# - TypeScript errors
```

### Database Connection Issues

```bash
# Test connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => console.log('Connected')).catch(e => console.error(e))"
```

### Stripe Webhook Issues

```bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check webhook logs in Stripe Dashboard
```

---

## Maintenance

### Regular Tasks

**Weekly**:
- Check error logs
- Review failed payments
- Monitor disk usage
- Check email delivery

**Monthly**:
- Update dependencies
- Review analytics
- Backup database
- Security audit

### Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Support

For deployment issues:

- Vercel: [vercel.com/support](https://vercel.com/support)
- Railway: [docs.railway.app](https://docs.railway.app)
- Neon: [neon.tech/docs](https://neon.tech/docs)

---

**Deployment Checklist Summary**

- [ ] Database provisioned
- [ ] Environment variables set
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Railway
- [ ] Database schema pushed
- [ ] Sample data seeded
- [ ] Stripe webhooks configured
- [ ] Custom domain added
- [ ] SSL certificate active
- [ ] Email tested
- [ ] Payment flow tested
- [ ] Monitoring enabled
- [ ] Backups configured

**You're ready to go live! 🎉**
