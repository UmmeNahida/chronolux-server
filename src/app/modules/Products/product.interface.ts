export interface productInterface {
  name: string
  date: string
  price: number
  description: string
  category: string
  image: string
  brand: string
  model: string
  rating: number
  review: string
}

export interface ProductQuery {
  category?: string;
  price?: string;
  rating?: string;
  startDate?: string;
  endDate?: string;
}


