import { defineStore } from 'pinia'
import { useGeolocation } from '@vueuse/core'
import marker_icon from '@/assets/img/geoloc/marker_6.png'
import user_icon_url from '@/assets/img/geoloc/user.png'
import type { Cafe } from '@/stores/xano.d'

type simple_coords = [number, number]

interface Leaflet {
  map: typeof import('leaflet')['map']
  tileLayer: typeof import('leaflet')['tileLayer']
  Icon: typeof import('leaflet')['Icon']
  marker: typeof import('leaflet')['marker']
}

interface MarkerData {
  coordinates: simple_coords
  popupDescription: string
  instance: any
}

let leaflet: Promise<Leaflet> | undefined

if (typeof window !== 'undefined') leaflet = import('leaflet').then(module => module)

export const use_map_store = defineStore('use_map_store', () => {
  const map_leaf: any = ref({})
  const markers: Ref<MarkerData[]> = ref([])
  const bounds: any = ref({})
  const markersOnMap: Ref<MarkerData[]> = ref([])
  const mapIsLoaded = ref(false)
  const tileLayerIsLoaded = ref(false)
  const markerIsLoaded = ref(false)
  const markerIsClick = ref(false)
  const user_coords: any = ref()

  const getPinsOnMap = computed(() => {
    if (bounds.value) return markers.value.filter(marker => bounds.value.contains(marker.coordinates))
  })

  async function addMap(id: string, viewLngLat: simple_coords, zoom: number) {
    if (!leaflet) return
    const { map } = await leaflet
    map_leaf.value = map(id)
      .on('load', () => {
        mapIsLoaded.value = true
      })
      .on('move', () => {
        if (markerIsLoaded.value === true) {
          bounds.value = map_leaf.value.getBounds()
          if (markers.value.length) markersOnMap.value = markers.value.filter(marker => map_leaf.value.getBounds().contains(marker.coordinates))
        }
      })
      .setView(viewLngLat, zoom)
  }

  async function addTileLayer(mapUrl: string, maxZoom: number, attribution: string) {
    if (!leaflet) return
    const { tileLayer } = await leaflet
    tileLayer(mapUrl, {
      maxZoom,
      attribution,
    })
      .addTo(map_leaf.value)
      .on('load', () => {
        tileLayerIsLoaded.value = true
      })
  }

  async function addMarker(lngLat: simple_coords, popupDescription: string) {
    if (!leaflet) return
    const { Icon, marker } = await leaflet
    const customIcon = new Icon({
      iconUrl: marker_icon,
      iconSize: [20, 32],
      iconAnchor: [20, 32],
      popupAnchor: [0, -32],
    })

    const markerInstance = marker(lngLat, { icon: customIcon })
      .addTo(map_leaf.value)
      .bindPopup(popupDescription)
      .on('click', () => {
        markerIsClick.value = true
      })

    markerIsLoaded.value = true
    bounds.value = map_leaf.value.getBounds()

    markers.value.push({
      coordinates: lngLat,
      popupDescription,
      instance: markerInstance,
    } as unknown as MarkerData)
  }

  function removeAllMarkers() {
    markers.value.forEach(marker => marker.instance.remove())
    markers.value = []
  }

  function updateMarkers(coffee_db: Ref<Cafe[]>) {
    // Remove all existing markers from the map
    removeAllMarkers()

    // Add new markers for each filtered coffee shop
    coffee_db.value.forEach((coffee) => {
      addMarker([coffee.location.data.lat, coffee.location.data.lng], coffee.desc || '')
    })
  }

  // ne fait que centrer la carte sur l'utilisateur en l'état
  async function locate_user() {
    const { coords, resume } = useGeolocation()
    resume()
    if (!coords.value || !coords.value.latitude || !coords.value.longitude) return

    if (!leaflet) return
    const { Icon, marker } = await leaflet

    const customIcon = new Icon({
      iconUrl: user_icon_url,
      iconSize: [20, 32],
      iconAnchor: [20, 32],
      popupAnchor: [0, -32],
    })

    map_leaf.value.locate({ setView: true, maxZoom: 16 })

    map_leaf.value.on('locationfound', (event: any) => {
      const { latitude, longitude } = event.latlng
      const lngLat: simple_coords = [latitude, longitude]
      marker(lngLat, { icon: customIcon })
        .addTo(map_leaf.value)
        .bindPopup('C\'est vous !')
        .on('click', () => {
          markerIsClick.value = true
        })
      markerIsLoaded.value = true
    })

    map_leaf.value.on('locationerror', (error: any) => {
      console.error('Error getting user location:', error)
    })
  }

  // ne fonctionne pas en l'état, 403
  async function search(query: string) {
    // use Place Autocomplete
    // Define the URL and API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=geocode&language=fr&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    // Function to fetch data from Google Places API
    async function fetchGooglePlacesAutocomplete() {
      try {
        const response = await fetch(url)

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
      }
    }

    // Call the function
    fetchGooglePlacesAutocomplete()
  }

  return { map_leaf, markers, bounds, markersOnMap, mapIsLoaded, tileLayerIsLoaded, markerIsLoaded, markerIsClick, removeAllMarkers, getPinsOnMap, addMap, addTileLayer, addMarker, updateMarkers, locate_user, search, user_coords }
})
