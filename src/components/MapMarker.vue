<script lang="ts" setup>
import { kafomapStore } from '@/stores/map'

const props = defineProps({
  lngLat: { type: Object, required: true },
  popupDescription: String,
})

const kafoMap = kafomapStore()

onMounted(() => {
  kafoMap.addMarker([props.lngLat.lat, props.lngLat.lng], props.popupDescription || '')
})
</script>

<template>
  <div />
</template>
