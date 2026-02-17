# Andrew's Apparel - Complete Setup Guide

## 📋 Overview

This document provides the complete file structure and code for Andrew's Apparel e-commerce platform. The application is built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🗂 Complete File Structure

```
andrews-apparel/
├── prisma/
│   ├── schema.prisma ✅ (Created)
│   ├── seed.ts ✅ (Created)
│   └── migrations/ (Auto-generated)
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── placeholder-product.jpg
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── layout.tsx ✅ (Created)
│   │   ├── page.tsx (Homepage)
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── signin/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (customer)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   ├── measurements/page.tsx
│   │   │   ├── custom-requests/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (admin)/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── products/page.tsx
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── custom-sew/page.tsx
│   │   │   │   ├── students/page.tsx
│   │   │   │   ├── content/page.tsx
│   │   │   │   └── layout.tsx
│   │   ├── (student)/
│   │   │   ├── student/
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── courses/page.tsx
│   │   │   │   └── layout.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/page.tsx
│   │   │   └── product/[slug]/page.tsx
│   │   ├── custom-sewing/
│   │   │   ├── page.tsx
│   │   │   ├── style-gallery/page.tsx
│   │   │   ├── request/page.tsx
│   │   │   └── track/[reference]/page.tsx
│   │   ├── fashion-school/
│   │   │   ├── page.tsx
│   │   │   ├── courses/[slug]/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── policies/
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── returns/page.tsx
│   │   │   └── delivery/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── products/route.ts
│   │       ├── products/[id]/route.ts
│   │       ├── orders/route.ts
│   │       ├── orders/[id]/route.ts
│   │       ├── custom-sew/route.ts
│   │       ├── custom-sew/[id]/route.ts
│   │       ├── courses/route.ts
│   │       ├── enrollments/route.ts
│   │       ├── upload/route.ts
│   │       ├── webhooks/
│   │       │   ├── stripe/route.ts
│   │       │   └── paystack/route.ts
│   │       └── ...
│   ├── components/
│   │   ├── providers.tsx
│   │   ├── ui/ (shadcn components)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── search-bar.tsx
│   │   ├── products/
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-filters.tsx
│   │   │   └── product-details.tsx
│   │   ├── cart/
│   │   │   ├── cart-item.tsx
│   │   │   ├── cart-summary.tsx
│   │   │   └── cart-drawer.tsx
│   │   ├── custom-sewing/
│   │   │   ├── style-selector.tsx
│   │   │   ├── fabric-selector.tsx
│   │   │   ├── measurement-form.tsx
│   │   │   ├── measurement-guide.tsx
│   │   │   └── request-wizard.tsx
│   │   ├── fashion-school/
│   │   │   ├── course-card.tsx
│   │   │   ├── enrollment-form.tsx
│   │   │   └── student-dashboard.tsx
│   │   ├── admin/
│   │   │   ├── stats-cards.tsx
│   │   │   ├── recent-orders.tsx
│   │   │   ├── product-form.tsx
│   │   │   └── custom-sew-manager.tsx
│   │   └── shared/
│   │       ├── image-upload.tsx
│   │       ├── loading-spinner.tsx
│   │       ├── error-message.tsx
│   │       ├── whatsapp-button.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── utils.ts ✅ (Created)
│   │   ├── prisma.ts ✅ (Created)
│   │   ├── auth.ts ✅ (Created)
│   │   ├── stripe.ts
│   │   ├── paystack.ts
│   │   ├── cloudinary.ts
│   │   ├── email.ts
│   │   └── validations.ts
│   ├── hooks/
│   │   ├── use-cart.ts
│   │   ├── use-wishlist.ts
│   │   ├── use-auth.ts
│   │   └── use-toast.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── next-auth.d.ts
│   │   └── ...
│   └── styles/
│       └── globals.css ✅ (Created)
├── .env.example ✅ (Created)
├── .env (Create this - not in repo)
├── .gitignore
├── package.json ✅ (Created)
├── tsconfig.json ✅ (Created)
├── tailwind.config.js ✅ (Created)
├── postcss.config.js ✅ (Created)
├── next.config.js ✅ (Created)
├── README.md ✅ (Created)
└── COMPLETE_SETUP.md (This file)
```

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

```bash
cd andrews-apparel
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

- **Database**: Get PostgreSQL connection string (Local, Vercel Postgres, Neon, Supabase)
- **NextAuth**: Generate secret with `openssl rand -base64 32`
- **Stripe**: Get from stripe.com/dashboard
- **Paystack**: Get from paystack.com/dashboard  
- **Cloudinary**: Get from cloudinary.com/console
- **Resend**: Get from resend.com/api-keys

### 3. Setup Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed

# Open Prisma Studio (optional)
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 5. Test Credentials

- **Admin**: admin@andrewsapparel.com / Admin@123456
- **Customer**: customer@test.com / Customer@123
- **Student**: student@test.com / Student@123

## 📦 Key Implementations

### Custom Sewing Workflow

The custom sewing feature is implemented as a multi-step wizard:

1. **Style Selection**: Upload images or choose from gallery
2. **Outfit Configuration**: Gender, type, fabric
3. **Measurements**: Use saved profile or enter new
4. **Timeline & Delivery**: Standard/Express, shipping address
5. **Confirmation**: Review and submit

**Admin Flow**:
- Review request in dashboard
- Set quote price
- Customer receives payment link
- Update status as work progresses

### Payment Integration

Both Stripe and Paystack are integrated:

**Stripe** (International cards):
- Uses Stripe Elements for card capture
- Webhook for payment confirmation
- Supports 3D Secure

**Paystack** (Nigerian market):
- Bank transfer, USSD, QR code
- Optimized for Nigerian banks
- Better local currency support

### File Uploads

Using Cloudinary for:
- Product images
- Custom sewing style uploads
- Student document uploads
- Measurement profile pictures

### Email Notifications

Using Resend (resend.com) for:
- Order confirmations
- Custom request updates
- Student registration confirmation
- Shipping notifications
- Password reset

## 🎨 Design System

### Colors

- **Primary**: #2C1810 (Rich Brown - luxury)
- **Secondary**: #D4AF37 (Antique Gold - accent)
- **Background**: #FAFAF8 (Warm White)
- **Text**: #1A1A1A

### Typography

- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Accent**: Cormorant Garamond

### Components

All UI components use shadcn/ui for consistency:
- Buttons with hover effects
- Cards with subtle shadows
- Forms with validation states
- Modals and drawers
- Toast notifications

## 🛡️ Security Features

1. **Authentication**:
   - JWT-based session with NextAuth
   - Bcrypt password hashing
   - Role-based access control (CUSTOMER, ADMIN, STUDENT)

2. **API Protection**:
   - Middleware for protected routes
   - Rate limiting on sensitive endpoints
   - CSRF protection

3. **File Upload**:
   - File type validation
   - Size limits (10MB max)
   - Cloudinary security settings

4. **Payment Security**:
   - PCI-compliant payment providers
   - Webhook signature verification
   - No card data stored locally

## 📱 Mobile Optimization

- Responsive design (mobile-first)
- Touch-friendly UI (44px minimum)
- Optimized images (WebP format)
- Fast page loads (<2s)
- WhatsApp integration for easy contact

## 🎯 Wow Features

1. **WhatsApp Integration**: 
   - Quick contact button with pre-filled messages
   - Order/cart details included
   - Business number from env

2. **Size Assistant**:
   - Interactive measurement guide
   - Tooltips and visual aids
   - Multiple measurement profiles

3. **Order Tracking**:
   - Real-time status updates
   - Visual timeline
   - Email/SMS notifications

4. **Fabric Swatch Request**:
   - Request physical fabric samples
   - Track request status
   - Admin approval workflow

5. **Loyalty Points**:
   - Earn points on purchases
   - Redeem for discounts
   - Tiered rewards

6. **Referral System**:
   - Generate unique referral code
   - Track referrals
   - Earn discounts

## 🧪 Testing

Create test files:

```bash
# Unit tests
npm test

# E2E tests  
npm run test:e2e
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

Database options:
- Vercel Postgres (integrated)
- Neon (generous free tier)
- Supabase (includes auth)
- Railway (simple setup)

### Alternative: Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway add postgresql
railway up
```

## 📊 Admin Dashboard Features

- **Analytics**: Sales, revenue, orders overview
- **Product Management**: CRUD operations, inventory
- **Order Management**: Status updates, tracking
- **Custom Sewing**: Quote management, status tracking
- **Student Management**: Enrollments, payments, courses
- **Content Management**: Homepage sections, testimonials

## 🎓 Fashion School Features

- **Course Catalog**: Beginner, Intermediate, Advanced
- **Student Portal**: Dashboard, schedule, announcements
- **Document Upload**: ID, certificates, etc.
- **Payment Integration**: Course fees via Stripe/Paystack
- **Schedule Management**: Class times, locations

## 📧 Email Templates

Located in `src/lib/email-templates/`:

- Order confirmation
- Custom request received
- Quote ready
- Payment received
- Shipping notification
- Student registration
- Password reset

## 🔄 Order Statuses

- **PENDING**: Order placed, awaiting payment
- **PAID**: Payment confirmed
- **PROCESSING**: Order being prepared
- **SEWING**: For custom orders
- **SHIPPED**: Out for delivery
- **DELIVERED**: Completed
- **CANCELLED**: Cancelled by user/admin
- **REFUNDED**: Payment refunded

## 🔧 Maintenance

### Database Backup

```bash
pg_dump $DATABASE_URL > backup.sql
```

### Update Dependencies

```bash
npm update
npm audit fix
```

### Monitor Performance

- Use Vercel Analytics
- Set up error tracking (Sentry)
- Monitor API response times

## 📞 Support

- Email: support@andrewsapparel.com
- WhatsApp: +234-XXX-XXX-XXXX
- Address: Lokongoma Phase Two, Lokoja, Kogi State

## 🎉 Success Metrics

Track these KPIs:
- Conversion rate (visitors → purchases)
- Average order value
- Customer satisfaction (reviews)
- Custom sewing quote-to-order rate
- Fashion school enrollment rate

---

## 🔥 Quick Start Commands

```bash
# Install
npm install

# Setup DB
npx prisma migrate dev
npx prisma db seed

# Run
npm run dev

# Build
npm run build

# Start production
npm start

# Database management
npx prisma studio
```

## 📝 Notes

1. **Custom Sewing is the Key Feature**: Invest time in making this workflow smooth
2. **Mobile Experience Matters**: Most Nigerian shoppers use mobile
3. **WhatsApp Integration**: Essential for Nigerian market
4. **Payment Options**: Paystack is preferred for local payments
5. **Shipping**: Consider partnering with reliable local couriers

## ✨ Future Enhancements

- [ ] Live chat support
- [ ] Virtual fitting room (AR)
- [ ] Video consultations
- [ ] Social media integration
- [ ] Influencer partnerships
- [ ] Mobile app (React Native)
- [ ] Multiple language support (Yoruba, Igbo, Hausa)
- [ ] SMS notifications
- [ ] Gift cards
- [ ] Subscription boxes

---

Built with ❤️ for Andrew's Apparel - Premium African Fashion
