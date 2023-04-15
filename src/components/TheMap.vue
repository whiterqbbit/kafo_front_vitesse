<script lang="ts" setup>
import { use_map_store } from '@/stores/map'

import 'leaflet/dist/leaflet.css'

const token = import.meta.env.VITE_MAPBOX_TOKEN
const map_provider = import.meta.env.VITE_MAPBOX_PROVIDER
const map_url = `${map_provider}?access_token=${token}`

const map_store = use_map_store()

onMounted(() => {
  map_store.addMap('kmap', [48.863726, 2.34292], 12)
  map_store.addTileLayer(map_url, 21, 'Kafo')
  map_store.locate_user()
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
