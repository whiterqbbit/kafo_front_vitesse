import { defineStore } from 'pinia'
import markerIcon from '@/assets/img/geoloc/marker_6.png'

interface Leaflet {
  map: typeof import('leaflet')['map']
  tileLayer: typeof import('leaflet')['tileLayer']
  Icon: typeof import('leaflet')['Icon']
  marker: typeof import('leaflet')['marker']
}
interface MarkerData {
  coordinates: [number, number]
  popupDescription: string
}

let leaflet: Promise<Leaflet> | undefined

if (typeof window !== 'undefined')
  leaflet = import('leaflet').then(module => module)

export const kafomapStore = defineStore('kafomapstore', () => {
  const map_leaf: any = ref({})
  const markers: Ref<MarkerData[]> = ref([])
  const bounds: any = ref({})
  const markersOnMap: Ref<MarkerData[]> = ref([])
  const mapIsLoaded = ref(false)
  const tileLayerIsLoaded = ref(false)
  const markerIsLoaded = ref(false)
  const markerIsClick = ref(false)

  const getPinsOnMap = computed(() => {
    if (bounds.value)
      return markers.value.filter(marker => bounds.value.contains(marker.coordinates))
  })

  async function addMap(id: string, viewLngLat: [number, number], zoom: number) {
    if (!leaflet)
      return
    const { map } = await leaflet
    map_leaf.value = map(id)
      .on('load', () => {
        mapIsLoaded.value = true
      })
      .on('move', () => {
        if (markerIsLoaded.value === true) {
          bounds.value = map_leaf.value.getBounds()
          if (markers.value.length)
            markersOnMap.value = markers.value.filter(marker => map_leaf.value.getBounds().contains(marker.coordinates))
        }
      })
      .setView(viewLngLat, zoom)
  }

  async function addTileLayer(mapUrl: string, maxZoom: number, attribution: string) {
    if (!leaflet)
      return
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

  async function addMarker(lngLat: [number, number], popupDescription: string) {
    if (!leaflet)
      return
    const { Icon, marker } = await leaflet
    const customIcon = new Icon({
      iconUrl: markerIcon,
      iconSize: [20, 32],
      iconAnchor: [20, 32],
      popupAnchor: [0, -32],
    })

    marker(lngLat, { icon: customIcon })
      .addTo(map_leaf.value)
      .bindPopup(popupDescription)
      .on('click', () => {
        markerIsClick.value = true
      })
    markerIsLoaded.value = true
    bounds.value = map_leaf.value.getBounds()

    // add marker on store
    markers.value.push({
      coordinates: lngLat,
      popupDescription,
    } as unknown as MarkerData)
  }

  return { map_leaf, markers, bounds, markersOnMap, mapIsLoaded, tileLayerIsLoaded, markerIsLoaded, markerIsClick, getPinsOnMap, addMap, addTileLayer, addMarker }
})
