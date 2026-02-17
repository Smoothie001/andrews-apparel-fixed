import { PrismaClient, UserRole, OutfitType, CourseLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.customSewFile.deleteMany(),
    prisma.customSewRequest.deleteMany(),
    prisma.studentEnrollment.deleteMany(),
    prisma.courseSchedule.deleteMany(),
    prisma.review.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.productVariant.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.measurementProfile.deleteMany(),
    prisma.fabricCatalog.deleteMany(),
    prisma.styleGallery.deleteMany(),
    prisma.course.deleteMany(),
    prisma.coupon.deleteMany(),
    prisma.shippingZone.deleteMany(),
    prisma.loyaltyPoints.deleteMany(),
    prisma.referralCode.deleteMany(),
    prisma.fabricSwatchRequest.deleteMany(),
    prisma.homepageSection.deleteMany(),
    prisma.testimonial.deleteMany(),
    prisma.fAQ.deleteMany(),
    prisma.policy.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.address.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create Users
  const hashedPassword = await bcrypt.hash('Admin@123456', 12);
  const customerPassword = await bcrypt.hash('Customer@123', 12);
  const studentPassword = await bcrypt.hash('Student@123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@andrewsapparel.com',
      password: hashedPassword,
      name: 'Andrew Okeke',
      phone: '+2348012345678',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'customer@test.com',
      password: customerPassword,
      name: 'Chika Nwosu',
      phone: '+2348023456789',
      role: UserRole.CUSTOMER,
      emailVerified: true,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      email: 'student@test.com',
      password: studentPassword,
      name: 'Amina Hassan',
      phone: '+2348034567890',
      role: UserRole.STUDENT,
      emailVerified: true,
    },
  });

  console.log('✅ Users created');

  // Create Addresses
  await prisma.address.createMany({
    data: [
      {
        userId: customer1.id,
        fullName: 'Chika Nwosu',
        phone: '+2348023456789',
        address1: '15 Ahmadu Bello Way',
        city: 'Lokoja',
        state: 'Kogi',
        country: 'Nigeria',
        isDefault: true,
      },
      {
        userId: student1.id,
        fullName: 'Amina Hassan',
        phone: '+2348034567890',
        address1: '8 Ibrahim Babangida Boulevard',
        city: 'Lokoja',
        state: 'Kogi',
        country: 'Nigeria',
        isDefault: true,
      },
    ],
  });

  // Create Categories
  const menCategory = await prisma.category.create({
    data: {
      name: "Men's Fashion",
      slug: 'mens-fashion',
      description: 'Premium African attire for the modern gentleman',
      isActive: true,
      displayOrder: 1,
    },
  });

  const womenCategory = await prisma.category.create({
    data: {
      name: "Women's Fashion",
      slug: 'womens-fashion',
      description: 'Elegant African fashion for women',
      isActive: true,
      displayOrder: 2,
    },
  });

  const agbadaCategory = await prisma.category.create({
    data: {
      name: 'Agbada',
      slug: 'agbada',
      description: 'Traditional flowing robes for special occasions',
      parentId: menCategory.id,
      isActive: true,
      displayOrder: 1,
    },
  });

  const nativeCategory = await prisma.category.create({
    data: {
      name: 'Native/Ankara',
      slug: 'native-ankara',
      description: 'Vibrant African prints and traditional attire',
      isActive: true,
      displayOrder: 3,
    },
  });

  const jalabiyaCategory = await prisma.category.create({
    data: {
      name: 'Jalabiya',
      slug: 'jalabiya',
      description: 'Comfortable traditional Islamic wear',
      isActive: true,
      displayOrder: 4,
    },
  });

  const vintageCategory = await prisma.category.create({
    data: {
      name: 'Vintage',
      slug: 'vintage',
      description: 'Classic styles with timeless appeal',
      isActive: true,
      displayOrder: 5,
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Complete your look with caps and shoes',
      isActive: true,
      displayOrder: 6,
    },
  });

  console.log('✅ Categories created');

  // Create Products - Agbada
  const agbada1 = await prisma.product.create({
    data: {
      name: 'Royal Blue Agbada with Gold Embroidery',
      slug: 'royal-blue-agbada-gold',
      description: 'Luxurious royal blue agbada featuring intricate gold embroidery along the neckline and sleeves. Perfect for weddings, naming ceremonies, and high-profile events. Made from premium damask fabric with hand-stitched details.',
      categoryId: agbadaCategory.id,
      basePrice: 85000,
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
      ],
      fabricType: 'Premium Damask',
      gender: 'Male',
      isActive: true,
      isFeatured: true,
      sku: 'AGB-001-RB',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: agbada1.id, size: 'M', stock: 5, sku: 'AGB-001-RB-M' },
      { productId: agbada1.id, size: 'L', stock: 8, sku: 'AGB-001-RB-L' },
      { productId: agbada1.id, size: 'XL', stock: 10, sku: 'AGB-001-RB-XL' },
      { productId: agbada1.id, size: 'XXL', stock: 6, sku: 'AGB-001-RB-XXL' },
    ],
  });

  const agbada2 = await prisma.product.create({
    data: {
      name: 'White Senator Agbada',
      slug: 'white-senator-agbada',
      description: 'Classic white senator-style agbada with silver threading. Ideal for traditional weddings and formal gatherings. Crisp, clean lines with a modern fit.',
      categoryId: agbadaCategory.id,
      basePrice: 75000,
      images: [
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8',
      ],
      fabricType: 'Cotton Brocade',
      gender: 'Male',
      isActive: true,
      isFeatured: true,
      sku: 'AGB-002-WH',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: agbada2.id, size: 'M', stock: 4, sku: 'AGB-002-WH-M' },
      { productId: agbada2.id, size: 'L', stock: 7, sku: 'AGB-002-WH-L' },
      { productId: agbada2.id, size: 'XL', stock: 9, sku: 'AGB-002-WH-XL' },
    ],
  });

  // Native/Ankara Products
  const ankara1 = await prisma.product.create({
    data: {
      name: 'Ankara Maxi Dress with Bell Sleeves',
      slug: 'ankara-maxi-dress-bell-sleeves',
      description: 'Stunning ankara maxi dress featuring bold geometric patterns and dramatic bell sleeves. Floor-length design perfect for parties, owambe, and cultural celebrations. Available in multiple vibrant colorways.',
      categoryId: nativeCategory.id,
      basePrice: 28000,
      images: [
        'https://images.unsplash.com/photo-1617922001439-4a2e6562f328',
      ],
      fabricType: 'Premium Ankara',
      gender: 'Female',
      isActive: true,
      isFeatured: true,
      sku: 'ANK-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: ankara1.id, size: 'S', color: 'Blue/Orange', stock: 6, sku: 'ANK-001-S-BO' },
      { productId: ankara1.id, size: 'M', color: 'Blue/Orange', stock: 10, sku: 'ANK-001-M-BO' },
      { productId: ankara1.id, size: 'L', color: 'Blue/Orange', stock: 8, sku: 'ANK-001-L-BO' },
      { productId: ankara1.id, size: 'M', color: 'Green/Yellow', stock: 5, sku: 'ANK-001-M-GY' },
      { productId: ankara1.id, size: 'L', color: 'Green/Yellow', stock: 7, sku: 'ANK-001-L-GY' },
    ],
  });

  const native1 = await prisma.product.create({
    data: {
      name: "Men's Native Shirt and Trouser Set",
      slug: 'mens-native-shirt-trouser',
      description: 'Elegant native wear combining comfort and style. Features a tailored shirt with traditional embroidery and matching straight-cut trousers. Perfect for Sunday service, family gatherings, and business casual events.',
      categoryId: nativeCategory.id,
      basePrice: 35000,
      images: [
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
      ],
      fabricType: 'Cotton Atiku',
      gender: 'Male',
      isActive: true,
      sku: 'NAT-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: native1.id, size: 'M', color: 'White', stock: 8, sku: 'NAT-001-M-WH' },
      { productId: native1.id, size: 'L', color: 'White', stock: 12, sku: 'NAT-001-L-WH' },
      { productId: native1.id, size: 'XL', color: 'White', stock: 10, sku: 'NAT-001-XL-WH' },
      { productId: native1.id, size: 'L', color: 'Cream', stock: 6, sku: 'NAT-001-L-CR' },
    ],
  });

  // Jalabiya Products
  const jalabiya1 = await prisma.product.create({
    data: {
      name: 'Premium White Jalabiya',
      slug: 'premium-white-jalabiya',
      description: 'Elegant white jalabiya crafted from breathable cotton. Features a relaxed fit with subtle embroidery details. Ideal for daily wear, prayers, and religious occasions.',
      categoryId: jalabiyaCategory.id,
      basePrice: 18000,
      images: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
      ],
      fabricType: 'Egyptian Cotton',
      gender: 'Male',
      isActive: true,
      sku: 'JAL-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: jalabiya1.id, size: 'M', stock: 15, sku: 'JAL-001-M' },
      { productId: jalabiya1.id, size: 'L', stock: 20, sku: 'JAL-001-L' },
      { productId: jalabiya1.id, size: 'XL', stock: 18, sku: 'JAL-001-XL' },
      { productId: jalabiya1.id, size: 'XXL', stock: 12, sku: 'JAL-001-XXL' },
    ],
  });

  // Vintage Products
  const vintage1 = await prisma.product.create({
    data: {
      name: 'Vintage Embroidered Kaftan',
      slug: 'vintage-embroidered-kaftan',
      description: 'Classic kaftan with vintage-inspired embroidery patterns. Loose, comfortable fit perfect for relaxation and casual gatherings. Timeless design that never goes out of style.',
      categoryId: vintageCategory.id,
      basePrice: 32000,
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
      ],
      fabricType: 'Linen Blend',
      gender: 'Unisex',
      isActive: true,
      sku: 'VIN-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: vintage1.id, size: 'M', stock: 6, sku: 'VIN-001-M' },
      { productId: vintage1.id, size: 'L', stock: 8, sku: 'VIN-001-L' },
      { productId: vintage1.id, size: 'XL', stock: 5, sku: 'VIN-001-XL' },
    ],
  });

  // Accessories
  const cap1 = await prisma.product.create({
    data: {
      name: 'Traditional Abeti Aja Cap',
      slug: 'traditional-abeti-aja-cap',
      description: 'Handcrafted Yoruba Abeti Aja cap made from authentic aso-oke fabric. Perfect complement to native wear and agbada. Available in various colors to match your outfit.',
      categoryId: accessoriesCategory.id,
      basePrice: 8500,
      images: [
        'https://images.unsplash.com/photo-1521369909029-2afed882baee',
      ],
      fabricType: 'Aso-oke',
      gender: 'Male',
      isActive: true,
      sku: 'CAP-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: cap1.id, size: 'One Size', color: 'Brown', stock: 20, sku: 'CAP-001-BR' },
      { productId: cap1.id, size: 'One Size', color: 'Black', stock: 25, sku: 'CAP-001-BK' },
      { productId: cap1.id, size: 'One Size', color: 'Gold', stock: 15, sku: 'CAP-001-GD' },
    ],
  });

  const shoes1 = await prisma.product.create({
    data: {
      name: 'Handmade Leather Slippers',
      slug: 'handmade-leather-slippers',
      description: 'Premium handcrafted leather slippers. Comfortable and durable, perfect for pairing with traditional attire. Features soft inner lining and non-slip sole.',
      categoryId: accessoriesCategory.id,
      basePrice: 15000,
      images: [
        'https://images.unsplash.com/photo-1603487742131-4160ec999306',
      ],
      fabricType: 'Genuine Leather',
      gender: 'Male',
      isActive: true,
      sku: 'SHOE-001',
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: shoes1.id, size: '40', color: 'Brown', stock: 8, sku: 'SHOE-001-40-BR' },
      { productId: shoes1.id, size: '42', color: 'Brown', stock: 12, sku: 'SHOE-001-42-BR' },
      { productId: shoes1.id, size: '44', color: 'Brown', stock: 10, sku: 'SHOE-001-44-BR' },
      { productId: shoes1.id, size: '42', color: 'Black', stock: 15, sku: 'SHOE-001-42-BK' },
      { productId: shoes1.id, size: '44', color: 'Black', stock: 12, sku: 'SHOE-001-44-BK' },
    ],
  });

  console.log('✅ Products created');

  // Create Fabric Catalog
  await prisma.fabricCatalog.createMany({
    data: [
      {
        name: 'Premium Damask',
        description: 'Luxurious damask fabric with intricate woven patterns',
        type: 'Damask',
        color: 'Royal Blue',
        pricePerYard: 3500,
        inStock: true,
      },
      {
        name: 'Senator Material',
        description: 'High-quality senator fabric ideal for formal wear',
        type: 'Senator',
        color: 'White',
        pricePerYard: 2800,
        inStock: true,
      },
      {
        name: 'Ankara Print',
        description: 'Vibrant African print fabric',
        type: 'Ankara',
        color: 'Multi-color',
        pattern: 'Geometric',
        pricePerYard: 1500,
        inStock: true,
      },
      {
        name: 'Cotton Atiku',
        description: 'Breathable cotton fabric for comfortable wear',
        type: 'Cotton',
        color: 'Cream',
        pricePerYard: 2000,
        inStock: true,
      },
      {
        name: 'Lace Material',
        description: 'Elegant lace fabric for special occasions',
        type: 'Lace',
        color: 'Gold',
        pricePerYard: 5000,
        inStock: true,
      },
    ],
  });

  console.log('✅ Fabric catalog created');

  // Create Style Gallery
  await prisma.styleGallery.createMany({
    data: [
      {
        name: 'Classic Agbada Style',
        description: 'Traditional flowing agbada with wide sleeves',
        outfitType: OutfitType.AGBADA,
        gender: 'Male',
        images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2'],
        isActive: true,
      },
      {
        name: 'Modern Senator Cut',
        description: 'Contemporary senator style with fitted sleeves',
        outfitType: OutfitType.AGBADA,
        gender: 'Male',
        images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8'],
        isActive: true,
      },
      {
        name: 'Ankara Gown with Flare',
        description: 'Elegant ankara gown with flared skirt',
        outfitType: OutfitType.ANKARA,
        gender: 'Female',
        images: ['https://images.unsplash.com/photo-1617922001439-4a2e6562f328'],
        isActive: true,
      },
      {
        name: 'Traditional Jalabiya',
        description: 'Classic jalabiya with embroidered neckline',
        outfitType: OutfitType.JALABIYA,
        gender: 'Male',
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a'],
        isActive: true,
      },
    ],
  });

  console.log('✅ Style gallery created');

  // Create Courses
  const beginnerCourse = await prisma.course.create({
    data: {
      name: 'Beginner Fashion Design',
      slug: 'beginner-fashion-design',
      description: 'Learn the fundamentals of fashion design and sewing. Perfect for those starting their journey in fashion. Covers basic stitching, pattern making, and garment construction.',
      level: CourseLevel.BEGINNER,
      duration: '3 months',
      price: 50000,
      isActive: true,
      syllabus: {
        modules: [
          { week: 1, topic: 'Introduction to Fashion Design' },
          { week: 2, topic: 'Understanding Fabrics and Materials' },
          { week: 3, topic: 'Basic Hand Stitching Techniques' },
          { week: 4, topic: 'Machine Sewing Basics' },
          { week: 5, topic: 'Taking Body Measurements' },
          { week: 6, topic: 'Simple Pattern Making' },
          { week: 7, topic: 'Constructing a Basic Skirt' },
          { week: 8, topic: 'Making a Simple Top' },
          { week: 9, topic: 'Finishing Techniques' },
          { week: 10, topic: 'Introduction to Ankara Fashion' },
          { week: 11, topic: 'Project: Complete Outfit' },
          { week: 12, topic: 'Final Assessment and Certification' },
        ],
      },
    },
  });

  const intermediateCourse = await prisma.course.create({
    data: {
      name: 'Intermediate Fashion & Pattern Making',
      slug: 'intermediate-fashion-pattern-making',
      description: 'Advance your skills with complex patterns and professional finishing. Learn to create custom-fitted garments and work with diverse fabrics including traditional African materials.',
      level: CourseLevel.INTERMEDIATE,
      duration: '4 months',
      price: 85000,
      isActive: true,
      syllabus: {
        modules: [
          { week: 1, topic: 'Advanced Pattern Drafting' },
          { week: 2, topic: 'Creating Agbada Patterns' },
          { week: 3, topic: 'Working with Damask and Lace' },
          { week: 4, topic: 'Custom Fitting Techniques' },
          { week: 5, topic: 'Trouser Construction' },
          { week: 6, topic: 'Shirt Making Mastery' },
          { week: 7, topic: 'Creating Ankara Designs' },
          { week: 8, topic: 'Embroidery and Embellishment' },
          { week: 9, topic: 'Professional Finishing' },
          { week: 10, topic: 'Business of Fashion' },
          { week: 11, topic: 'Portfolio Development' },
          { week: 12, topic: 'Final Project: Complete Outfit' },
        ],
      },
    },
  });

  const advancedCourse = await prisma.course.create({
    data: {
      name: 'Advanced Couture & Fashion Business',
      slug: 'advanced-couture-fashion-business',
      description: 'Master haute couture techniques and learn to run a successful fashion business. Includes advanced draping, luxury garment construction, and fashion entrepreneurship.',
      level: CourseLevel.ADVANCED,
      duration: '6 months',
      price: 150000,
      isActive: true,
      syllabus: {
        modules: [
          { month: 1, topic: 'Couture Techniques and Standards' },
          { month: 2, topic: 'Advanced Agbada Construction' },
          { month: 3, topic: 'Luxury Embellishment Methods' },
          { month: 4, topic: 'Fashion Illustration & Design' },
          { month: 5, topic: 'Building Your Fashion Brand' },
          { month: 6, topic: 'Final Collection & Business Plan' },
        ],
      },
    },
  });

  console.log('✅ Courses created');

  // Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        description: 'Welcome discount for new customers',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minPurchase: 20000,
        usageLimit: 100,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
      },
      {
        code: 'FESTIVE20',
        description: 'Festive season special offer',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        minPurchase: 50000,
        maxDiscount: 15000,
        usageLimit: 50,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
      },
      {
        code: 'FREESHIP',
        description: 'Free shipping on orders above ₦100,000',
        discountType: 'FIXED_AMOUNT',
        discountValue: 2000,
        minPurchase: 100000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
      },
    ],
  });

  console.log('✅ Coupons created');

  // Create Shipping Zones
  await prisma.shippingZone.createMany({
    data: [
      { name: 'Lokoja Local', country: 'Nigeria', state: 'Kogi', shippingFee: 1000, isActive: true },
      { name: 'Kogi State', country: 'Nigeria', state: 'Kogi', shippingFee: 2000, isActive: true },
      { name: 'North Central', country: 'Nigeria', shippingFee: 3000, isActive: true },
      { name: 'Lagos', country: 'Nigeria', state: 'Lagos', shippingFee: 4000, isActive: true },
      { name: 'Abuja', country: 'Nigeria', state: 'FCT', shippingFee: 3500, isActive: true },
      { name: 'Port Harcourt', country: 'Nigeria', state: 'Rivers', shippingFee: 5000, isActive: true },
      { name: 'Other Nigerian States', country: 'Nigeria', shippingFee: 4500, isActive: true },
      { name: 'International Shipping', country: 'International', shippingFee: 15000, isActive: true },
    ],
  });

  console.log('✅ Shipping zones created');

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Alhaji Musa Ibrahim',
        role: 'Customer',
        content: 'Andrew\'s Apparel delivered the most beautiful agbada for my son\'s wedding. The quality and craftsmanship exceeded my expectations. The custom sewing service was professional and timely.',
        rating: 5,
        isActive: true,
      },
      {
        name: 'Mrs. Blessing Okafor',
        role: 'Customer',
        content: 'I ordered a custom ankara dress and it fit perfectly! The team was patient with my measurements and the final product was stunning. Highly recommend for anyone looking for quality African fashion.',
        rating: 5,
        isActive: true,
      },
      {
        name: 'David Adeyemi',
        role: 'Fashion School Student',
        content: 'The intermediate fashion course transformed my sewing skills. The instructors are knowledgeable and the hands-on approach helped me start my own fashion business. Best decision I made!',
        rating: 5,
        isActive: true,
      },
      {
        name: 'Fatima Abubakar',
        role: 'Customer',
        content: 'Fast delivery to Abuja and the jalabiya quality is top-notch. My husband loves the comfortable fit and elegant design. Will definitely order again.',
        rating: 5,
        isActive: true,
      },
    ],
  });

  console.log('✅ Testimonials created');

  // Create FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'How do I take my measurements for custom sewing?',
        answer: 'We provide a detailed measurement guide when you start a custom sewing request. For best results, have someone help you measure. You can also book a fitting appointment at our Lokoja showroom.',
        category: 'Measurements',
        displayOrder: 1,
        isActive: true,
      },
      {
        question: 'How long does custom sewing take?',
        answer: 'Standard custom sewing takes 2-3 weeks from payment confirmation. Express service (additional fee) completes your order in 7-10 business days. Timeline may vary during peak seasons (December, Easter).',
        category: 'Custom Sewing',
        displayOrder: 2,
        isActive: true,
      },
      {
        question: 'What are the shipping costs?',
        answer: 'Shipping within Lokoja starts at ₦1,000. Kogi State: ₦2,000. Lagos/Abuja: ₦3,500-₦4,000. Other states: ₦4,500. International shipping: ₦15,000. Free shipping on orders above ₦100,000.',
        category: 'Shipping',
        displayOrder: 3,
        isActive: true,
      },
      {
        question: 'Do you accept returns?',
        answer: 'We accept returns on ready-made items within 7 days if unworn with tags attached. Custom-sewn items are non-returnable but we offer free alterations within 14 days of delivery if fit adjustments are needed.',
        category: 'Returns',
        displayOrder: 4,
        isActive: true,
      },
      {
        question: 'Can I provide my own fabric for custom sewing?',
        answer: 'Yes! You can choose "Customer will send fabric" when placing your custom order. We\'ll provide instructions for sending your fabric to our Lokoja workshop. Alternatively, select from our premium fabric catalog.',
        category: 'Custom Sewing',
        displayOrder: 5,
        isActive: true,
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Stripe (card payments), Paystack (card, bank transfer, USSD), and direct bank transfer. All major debit and credit cards are supported.',
        category: 'Payments',
        displayOrder: 6,
        isActive: true,
      },
      {
        question: 'How do I track my order?',
        answer: 'After your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order status in your customer dashboard at any time.',
        category: 'Shipping',
        displayOrder: 7,
        isActive: true,
      },
      {
        question: 'Do you offer fashion training courses?',
        answer: 'Yes! We offer Beginner (3 months, ₦50,000), Intermediate (4 months, ₦85,000), and Advanced (6 months, ₦150,000) fashion design courses. Classes are held at our Lokongoma facility.',
        category: 'Fashion School',
        displayOrder: 8,
        isActive: true,
      },
    ],
  });

  console.log('✅ FAQs created');

  // Create Policies
  await prisma.policy.createMany({
    data: [
      {
        type: 'PRIVACY',
        title: 'Privacy Policy',
        content: `# Privacy Policy\n\nLast updated: January 2024\n\nAndrew's Apparel ("we", "our", "us") respects your privacy and is committed to protecting your personal data.\n\n## Information We Collect\n\n- Personal identification information (name, email, phone number)\n- Shipping addresses\n- Payment information (processed securely through Stripe/Paystack)\n- Measurement data for custom sewing\n- Photos uploaded for custom sewing requests\n\n## How We Use Your Information\n\n- Process and fulfill orders\n- Provide custom sewing services\n- Send order updates and confirmations\n- Improve our services\n- Marketing communications (with your consent)\n\n## Data Security\n\nWe implement industry-standard security measures to protect your personal information. Payment data is encrypted and processed through PCI-compliant payment providers.\n\n## Your Rights\n\n- Access your personal data\n- Request data correction or deletion\n- Opt-out of marketing communications\n- Request data portability\n\n## Contact Us\n\nFor privacy concerns: privacy@andrewsapparel.com`,
        isActive: true,
      },
      {
        type: 'TERMS',
        title: 'Terms and Conditions',
        content: `# Terms and Conditions\n\nLast updated: January 2024\n\n## 1. Acceptance of Terms\n\nBy accessing and using Andrew's Apparel website and services, you accept and agree to be bound by these Terms and Conditions.\n\n## 2. Products and Services\n\n- Ready-made clothing items are sold as-is\n- Custom sewing requires accurate measurements\n- Fashion school enrollment is subject to availability\n\n## 3. Orders and Payments\n\n- All prices are in Nigerian Naira (₦)\n- Payment must be completed before order processing\n- Custom sewing requires 50% deposit upfront\n\n## 4. Shipping and Delivery\n\n- Delivery timeframes are estimates\n- Risk of loss passes to customer upon delivery\n- International orders may be subject to customs fees\n\n## 5. Returns and Exchanges\n\n- Ready-made items: 7-day return policy\n- Custom-sewn items: Non-returnable (alterations offered)\n- Items must be unworn with original tags\n\n## 6. Intellectual Property\n\nAll content, designs, and trademarks are property of Andrew's Apparel.\n\n## 7. Limitation of Liability\n\nWe are not liable for indirect, incidental, or consequential damages.\n\n## Contact\n\nFor questions: legal@andrewsapparel.com`,
        isActive: true,
      },
      {
        type: 'RETURNS',
        title: 'Returns and Exchange Policy',
        content: `# Returns and Exchange Policy\n\n## Ready-Made Items\n\n**7-Day Return Window**\n- Items must be unworn, unwashed, with tags attached\n- Original packaging required\n- Receipt or proof of purchase needed\n\n**Return Process:**\n1. Contact customer service within 7 days\n2. Receive return authorization\n3. Ship item back (customer pays return shipping)\n4. Refund processed within 5-7 business days\n\n## Custom-Sewn Items\n\n**Non-Returnable**\nCustom-made garments cannot be returned as they are made to your specifications.\n\n**Free Alterations:**\n- Available within 14 days of delivery\n- For fit adjustments only\n- Bring item to our Lokoja showroom\n\n## Damaged or Defective Items\n\n- Report within 48 hours of delivery\n- Provide photos of damage\n- Full refund or replacement offered\n\n## Exchanges\n\n- Available for different size/color if in stock\n- Exchange shipping fees apply\n- Must meet return criteria above\n\n## Contact for Returns\n\nEmail: returns@andrewsapparel.com\nPhone: +234-801-234-5678\nAddress: Lokongoma Phase Two, Lokoja, Kogi State`,
        isActive: true,
      },
      {
        type: 'DELIVERY',
        title: 'Delivery Information',
        content: `# Delivery Information\n\n## Delivery Timeframes\n\n**Ready-Made Items:**\n- Lokoja: 1-2 business days\n- Kogi State: 2-3 business days\n- Lagos/Abuja: 3-5 business days\n- Other states: 4-7 business days\n- International: 10-21 business days\n\n**Custom Sewing:**\n- Standard: 2-3 weeks after payment\n- Express: 7-10 business days (additional fee)\n\n## Shipping Costs\n\n- Lokoja: ₦1,000\n- Kogi State: ₦2,000\n- Lagos/Abuja: ₦3,500-₦4,000\n- Other Nigerian states: ₦4,500\n- International: ₦15,000+\n\n**Free Shipping:** Orders above ₦100,000\n\n## Order Tracking\n\n- Tracking number sent via email/SMS\n- Track in customer dashboard\n- Customer service available for assistance\n\n## Delivery Partners\n\n- GIG Logistics\n- DHL (international)\n- Pickup available at Lokoja showroom\n\n## Failed Delivery\n\n- 3 delivery attempts made\n- Held at local depot for 7 days\n- Customer responsible for pickup/redelivery fees\n\n## Contact\n\nShipping inquiries: shipping@andrewsapparel.com`,
        isActive: true,
      },
    ],
  });

  console.log('✅ Policies created');

  // Create Homepage Sections
  await prisma.homepageSection.createMany({
    data: [
      {
        section: 'hero',
        content: {
          title: 'Elegance Meets Tradition',
          subtitle: 'Premium African Fashion & Custom Tailoring in the Heart of Lokoja',
          cta: 'Shop Now',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2',
        },
        isActive: true,
        displayOrder: 1,
      },
      {
        section: 'featured_categories',
        content: {
          title: 'Explore Our Collections',
          categories: [
            { name: 'Agbada', slug: 'agbada', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2' },
            { name: 'Native/Ankara', slug: 'native-ankara', image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328' },
            { name: 'Jalabiya', slug: 'jalabiya', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a' },
            { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee' },
          ],
        },
        isActive: true,
        displayOrder: 2,
      },
      {
        section: 'custom_sewing_cta',
        content: {
          title: 'Bring Your Design to Life',
          description: 'Upload your style, choose your fabric, and let our master tailors create your perfect outfit',
          cta: 'Start Custom Order',
          features: [
            'Multiple measurement profiles',
            'Choose your fabric or send yours',
            'Standard & Express timelines',
            'Real-time status tracking',
          ],
        },
        isActive: true,
        displayOrder: 3,
      },
      {
        section: 'fashion_school_cta',
        content: {
          title: 'Learn Fashion Design',
          description: 'Join our fashion school and master the art of African fashion design from beginner to advanced levels',
          cta: 'View Courses',
          courses: [
            { level: 'Beginner', duration: '3 months', price: 50000 },
            { level: 'Intermediate', duration: '4 months', price: 85000 },
            { level: 'Advanced', duration: '6 months', price: 150000 },
          ],
        },
        isActive: true,
        displayOrder: 4,
      },
    ],
  });

  console.log('✅ Homepage sections created');

  // Create Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'New Course Starting Soon!',
        content: 'Beginner Fashion Design course starting March 1st. Limited spots available. Early bird discount of 10% if you register before February 20th.',
        isActive: true,
        priority: 1,
        targetAudience: 'STUDENTS',
      },
      {
        title: 'Festive Season Sale',
        content: 'Get 20% off all ready-made items. Use code FESTIVE20 at checkout. Valid until December 31st.',
        isActive: true,
        priority: 2,
        targetAudience: 'CUSTOMERS',
      },
      {
        title: 'Free Shipping Weekend',
        content: 'Enjoy free shipping on all orders this weekend! No minimum purchase required.',
        isActive: true,
        priority: 3,
        targetAudience: 'ALL',
      },
    ],
  });

  console.log('✅ Announcements created');

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        productId: agbada1.id,
        userId: customer1.id,
        rating: 5,
        title: 'Absolutely Stunning!',
        comment: 'This agbada exceeded all my expectations. The embroidery is exquisite and the fit is perfect. Received so many compliments at the wedding!',
        isVerified: true,
        isApproved: true,
      },
      {
        productId: ankara1.id,
        userId: customer1.id,
        rating: 5,
        title: 'Beautiful Ankara Dress',
        comment: 'The quality of the ankara fabric is top-notch and the bell sleeves are so elegant. True to size and very comfortable.',
        isVerified: true,
        isApproved: true,
      },
    ],
  });

  console.log('✅ Reviews created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Default Credentials:');
  console.log('Admin: admin@andrewsapparel.com / Admin@123456');
  console.log('Customer: customer@test.com / Customer@123');
  console.log('Student: student@test.com / Student@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
