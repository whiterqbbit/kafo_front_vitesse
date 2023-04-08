<script lang="ts" setup>
import { kafomapStore } from '@/stores/map'
import 'leaflet/dist/leaflet.css'

const token = import.meta.env.VITE_MAPBOX_TOKEN
const map_provider = import.meta.env.VITE_MAPBOX_PROVIDER
const map_url = `${map_provider}?access_token=${token}`

const kafoMap = kafomapStore()

onMounted(() => {
  kafoMap.addMap('kmap', [48.863726, 2.34292], 12)
  kafoMap.addTileLayer(map_url, 21, 'metro-KAFO-dodo')
})
</script>

<template>
  <div id="kmap" />
</template>

<style scoped>
  #kmap {
    height: 100%;
  }
</style>
