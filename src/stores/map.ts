import { Icon, map, marker, tileLayer } from 'leaflet'
import { defineStore } from 'pinia'
import markerIcon from '@/assets/img/geoloc/marker_6.png'

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
    addMap(id: string, viewLngLat: [number, number], zoom: number) {
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
    addTileLayer(mapUrl: string, maxZoom: number, attribution: string) {
      tileLayer(mapUrl, {
        maxZoom,
        attribution,
      })
        .addTo(this.map)
        .on('load', () => {
          this.tileLayerIsLoaded = true
        })
    },
    addMarker(lngLat: [number, number], popupDescription: string) {
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
    removeMap() {
      this.map.remove()
    },
  },
})
