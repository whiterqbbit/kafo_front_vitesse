import { defineStore } from 'pinia'
import markerIcon from '@/assets/img/geoloc/marker_6.png'

let leaflet: Promise<Leaflet> | undefined

if (typeof window !== 'undefined')
  leaflet = import('leaflet').then(module => module)

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

export const kafomapStore = defineStore('kafomapstore', {
  state: () => ({
    map: {} as any,
    markers: [] as MarkerData[],
    bounds: {} as any,
    markersOnMap: [] as MarkerData[],
    mapIsLoaded: false,
    tileLayerIsLoaded: false,
    markerIsLoaded: false,
    markerIsClick: false,
  }),
  getters: {
    getBounds: state => () => state.bounds,
    getPinsOnMap: state => () => {
      if (state.bounds)
        return state.markers.filter(marker => state.bounds.contains(marker.coordinates))
    },
  },
  // déplacer les .on() dans les composants car les actions ne sont pas là pour ça (à voir si ça marche)
  actions: {
    async addMap(id: string, viewLngLat: [number, number], zoom: number) {
      if (!leaflet)
        return
      const { map } = await leaflet
      this.map = map(id)
        .on('load', () => {
          this.mapIsLoaded = true
        })
        .on('move', () => {
          if (this.markerIsLoaded === true) {
            this.bounds = this.map.getBounds()
            if (this.markers.length)
              this.markersOnMap = this.markers.filter(marker => this.map.getBounds().contains(marker.coordinates))
          }
        })
        .setView(viewLngLat, zoom)
    },
    async addTileLayer(mapUrl: string, maxZoom: number, attribution: string) {
      if (!leaflet)
        return
      const { tileLayer } = await leaflet
      tileLayer(mapUrl, {
        maxZoom,
        attribution,
      })
        .addTo(this.map)
        .on('load', () => {
          this.tileLayerIsLoaded = true
        })
    },
    async addMarker(lngLat: [number, number], popupDescription: string) {
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
        .addTo(this.map)
        .bindPopup(popupDescription)
        .on('click', () => {
          this.markerIsClick = true
        })

      this.markerIsLoaded = true
      this.bounds = this.map.getBounds()

      // add marker on store
      this.markers.push({
        coordinates: lngLat,
        popupDescription,
      } as unknown as MarkerData)
    },
  },
})
