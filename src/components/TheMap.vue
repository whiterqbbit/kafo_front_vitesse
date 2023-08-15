<script lang="ts" setup>
import { use_map_store } from '@/stores/map'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  map_provider: String,
  map_txt: String,
})

const map_store = use_map_store()

onMounted(() => {
  map_store.add_map('kmap', [48.863726, 2.34292], 12)
  map_store.add_tile_layer(props.map_provider!, 21, props.map_txt!)
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
