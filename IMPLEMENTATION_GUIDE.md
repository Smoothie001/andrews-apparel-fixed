# Andrew's Apparel - Implementation Guide

## 🎯 Critical Components to Implement

This guide provides code examples for all remaining components and pages. Copy and adapt these implementations.

## 📂 Component Implementation Order

### Priority 1: Core UI Components (shadcn/ui)

Install shadcn/ui components:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card dialog dropdown-menu label select separator tabs toast
```

### Priority 2: Layout Components

#### Header Component
Location: `src/components/layout/header.tsx`

```tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const { data: session } = useSession();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-primary">
            Andrew's Apparel
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/custom-sewing" className="hover:text-primary transition-colors">
              Custom Sewing
            </Link>
            <Link href="/fashion-school" className="hover:text-primary transition-colors">
              Fashion School
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {session ? (
              <Link href={session.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

#### Footer Component
Location: `src/components/layout/footer.tsx`

```tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Andrew's Apparel</h3>
            <p className="text-sm opacity-90 mb-4">
              Premium African fashion, custom tailoring, and fashion education in Lokoja, Kogi State.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-secondary">Shop</Link></li>
              <li><Link href="/custom-sewing" className="hover:text-secondary">Custom Sewing</Link></li>
              <li><Link href="/fashion-school" className="hover:text-secondary">Fashion School</Link></li>
              <li><Link href="/about" className="hover:text-secondary">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-secondary">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-secondary">Terms & Conditions</Link></li>
              <li><Link href="/policies/returns" className="hover:text-secondary">Returns Policy</Link></li>
              <li><Link href="/policies/delivery" className="hover:text-secondary">Delivery Info</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Lokongoma Phase Two, Lokoja, Kogi State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+234-XXX-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@andrewsapparel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Andrew's Apparel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

### Priority 3: Custom Sewing Components

#### Custom Sewing Request Wizard
Location: `src/components/custom-sewing/request-wizard.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StyleSelector } from './style-selector';
import { FabricSelector } from './fabric-selector';
import { MeasurementForm } from './measurement-form';

export function RequestWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, name: 'Style Selection', component: <StyleSelector /> },
    { id: 2, name: 'Outfit Configuration', component: <OutfitConfig /> },
    { id: 3, name: 'Fabric Selection', component: <FabricSelector /> },
    { id: 4, name: 'Measurements', component: <MeasurementForm /> },
    { id: 5, name: 'Timeline & Delivery', component: <TimelineDelivery /> },
    { id: 6, name: 'Review & Submit', component: <ReviewSubmit /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`flex-1 text-center text-sm ${
                s.id <= step ? 'text-primary font-semibold' : 'text-muted-foreground'
              }`}
            >
              {s.name}
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="card-luxury p-8">
        {steps[step - 1].component}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-8 border-t">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setStep(step + 1)}
            disabled={step === steps.length}
          >
            {step === steps.length ? 'Submit Request' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### Measurement Form
Location: `src/components/custom-sewing/measurement-form.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const measurements = {
  male: [
    { name: 'Chest', tooltip: 'Measure around the fullest part of the chest' },
    { name: 'Waist', tooltip: 'Measure around natural waistline' },
    { name: 'Hip', tooltip: 'Measure around fullest part of hips' },
    { name: 'Shoulder', tooltip: 'Measure from shoulder to shoulder across back' },
    { name: 'Sleeve Length', tooltip: 'Measure from shoulder to wrist' },
    { name: 'Neck', tooltip: 'Measure around base of neck' },
    { name: 'Shirt Length', tooltip: 'Measure from shoulder to desired length' },
    { name: 'Trouser Length', tooltip: 'Measure from waist to ankle' },
  ],
  female: [
    { name: 'Bust', tooltip: 'Measure around fullest part of bust' },
    { name: 'Waist', tooltip: 'Measure around natural waistline' },
    { name: 'Hip', tooltip: 'Measure around fullest part of hips' },
    { name: 'Shoulder', tooltip: 'Measure from shoulder to shoulder' },
    { name: 'Sleeve Length', tooltip: 'Measure from shoulder to wrist' },
    { name: 'Dress Length', tooltip: 'Measure from shoulder to desired hem' },
    { name: 'Arm Hole', tooltip: 'Measure around arm at armpit' },
  ],
};

export function MeasurementForm({ gender }: { gender: 'Male' | 'Female' }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const currentMeasurements = gender === 'Male' ? measurements.male : measurements.female;

  return (
    <div>
      <Tabs defaultValue="new">
        <TabsList className="mb-6">
          <TabsTrigger value="saved">Use Saved Profile</TabsTrigger>
          <TabsTrigger value="new">Enter New Measurements</TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          {/* List of saved measurement profiles */}
          <div className="space-y-4">
            <p className="text-muted-foreground">Select a saved measurement profile:</p>
            {/* Fetch and display saved profiles */}
          </div>
        </TabsContent>

        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMeasurements.map((measurement) => (
              <div key={measurement.name}>
                <Label htmlFor={measurement.name} className="flex items-center gap-2">
                  {measurement.name}
                  <span className="text-xs text-muted-foreground" title={measurement.tooltip}>
                    ⓘ
                  </span>
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id={measurement.name}
                    type="number"
                    placeholder="0"
                    value={values[measurement.name] || ''}
                    onChange={(e) => setValues({ ...values, [measurement.name]: e.target.value })}
                  />
                  <span className="flex items-center text-muted-foreground">inches</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Need help with measurements?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Watch our measurement guide video or book a fitting appointment at our Lokoja showroom.
            </p>
            <Button variant="outline" size="sm">View Measurement Guide</Button>
          </div>

          <div className="mt-6">
            <Label htmlFor="profile-name">Save as profile (optional)</Label>
            <Input
              id="profile-name"
              placeholder="e.g., John - Regular Fit"
              className="mt-2"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Priority 4: API Routes

#### Products API
Location: `src/app/api/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication here
    const data = await request.json();

    const product = await prisma.product.create({
      data: {
        ...data,
        slug: data.slug || slugify(data.name),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
```

#### Custom Sewing API
Location: `src/app/api/custom-sew/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { generateReferenceNumber } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const customRequest = await prisma.customSewRequest.create({
      data: {
        referenceNumber: generateReferenceNumber(),
        userId: session.user.id,
        gender: data.gender,
        outfitType: data.outfitType,
        fabricOption: data.fabricOption,
        fabricId: data.fabricId,
        fabricNotes: data.fabricNotes,
        measurementProfileId: data.measurementProfileId,
        customMeasurements: data.customMeasurements,
        timeline: data.timeline,
        shippingAddress: data.shippingAddress,
        notes: data.notes,
        styleGalleryId: data.styleGalleryId,
      },
    });

    // Upload files if provided
    if (data.files && data.files.length > 0) {
      await prisma.customSewFile.createMany({
        data: data.files.map((file: any) => ({
          requestId: customRequest.id,
          fileUrl: file.url,
          fileType: file.type,
        })),
      });
    }

    // Send email notification
    // await sendCustomRequestEmail(customRequest);

    return NextResponse.json(customRequest, { status: 201 });
  } catch (error) {
    console.error('Custom sew request error:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}
```

### Priority 5: Hooks

#### useCart Hook
Location: `src/hooks/use-cart.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

## 🔐 Authentication Pages

#### Sign In Page
Location: `src/app/(auth)/signin/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="heading-subsection mb-2">Welcome Back</h1>
        <p className="text-muted-foreground mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-2" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required className="mt-2" />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

## 🎨 Styling Tips

1. **Use the design tokens** from `globals.css` and `tailwind.config.js`
2. **Animate strategically**: Use `animate-fade-in-up` for staggered reveals
3. **Maintain consistency**: Use `card-luxury`, `btn-primary`, etc.
4. **Mobile-first**: Always test on mobile viewport first
5. **Premium feel**: Add subtle shadows, smooth transitions, elegant spacing

## 📱 WhatsApp Integration

```typescript
// In any component
import { generateWhatsAppLink } from '@/lib/utils';

function ContactButton({ orderId }: { orderId: string }) {
  const message = `Hi Andrew's Apparel! I have a question about my order ${orderId}.`;
  const whatsappLink = generateWhatsAppLink(message);

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <Button>Contact Us on WhatsApp</Button>
    </a>
  );
}
```

## 🚀 Deployment Checklist

- [ ] Set all environment variables in Vercel
- [ ] Run database migrations in production
- [ ] Test payment webhooks with live keys
- [ ] Set up domain and SSL
- [ ] Configure email sending domain
- [ ] Test all user flows end-to-end
- [ ] Set up error monitoring (Sentry)
- [ ] Enable analytics (Vercel Analytics)

## 📚 Additional Resources

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- NextAuth.js: https://next-auth.js.org
- shadcn/ui: https://ui.shadcn.com
- Stripe: https://stripe.com/docs
- Paystack: https://paystack.com/docs

---

This implementation guide covers the core architecture. Adapt and extend based on your specific needs!
