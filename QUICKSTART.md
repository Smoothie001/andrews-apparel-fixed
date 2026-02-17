# 🚀 Quick Start Guide - Andrew's Apparel

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- PostgreSQL database (or use [Neon](https://neon.tech) free tier)
- Stripe account ([Sign up](https://stripe.com))

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Minimum required configuration:

DATABASE_URL="postgresql://user:password@localhost:5432/andrews_apparel"
JWT_SECRET="run: openssl rand -base64 32"
STRIPE_SECRET_KEY="sk_test_your_key_from_stripe_dashboard"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
```

### 3. Setup Database

```bash
# Push schema
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Run Application

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

**Admin Dashboard**
- URL: http://localhost:3000/admin
- Email: `admin@andrewsapparel.com`
- Password: `admin123`

**Test Customer**
- Email: `customer@test.com`
- Password: `customer123`

## What's Included

✅ 10+ seeded products across 6 categories
✅ Fabric catalog with 6 premium fabrics
✅ 5 style templates for custom sewing
✅ 4 fashion school courses
✅ Shipping zones for Nigeria
✅ Sample coupons (WELCOME10, FIRSTORDER)
✅ Test content blocks and testimonials

## Quick Tour

### Customer Features:
1. Browse shop: http://localhost:3000/shop
2. Custom sewing: http://localhost:3000/custom-sewing
3. Fashion school: http://localhost:3000/fashion-school
4. Add to cart and checkout

### Admin Features:
1. Dashboard: http://localhost:3000/admin
2. Manage products: http://localhost:3000/admin/products
3. View orders: http://localhost:3000/admin/orders
4. Handle custom requests: http://localhost:3000/admin/custom-requests
5. Manage students: http://localhost:3000/admin/students

## Getting Stripe Test Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Enable Test Mode (toggle in sidebar)
3. Get keys from Developers → API keys
4. Use test card: `4242 4242 4242 4242`

## Getting Gmail App Password

1. Enable 2FA on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate password for "Mail"
4. Use this in `EMAIL_PASSWORD`

## Free Database Options

**Neon (Recommended)**
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Paste in `DATABASE_URL`

**Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Paste in `DATABASE_URL`

## Common Issues

### Port 3000 already in use
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Ensure database exists

### Prisma errors
```bash
# Reset and regenerate
npx prisma generate
npm run db:push
```

## Next Steps

1. ✅ Customize branding in `/app/page.tsx`
2. ✅ Add your logo to `/public/`
3. ✅ Update business info in footer
4. ✅ Configure real payment keys
5. ✅ Add real product images
6. ✅ Test custom sewing flow
7. ✅ Review email templates
8. ✅ Deploy to production

## Need Help?

- 📖 See full documentation in `README.md`
- 🐛 Found a bug? Check the console logs
- 💬 Questions? Check environment variables first

## Production Deployment

See `README.md` section "Deployment" for:
- Vercel deployment guide
- Database hosting options
- Environment variable setup
- Domain configuration
- SSL/HTTPS setup

---

**Built with ❤️ for Andrew's Apparel**
