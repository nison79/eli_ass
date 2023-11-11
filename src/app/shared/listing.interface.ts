export interface Listing {
  id: number;
  name: string;
  desc: string;
  star_rating: number;
  no_of_reviews: number;
  image: string;
  filters: Filter[];
}
export interface Filter {
  type: string;
  name: string;
  id: string;
}

export interface ListingsResponse {
  data: Listing[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
