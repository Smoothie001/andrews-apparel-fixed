# 🚀 Andrew's Apparel - Production Deployment Guide

## Overview

This guide will walk you through deploying Andrew's Apparel to production using Vercel and a PostgreSQL database provider.

## Prerequisites

- GitHub account
- Vercel account
- Stripe account (for payments)
- Paystack account (for Nigerian payments)
- Cloudinary account (for image uploads)
- Resend account (for emails)
- PostgreSQL database (Neon/Supabase/Vercel Postgres)

---

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository

```bash
cd andrews-apparel
git init
git add .
git commit -m "Initial commit - Andrew's Apparel e-commerce platform"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `andrews-apparel`
3. Don't initialize with README (we already have one)
4. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/andrews-apparel.git
git branch -M main
git push -u origin main
```

---

## Step 2: Setup Database

### Option A: Neon (Recommended - Free Tier)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Name it "andrews-apparel"
4. Copy the connection string (starts with `postgresql://`)
5. Save it - we'll use it in Step 4

### Option B: Vercel Postgres

1. In Vercel dashboard, go to Storage
2. Create new Postgres database
3. Name it "andrews-apparel"
4. Copy connection string

### Option C: Supabase

1. Go to https://supabase.com
2. Create new project
3. Go to Project Settings → Database
4. Copy connection string
5. Replace `[YOUR-PASSWORD]` with actual password

---

## Step 3: Setup External Services

### 3.1 Stripe Setup

1. Go to https://dashboard.stripe.com
2. Get your API keys:
   - Publishable key: `pk_test_...` (for development) or `pk_live_...` (for production)
   - Secret key: `sk_test_...` or `sk_live_...`
3. Setup webhook:
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret: `whsec_...`

### 3.2 Paystack Setup

1. Go to https://dashboard.paystack.com
2. Get your API keys from Settings → API Keys & Webhooks
3. Setup webhook URL: `https://your-domain.vercel.app/api/webhooks/paystack`

### 3.3 Cloudinary Setup

1. Go to https://cloudinary.com/console
2. Get your credentials:
   - Cloud name
   - API Key
   - API Secret
3. Create upload preset:
   - Settings → Upload → Add upload preset
   - Name it `andrews_apparel_uploads`
   - Signing Mode: Unsigned
   - Save

### 3.4 Resend Setup

1. Go to https://resend.com/api-keys
2. Create new API key
3. Verify your sending domain (or use resend.dev for testing)

---

## Step 4: Deploy to Vercel

### 4.1 Connect to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Output Directory: `.next`

### 4.2 Add Environment Variables

In Vercel project settings → Environment Variables, add:

```bash
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-generated-secret-min-32-chars

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_PRESET=andrews_apparel_uploads

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@your-domain.com

# App Config
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@andrewsapparel.com
WHATSAPP_BUSINESS_NUMBER=+2348012345678

# Feature Flags
ENABLE_LOYALTY_POINTS=true
ENABLE_REFERRAL_SYSTEM=true
ENABLE_FABRIC_SWATCHES=true

# Shipping
LOCAL_SHIPPING_FEE=2000
INTERNATIONAL_SHIPPING_FEE=15000

# Environment
NODE_ENV=production
```

**Important**: Make sure to use PRODUCTION keys (not test keys) for live deployment!

### 4.3 Generate NextAuth Secret

```bash
# On your local machine, run:
openssl rand -base64 32

# Copy the output and use it as NEXTAUTH_SECRET
```

### 4.4 Deploy

Click "Deploy" and wait for build to complete (2-5 minutes).

---

## Step 5: Setup Database in Production

### 5.1 Run Migrations

After successful deployment, run migrations:

#### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Set DATABASE_URL locally (temporarily)
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

#### Method 2: Using Vercel Dashboard

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Add a custom build command:
   ```bash
   npx prisma migrate deploy && npm run build
   ```

### 5.2 Seed Production Database

**⚠️ Only do this once for initial setup!**

```bash
# With DATABASE_URL set to production:
npx prisma db seed
```

This will create:
- Admin account
- Sample products
- Categories
- Courses
- Policies
- FAQs
- etc.

---

## Step 6: Setup Custom Domain

### 6.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `andrewsapparel.com`)
3. Follow Vercel's instructions to update DNS

### 6.2 Update Environment Variables

Update these after domain is active:

```bash
NEXTAUTH_URL=https://andrewsapparel.com
NEXT_PUBLIC_APP_URL=https://andrewsapparel.com
```

### 6.3 Update Webhook URLs

Update webhook URLs in Stripe and Paystack to use your custom domain:
- Stripe: `https://andrewsapparel.com/api/webhooks/stripe`
- Paystack: `https://andrewsapparel.com/api/webhooks/paystack`

---

## Step 7: Test Production Deployment

### 7.1 Test Core Flows

- [ ] Homepage loads correctly
- [ ] Product browsing works
- [ ] Product search functions
- [ ] Cart add/remove works
- [ ] Checkout process completes
- [ ] Payment processing (test with small amount)
- [ ] Order confirmation email received
- [ ] Admin login works
- [ ] Custom sewing request submission
- [ ] Student registration
- [ ] All images load properly

### 7.2 Test Payments

#### Stripe Test Cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

#### Paystack Test Cards:
- Success: `5060 6666 6666 6666 64` (Verve)
- Success: `4084 0840 8408 4081` (Visa)

### 7.3 Monitor for Errors

1. Check Vercel Function Logs
2. Check Vercel Analytics
3. Setup Sentry (optional but recommended)

---

## Step 8: Post-Deployment Configuration

### 8.1 Update Admin Password

```bash
# Connect to production database
npx prisma studio --browser none

# Or use SQL directly:
# Update admin password to something secure
```

### 8.2 Email Verification

1. Verify your sending domain in Resend
2. Setup DMARC/SPF/DKIM records
3. Test email delivery

### 8.3 Setup Monitoring

#### Vercel Analytics (Built-in)
- Automatically enabled
- View in Vercel Dashboard

#### Optional: Sentry Error Tracking

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 8.4 Performance Optimization

1. Enable Vercel Analytics
2. Check Lighthouse scores
3. Optimize images (already using Next.js Image)
4. Enable edge caching where appropriate

---

## Step 9: Backup Strategy

### 9.1 Database Backups

#### Neon (Automatic)
- Automatically backed up
- Point-in-time recovery available

#### Manual Backup Script

```bash
# Create backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20240215.sql
```

### 9.2 Code Backups

- GitHub automatically stores your code
- Consider adding GitHub Actions for automated backups

---

## Step 10: Go Live Checklist

Before announcing to customers:

- [ ] SSL certificate active (https://)
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Database seeded with real data
- [ ] Admin account secured
- [ ] Payment webhooks configured and tested
- [ ] Test order placed and confirmed
- [ ] Email notifications working
- [ ] Mobile responsiveness verified
- [ ] Contact information updated
- [ ] WhatsApp integration working
- [ ] Social media links updated
- [ ] Privacy policy and terms reviewed
- [ ] Shipping zones configured
- [ ] Product prices verified
- [ ] Images optimized and loading
- [ ] 404 and error pages working
- [ ] Search functionality tested
- [ ] Analytics tracking enabled

---

## Maintenance & Updates

### Regular Updates

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Run migrations if any
npx prisma migrate deploy

# Deploy
git push vercel main
```

### Database Maintenance

```bash
# Optimize database
npx prisma db execute --stdin < optimize.sql

# View database in browser
npx prisma studio
```

### Monitoring

- Check Vercel Analytics weekly
- Review error logs daily (first week)
- Monitor payment success rates
- Track conversion funnel

---

## Troubleshooting

### Build Fails

1. Check Vercel build logs
2. Ensure all dependencies in package.json
3. Verify environment variables are set
4. Check for TypeScript errors locally

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check database is accessible from Vercel IPs
3. Ensure SSL mode is required in connection string

### Payment Webhooks Not Working

1. Verify webhook URL is correct
2. Check webhook secret matches
3. Review webhook logs in Stripe/Paystack
4. Ensure endpoint is not rate-limited

### Images Not Loading

1. Check Cloudinary credentials
2. Verify upload preset is correct
3. Check CORS settings in Cloudinary
4. Ensure images are public

---

## Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Vercel: https://vercel.com/docs

### Get Help
- Vercel Support: https://vercel.com/support
- Create GitHub issues for bug reports
- Check Vercel Community: https://github.com/vercel/next.js/discussions

---

## Success Metrics to Track

### Week 1
- Deploy successful
- Zero critical errors
- Admin can manage products
- Test orders complete successfully

### Month 1
- 100+ products added
- First 10 real orders
- 5+ custom sewing requests
- 3+ student enrollments

### Quarter 1
- 500+ total orders
- 4.5+ star average rating
- 50+ custom sewing completions
- 20+ active students

---

## 🎉 Congratulations!

Your Andrew's Apparel e-commerce platform is now live! 

Remember to:
1. Monitor regularly in first week
2. Respond to customer feedback
3. Keep updating products
4. Market your platform
5. Provide excellent customer service

**Location**: Lokongoma Phase Two, Lokoja, Kogi State, Nigeria

**Good luck with your premium African fashion business! 🇳🇬**

---

*For technical support, refer to IMPLEMENTATION_GUIDE.md and COMPLETE_SETUP.md*
