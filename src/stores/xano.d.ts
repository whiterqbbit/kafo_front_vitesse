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

export interface Cafe {
	id?: number
	nom: string
	tags: CafeTag[]
	type?: PlaceType
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
	aws_miniatures: {
		url: string
	}[]
	aws_pics: {
		url: string
	}[]
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
	distance?: string
	color?: string
}

export interface Club {
	nom: string
	user_id?: [number]
	private?: boolean
	uuid: string
	pic?: string
	display_pic_in_clubs?: boolean
	display_name_in_clubs?: boolean
}
