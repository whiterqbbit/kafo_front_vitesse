<template>
  <div class="mb-6 max-w-200vw w-200vw flex flex-col gap-2">
    <div class="flex gap-4">
      <h2>{{ props.place.nom }}</h2>
      <button class="btn-grass" @click="save">
        Sauvegarder
      </button>
    </div>
    <div ref="sortable_container" class="flex">
      <div
        v-for="pic in place_pics"
        :key="pic.url"
        class="relative flex flex-col cursor-pointer"
      >
        <img :src="close_url" class="absolute right-1 top-1 w-6" @click="erase(pic)">
        <img :src="pic.url" class="handle w-full">
      </div>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { Place } from '@/stores/xano.d.ts'

const props = defineProps<{
  place: Place
}>()

const close_url = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/256/delete-1-icon.png'
const place_pics = ref(props.place.aws_pics)
const sortable_container = ref<HTMLElement | null>(null)

useSortable(
  sortable_container as MaybeRefOrGetter<HTMLElement | null | undefined>,
  place_pics,
  {
    handle: '.handle',
    animation: 300,
  },
)

function erase(pic: { url: string }) {
  place_pics.value = place_pics.value.filter(p => p.url !== pic.url)
}

function save() {
  const updated_place = toRaw(props.place)
  updated_place.aws_pics = JSON.parse(JSON.stringify(place_pics.value))

  console.log('updated_place', updated_place)
  use_place_store().update_place(updated_place)
}
</script>
