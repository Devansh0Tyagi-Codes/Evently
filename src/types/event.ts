export interface Event {
  id: string
  title: string
  category: EventCategory
  image: string | null
  date: string
  time: string
  location: string
  city: EventCity
  price: number
  rating: number
  reviewCount: number
  organizer: string
  organizerCategory?: string
  duration?: string
  verified: boolean
  description: string
  highlights: string[]
  tags?: string[]
  attendees?: number
}

export type EventCategory =
  | 'Technology'
  | 'Workshops'
  | 'Music'
  | 'Sports'
  | 'Business'
  | 'Art'
  | 'Community'

export type EventCity = 'Noida' | 'Delhi' | 'Ghaziabad' | 'Gurgaon'

export type PriceFilter = 'all' | 'under500' | '500to1000' | 'above1000'

export type SortOption = 'recommended' | 'price_asc' | 'price_desc' | 'rating'
