# Andrew's Apparel - Premium Fashion E-Commerce Platform

**Location**: Lokongoma Phase Two, Lokoja, Kogi State, Nigeria

A modern, luxury e-commerce platform for ready-made clothing, custom sewing services, and fashion school enrollment.

## 🎯 Features

### Core E-Commerce
- Premium product catalog (Agbada, Native/Ankara, Jalabiya, Vintage, Accessories)
- Advanced filtering and search
- Shopping cart with real-time inventory
- Secure checkout with Stripe & Paystack
- Order tracking and management
- Product reviews and ratings
- Wishlist functionality
- Coupon/discount system

### Custom Sewing Services ⭐
- Multi-step guided workflow
- Style image uploads
- Fabric selection (customer-provided or catalog)
- Multiple measurement profiles
- Timeline preferences (Standard/Express)
- Quote system with admin approval
- Real-time status tracking

### Fashion School Portal 🎓
- Course catalog and registration
- Student dashboard
- Document uploads
- Payment processing
- Course schedule and announcements

### Admin Dashboard 📊
- Sales analytics and revenue tracking
- Product/category management
- Order and custom request management
- Student enrollment oversight
- Content management

## 🛠 Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Prisma** + PostgreSQL
- **NextAuth.js** - Authentication
- **Stripe & Paystack** - Payments
- **Cloudinary** - File uploads
- **Resend** - Emails
- **Tailwind CSS** + Framer Motion

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables (see .env.example)
cp .env.example .env

# Setup database
npx prisma migrate dev
npx prisma db seed

# Run development server
npm run dev
```

Visit http://localhost:3000

### Default Credentials

**Admin:** admin@andrewsapparel.com / Admin@123456
**Customer:** customer@test.com / Customer@123
**Student:** student@test.com / Student@123

## 📁 Project Structure

```
andrews-apparel/
├── src/
│   ├── app/                # Next.js app router
│   │   ├── (auth)/        # Auth routes
│   │   ├── (customer)/    # Customer dashboard
│   │   ├── (admin)/       # Admin panel
│   │   ├── (student)/     # Student portal
│   │   └── api/           # API routes
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── public/                # Static files
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Database
- Vercel Postgres
- Neon
- Supabase
- Railway

## 📖 Full Documentation

See detailed sections in this README:
- Environment Setup
- Database Schema
- API Endpoints
- Custom Sewing Workflow
- Payment Integration
- Email Notifications
- Security Features

## 📞 Support

- **Email:** support@andrewsapparel.com
- **WhatsApp:** +234-XXX-XXX-XXXX
- **Address:** Lokongoma Phase Two, Lokoja, Kogi State, Nigeria

---

Built with ❤️ for premium Nigerian fashion
