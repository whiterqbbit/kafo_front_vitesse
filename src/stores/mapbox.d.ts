export interface SuggestResponse {
  suggestions: Suggestion[]
  attribution: string
}

export interface Suggestion {
  name: string
  name_preferred: string
  mapbox_id: string
  feature_type: string
  address: string
  full_address: string
  place_formatted: string
  context: SuggestionContext
  language: string
  maki: string
  poi_category: string[]
  poi_category_ids: string[]
  brand: string
  brand_id: string
  external_ids: Record<string, string>
  metadata: Record<string, unknown>
  distance?: number
  eta?: number
  added_distance?: number
  added_time?: number
}

export interface SuggestionContext {
  country: ContextLayer
  region: ContextLayer
  postcode: ContextLayer
  district: ContextLayer
  place: ContextLayer
  locality: ContextLayer
  neighborhood: ContextLayer
  address: AddressContextLayer
  street: ContextLayer
}

export interface RetrieveResponse {
  type: string
  features: Feature[]
  attribution: string
}

export interface Feature {
  type: string
  geometry: Geometry
  properties: Suggestion
}

export interface Geometry {
  coordinates: [number, number]
  type: string
}

export interface ContextLayer {
  id: string
  name: string
  country_code?: string
  country_code_alpha_3?: string
  region_code?: string
  region_code_full?: string
}

export interface AddressContextLayer extends ContextLayer {
  address_number: string
  street_name: string
}

export interface Coordinates {
  longitude: number
  latitude: number
  accuracy?: string
  routable_points: RoutablePoint[]
}

export interface RoutablePoint {
  name: string
  latitude: number
  longitude: number
}
