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
        v-for="pic in place_pictures_full"
        :key="pic.url"
        class="relative flex flex-col cursor-pointer"
      >
        <img :src="close_url" class="absolute right-1 top-1 w-6" @click="erase(pic)">
        <img :src="pic.url" class="handle w-full">
      </div>
      <hr>
    </div>
    <div v-for="url, index in place_pictures_full" :key="index" class="flex flex-col">
      {{ get_file_name(url.url) }}
    </div>
    <div v-for="url, index in place_pictures_thumbnail" :key="index" class="flex flex-col">
      {{ get_file_name(url.url) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { Place, PlacePicture } from '@/stores/xano.d.ts'

const props = defineProps<{
  place: Place
}>()

const close_url = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/256/delete-1-icon.png'
const place_pictures_full = ref(props.place.pictures.map(p => p.full))
const place_pictures_medium = ref(props.place.pictures.map(p => p.medium))
const place_pictures_thumbnail = ref(props.place.pictures.map(p => p.thumbnail))

const sortable_container = ref<HTMLElement | null>(null)

function get_file_name(url: string) {
  return url.split('/').pop()
}

useSortable(
  sortable_container as MaybeRefOrGetter<HTMLElement | null | undefined>,
  place_pictures_full,
  {
    handle: '.handle',
    animation: 300,
    onUpdate: (e: any) => {
      moveArrayElement(e.oldIndex, e.newIndex)
    },
  },
)

function moveArrayElement(from: any, to: any) {
  place_pictures_full.value.splice(to, 0, place_pictures_full.value.splice(from, 1)[0])
  place_pictures_medium.value.splice(to, 0, place_pictures_medium.value.splice(from, 1)[0])
  place_pictures_thumbnail.value.splice(to, 0, place_pictures_thumbnail.value.splice(from, 1)[0])
}

function erase(pic: PlacePicture['full']) {
  const index_to_erase = place_pictures_full.value.findIndex(p => p.url === pic.url)
  place_pictures_full.value.splice(index_to_erase, 1)
  place_pictures_medium.value.splice(index_to_erase, 1)
  place_pictures_thumbnail.value.splice(index_to_erase, 1)
}

function save() {
  const raw_place = toRaw(props.place)
  const updated_place = raw_place ? JSON.parse(JSON.stringify(raw_place)) : raw_place
  updated_place.pictures = place_pictures_full.value.map((pic, index) => {
    const raw_pic = toRaw(pic)
    const raw_medium = toRaw(place_pictures_medium.value[index])
    const raw_thumbnail = toRaw(place_pictures_thumbnail.value[index])
    return {
      full: raw_pic ? JSON.parse(JSON.stringify(raw_pic)) : raw_pic,
      medium: raw_medium ? JSON.parse(JSON.stringify(raw_medium)) : raw_medium,
      thumbnail: raw_thumbnail ? JSON.parse(JSON.stringify(raw_thumbnail)) : raw_thumbnail,
    }
  })

  console.log('update_place_pics', updated_place.id, updated_place.pictures)
  use_place_store().update_place_pics(updated_place.id, updated_place.pictures)
}
</script>
