import { defineStore } from 'pinia'
import { useGeolocation } from '@vueuse/core'
import type { Router } from 'vue-router'
import type { Place } from '@/stores/xano.d'
import marker_icon from '@/assets/img/geoloc/marker_6.png'

type simple_coords = [number, number]

interface Leaflet {
  map: typeof import('leaflet')['map']
  tileLayer: typeof import('leaflet')['tileLayer']
  Icon: typeof import('leaflet')['Icon']
  marker: typeof import('leaflet')['marker']
  control: typeof import('leaflet')['control']
}

interface MarkerData {
  coordinates: simple_coords
  popup_description: string
  id: number
  instance: any
}

let leaflet: Promise<Leaflet> | undefined

// for SSG
if (typeof window !== 'undefined') {
  leaflet = import('leaflet').then(module => module)
  import('leaflet.locatecontrol')
}
export const use_map_store = defineStore('use_map_store', () => {
  const map_leaf: any = ref({})
  const markers: Ref<MarkerData[]> = ref([])
  const bounds: any = ref({})
  const markers_on_map: Ref<MarkerData[]> = ref([])
  const map_is_loaded = ref(false)
  const tile_layer_is_loaded = ref(false)
  const marker_is_loaded = ref(false)
  const marker_is_click = ref(false)
  const user_coords: any = ref()

  const get_pins_on_map = computed(() => {
    if (bounds.value) return markers.value.filter(marker => bounds.value.contains(marker.coordinates))
  })

  async function add_map(id: string, viewLngLat: simple_coords, zoom: number) {
    // for SSG
    if (typeof window !== 'undefined') {
      import('leaflet.locatecontrol')
    }
    if (!leaflet) return
    const L = await leaflet

    map_leaf.value = L.map(id)
      .on('load', () => {
        map_is_loaded.value = true
      })
      .on('move', () => {
        if (marker_is_loaded.value === true) {
          bounds.value = map_leaf.value.getBounds()
          if (markers.value.length) markers_on_map.value = markers.value.filter(marker => map_leaf.value.getBounds().contains(marker.coordinates))
        }
      })
      .setView(viewLngLat, zoom)

    L.control.zoom({ position: 'bottomright' }).addTo(map_leaf.value)
  }

  async function add_tile_layer(mapUrl: string, maxZoom: number, attribution: string) {
    if (!leaflet) return
    const { tileLayer } = await leaflet
    tileLayer(mapUrl, {
      maxZoom,
      attribution,
    })
      .addTo(map_leaf.value)
      .on('load', () => {
        tile_layer_is_loaded.value = true
      })
  }

  function move_map_to(lngLat: simple_coords, zoom = 15) {
    map_leaf.value.flyTo(lngLat, zoom)
  }

  async function add_marker(lngLat: simple_coords, popup_description: string, place_id: number, router: Router) {
    if (!leaflet) return
    const { Icon, marker } = await leaflet
    const customIcon = new Icon({
      iconUrl: marker_icon,
      iconSize: [20, 32],
      iconAnchor: [20, 32],
      popupAnchor: [-10, -32],
    })

    const marker_instance = marker(lngLat, { icon: customIcon })
      .addTo(map_leaf.value)
      .bindPopup(popup_description)
      .on('click', () => {
        marker_is_click.value = true
        router.push(`/place/${place_id}`)
      })

    marker_is_loaded.value = true
    bounds.value = map_leaf.value.getBounds()

    markers.value.push({
      coordinates: lngLat,
      popup_description,
      id: place_id,
      instance: marker_instance,
    } as unknown as MarkerData)
  }

  function remove_all_markers() {
    markers.value.forEach(marker => marker.instance.remove())
    markers.value = []
  }

  function update_markers(place_db: Ref<Place[]>, router: Router) {
    // Remove all existing markers from the map
    remove_all_markers()

    // Add new markers for each filtered place
    place_db.value.forEach((place) => {
      add_marker([place.location.data.lat, place.location.data.lng], place.desc || '', place.id, router)
    })
  }

  async function locate_user() {
    // for SSG
    if (typeof window === 'undefined') return

    const { coords, resume } = useGeolocation()
    resume()
    if (!coords.value || !coords.value.latitude || !coords.value.longitude) return

    if (!leaflet) return
    const L = await leaflet

    L.control.locate({
      position: 'topright',
      strings: {
        title: 'Me localiser!',
      },
      locateOptions: {
        maxZoom: 15,
      },
    }).addTo(map_leaf.value).start()
  }

  // ne fonctionne pas en l'état, 403
  async function search(query: string) {
    // use Place Autocomplete
    // Define the URL and API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=geocode&language=fr&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    // Function to fetch data from Google Places API
    async function fetch_google_places_autocomplete() {
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
    fetch_google_places_autocomplete()
  }

  return { map_leaf, markers, bounds, markers_on_map, map_is_loaded, tile_layer_is_loaded, marker_is_loaded, marker_is_click, remove_all_markers, get_pins_on_map, add_map, add_tile_layer, add_marker, update_markers, locate_user, search, user_coords, move_map_to }
})
