<template>
  <div class="w-full flex place-items-center gap-2">
    <div class="cursor-pointer rounded-2xl bg-cafe-100 p-1 text-cafe-500 shadow-md">
      <MaterialLocation
        class="h-10 w-10 place-self-center"
        @click="use_map_store().locate_user()"
      />
    </div>
    <span class="p-input-icon-left w-full place-self-center">
      <i class="pi pi-search" />
      <InputText v-model="query" placeholder="Rechercher un lieu ou une adresse" class="w-full" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { use_map_store } from '@/stores/map'

const query = ref('')

const debouncedSearch = useDebounceFn((value: string) => {
  use_map_store().search(value)
}, 500)

watch(query, (newValue) => {
  debouncedSearch(newValue)
})
</script>
