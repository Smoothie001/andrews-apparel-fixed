import { Prisma } from "@prisma/client"

// Product with relations
export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true
    variants: true
    reviews: {
      include: {
        user: true
      }
    }
  }
}>

// Order with relations
export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
    user: true
    payment: true
  }
}>

// Custom sewing request with user
export type CustomSewRequestWithUser = Prisma.CustomSewRequestGetPayload<{
  include: {
    user: true
  }
}>

// Student enrollment with relations
export type EnrollmentWithDetails = Prisma.StudentEnrollmentGetPayload<{
  include: {
    user: true
    course: true
  }
}>

// Measurement data structure
export interface MeasurementData {
  // General
  height?: string
  weight?: string

  // Upper body
  neck?: string
  chest?: string
  waist?: string
  shoulder?: string
  sleeveLength?: string
  armhole?: string

  // Lower body
  hip?: string
  inseam?: string
  outseam?: string
  thigh?: string
  knee?: string
  ankle?: string

  // For traditional wear
  agbadaLength?: string
  jalabiyaLength?: string
  slitLength?: string

  // Additional notes
  notes?: string
}

// Shipping address structure
export interface ShippingAddress {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  country: string
  zipCode?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Filter options
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  color?: string
  fabricType?: string
  search?: string
  sortBy?: "price-asc" | "price-desc" | "newest" | "popular"
}

// Cart item (for frontend state)
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image: string
  sku: string
}

// Dashboard stats
export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  pendingOrders: number
  customRequests: number
  studentEnrollments: number
  lowInventoryProducts: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: "order" | "custom_request" | "enrollment"
  description: string
  timestamp: Date
  status?: string
}

// Custom sewing form data
export interface CustomSewingFormData {
  // Style selection
  styleOption: "upload" | "catalog"
  styleCatalogId?: string
  styleImages?: File[]

  // Basic info
  gender: "MALE" | "FEMALE"
  outfitType: string

  // Fabric
  fabricSource: "CUSTOMER_PROVIDED" | "OUR_CATALOG"
  fabricId?: string
  fabricDetails?: string

  // Measurements
  measurementOption: "saved" | "new"
  measurementProfileId?: string
  measurements?: MeasurementData
  saveMeasurements?: boolean
  profileName?: string

  // Preferences
  timelinePreference: "STANDARD" | "EXPRESS"
  notes?: string

  // Delivery
  shippingAddress: ShippingAddress
}

// Review data
export interface ReviewData {
  rating: number
  comment?: string
}

// Payment intent data
export interface PaymentIntentData {
  amount: number
  currency: string
  metadata?: Record<string, string>
}
