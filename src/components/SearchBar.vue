<template>
  <div w-full flex>
    <img
      :src="geoloc_icon" alt="geolocalisation button" class="cursor-pointer border-4 border-cafe-500 rounded-full"
      @click="use_map_store().locate_user()"
    >
    <span class="p-input-icon-left w-full">
      <i class="pi pi-search" />
      <InputText v-model="query" placeholder="Rechercher un lieu ou une adresse" class="w-full" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import geoloc_icon from '@/assets/img/geoloc/target (copy).png'
import { use_map_store } from '@/stores/map'

const query = ref('')

const debouncedSearch = useDebounceFn((value: string) => {
  use_map_store().search(value)
}, 500)

watch(query, (newValue) => {
  debouncedSearch(newValue)
})
</script>
