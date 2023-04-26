<script lang="ts" setup>
import { use_map_store } from '@/stores/map'

const props = defineProps({
  lngLat: { type: Object, required: true },
  popupDescription: String,
})

const kafoMap = use_map_store()

onMounted(() => {
  kafoMap.add_marker([props.lngLat.lat, props.lngLat.lng], props.popupDescription || '')
})
</script>

<template>
  <div />
</template>
