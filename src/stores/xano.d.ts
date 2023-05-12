export type CafeTag =
	| 'Barista'
	| 'Calme'
	| 'Phone Booth'
	| 'Gourmand'
	| 'Végétarien'
	| 'Wifi'
	| 'Prises'
	| 'Dépaysant'
	| 'Comfy'
	| 'Etage isolé'
	| 'Gourmandises'
	| 'Salé'
	| 'Restaurant'
	| 'Bar'
	| 'Bistrot'
	| 'Café'
	| 'Brasserie'
	| 'Salon de thé'
	| 'Coworking'
	| 'Animé'
	| 'A Vérifier'
	| 'Gratuit'
	| 'Autre lieu'
	| 'Tiers lieu'
	| 'Hôtel'
	| 'Bon marché'
	| 'Abordable'
	| 'Haut de gamme'
	| 'Top rated'
	| 'Alcool'
	| 'Déjeuner'
	| 'Diner'
	| 'Ambiance à vérifier'
	| 'Partenaire'
	| 'CB dès 0€'
	| 'Studieux'

export type PlaceType =
	| 'Café'
	| 'Bar'
	| 'Bistrot'
	| 'Restaurant'
	| 'Brasserie'
	| 'Autre lieu'
	| 'Coworking'
	| 'A Vérifier'
	| 'Tiers lieu'
	| 'Hôtel'

export interface AwsPics {
	url: string
	dimensions?: {
		width: number
		height: number
	}
}

export interface Place {
	id: number
	nom: string
	tags: CafeTag[]
	type?: PlaceType
	events?: Event[]
	website?: string
	location: {
		data: {
			lat: number
			lng: number
		}
	}
	adresse: string
	ambiance: 'Vivant' | 'Calme' | 'Studieux' | 'A Vérifier'
	metro: string
	desc: string
	google_disp_formatted: any // Assuming it is a JSON object
	google_disp: any // Assuming it is a JSON object
	nb_prises: number
	wifi: 'Bon' | 'Très bon' | 'Excellent' | 'Pas de Wifi' | 'A Vérifier'
	prix_expresso?: string
	gamme: number
	minimum_cb?: number
	nom_contact?: string
	email?: string
	telephone?: string
	aws_miniatures: AwsPics[]
	aws_pics: AwsPics[]
	created_at?: Date
	etage_isole?: boolean
	legit: boolean
	acces_wifi?: string
	source: string
	miniatures: {
		url: string
	}[]
	pics: {
		url: string
	}[]
	nourriture?: {
		vegetarien: boolean
		dejeuner: boolean
		diner: boolean
		gourmandises?: boolean
	}
	alcool?: boolean
	google_place_id: string
	google_rating?: number
	commentaires_id?: number
	google_pics: {
		pic_id: string
	}[]
	disabled?: boolean
	pricing?: string
	public_phone?: string
	distance?: number
	is_open: boolean
	attendance?: number
	attendees?: User[]
	our_fav: boolean
}

export interface Club {
	id?: number
	nom: string
	user_id?: [number]
	private?: boolean
	uuid: string
	pic?: string
	display_pic_in_clubs?: boolean
	display_name_in_clubs?: boolean
	premium: boolean
	type: 'roles' | 'domain' | 'user' | 'tech'
}

export interface User {
	is_auth?: boolean
	bio?: string
	clubs?: Array<Club>
	domaine?: string
	email?: string
	family_name?: string
	first_name?: string
	highlighted_pins?: Array<number>
	highlighted_users?: Array<number>
	id?: number | null
	incognito?: boolean | null
	is_inboarded?: boolean | null
	job_title?: string
	open_to_afterwork?: boolean | null
	open_to_lunch?: boolean | null
	open_to_pause?: boolean | null
	pic_medium?: string
	pic_small?: string
	pic_xsmall?: string
	role?: string
	type?: string
	token?: string
}

interface Event {
	id: number
	event_id: number
	created_at: Date
	user_id: User[]
	coffee_id: number
	jour: Date
	creneau: 'Matin' | 'Après midi' | 'Fermé' | 'Soir'
	horaires_string: string
	start: Date
	end: Date
}

interface User {
	id: number
	user_id: number
	first_name: string
	job_title: string
	bio: string
	incognito: boolean
	pic_xsmall: string
	pic_small: string
	open_to_afterwork: boolean
	open_to_lunch: boolean
	open_to_pause: boolean
}

interface Attendance {
	attendance: number
	attendees: User[]
	place_id: number
	events: Event[]
}