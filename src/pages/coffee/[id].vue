<template>
  <div>
    <Flicking
      v-if="preferences.is_mobile && selected_coffee?.aws_pics" class="flicking-container h-max-1/2 h-100"
      :options="{ renderOnlyVisible: false, horizontal: true, circular: true, autoResize: true }"
    >
      <div
        v-for="pic in (selected_coffee?.aws_pics)"
        :key="pic.url"
        class="flicking-panel"
      >
        <img :src="pic.url" class="h-full w-full object-cover">
      </div>
    </Flicking>
    <div class="flex flex-col gap-6 container">
      <RouterLink
        to="/"
        class="fixed top-7% z-10 ml-1% w-fit rounded-xl bg-cafe-100 px-2 py-1 shadow-md transition-all md:top-25 hover:scale-105"
      >
        Retour à la carte
      </RouterLink>
      <div id="floating_CTA" class="fixed bottom-3 hidden w-[95%] flex-row place-self-center justify-between rounded-xl bg-cafe-200 p-2 text-center shadow-lg">
        <div class="flex flex-col">
          <div>En ce moment</div>
          <div v-if="selected_coffee?.attendance">
            {{ selected_coffee?.attendance }}
          </div>
        </div>
        <!-- <div v-for="person in next_event.user_id" key="person.id">
          les gens dans le prochain event
        </div> -->
        <div class="font-extra-bold rounded-xl bg-grass-500 p-4 text-cafe-100">
          Rejoindre
        </div>
      </div>

      <div id="galleries" class="max-h-1/2 overflow-hidden text-left text-3xl">
        <div v-if="!preferences.is_mobile" id="desktop_gallery" class="pswp-gallery relative h-150 flex gap-2 overflow-hidden rounded-2xl">
          <!-- button more images -->
          <div v-if="selected_coffee && selected_coffee?.aws_pics?.length > 5" class="absolute bottom-10 right-10 rounded-xl bg-cafe-100 px-3 py-1 text-cafe-600 shadow-xl text-base">
            <a
              :href="selected_coffee?.aws_pics[0].url"
              :data-pswp-width="1000"
              :data-pswp-height="1000"
            >Afficher toutes les photos
            </a>
          </div>
          <!-- left image -->
          <div v-if="selected_coffee?.aws_pics[0]" class="w-full">
            <a
              :href="selected_coffee?.aws_pics[0].url"
              :data-pswp-width="1000"
              :data-pswp-height="1000"
            >
              <img id="miniature" :src="selected_coffee?.aws_pics[0].url" class="h-full w-full object-cover">
            </a>
          </div>
          <!-- right block -->
          <div v-if="selected_coffee?.aws_pics[1]" class="h-full w-full flex flex-col gap-2">
            <!-- top row -->
            <div class="w-full flex flex-row gap-2 object-cover" :class="selected_coffee?.aws_pics[2] ? 'h-1/2' : 'h-full'">
              <div class="w-full">
                <a
                  :href="selected_coffee?.aws_pics[1].url"
                  :data-pswp-width="1000"
                  :data-pswp-height="1000"
                >
                  <img id="miniature" :src="selected_coffee?.aws_pics[1].url" class="h-full w-full object-cover">
                </a>
              </div>
              <div v-if="selected_coffee?.aws_pics[3]" class="w-full">
                <a
                  :href="selected_coffee?.aws_pics[3].url"
                  :data-pswp-width="1000"
                  :data-pswp-height="1000"
                >
                  <img id="miniature" :src="selected_coffee?.aws_pics[3].url" class="h-full w-full object-cover">
                </a>
              </div>
            </div>
            <!-- bottom row -->
            <div v-if="selected_coffee?.aws_pics[2]" class="h-1/2 w-full flex flex-row gap-2 object-cover">
              <div class="w-full">
                <a
                  :href="selected_coffee?.aws_pics[2].url"
                  :data-pswp-width="1000"
                  :data-pswp-height="1000"
                >
                  <img id="miniature" :src="selected_coffee?.aws_pics[2].url" class="h-full w-full object-cover">
                </a>
              </div>
              <div v-if="selected_coffee?.aws_pics[4]" class="w-full">
                <a
                  :href="selected_coffee?.aws_pics[4].url"
                  :data-pswp-width="1000"
                  :data-pswp-height="1000"
                >
                  <img id="miniature" :src="selected_coffee?.aws_pics[4].url" class="h-full w-full object-cover">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="title_group" class="flex flex-col gap-3">
        <div id="title" class="font-black text-4xl">
          {{ selected_coffee?.nom }}
        </div>
        <div id="subtitle" class="flex flex-col font-bold md:flex-row md:justify-between">
          <div v-if="selected_coffee?.attendance !== 0" id="attendance">
            <div class="flex flex-row items-center gap-2">
              <div class="ml-2 flex">
                <img v-for="pic in selected_coffee?.attendees" :key="pic.url" :src="pic.url" class="aspect-square h-8 rounded-3xl object-cover -ml-2">
              </div>
              {{ selected_coffee?.attendance }} personnes y sont en ce moment
            </div>
            <div id="eta">
              Les minutes
            </div>
          </div>
        </div>
      </div>
      <TagsIcon v-if="selected_coffee && !preferences.is_mobile" :tags="selected_coffee?.tags" />
      <div id="main" class="flex flex-col gap-6 md:flex-row md:justify-between">
        <div id="lefty" class="max-w-2xl flex flex-col gap-6 md:w-1/2">
          <div id="description" class="flex flex-col gap-6 text-lg">
            <div class="flex flex-col gap-2">
              <div v-if="selected_coffee?.desc">
                {{ selected_coffee?.desc }}
              </div>
              <div v-if="selected_coffee?.acces_wifi">
                <span class="font-semibold">Acces wifi :</span> {{ selected_coffee?.acces_wifi }}
              </div>
            </div>
            <TagsIcon v-if="preferences.is_mobile && selected_coffee" :tags="selected_coffee?.tags" />
            <div v-if="selected_coffee?.adresse" id="location_container" class="flex flex-row items-center justify-between">
              <!-- adresse et metro -->
              <div class="max-w-65% flex flex-col">
                <div id="address">
                  {{ selected_coffee?.adresse }}
                </div>
                <div v-if="selected_coffee?.metro" class="flex items-center gap-2">
                  <img :src="subway_icon" class="h-6 w-6">
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ selected_coffee?.metro }}
                  </span>
                </div>
              </div>

              <!-- bouton lien direction -->
              <a
                class="flex flex-shrink-0 flex-row place-items-center gap-2 rounded-3xl bg-grass-500 px-4 py-2 font-bold text-cafe-100"
                :href="`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${selected_coffee?.nom}&destination_place_id=${selected_coffee?.place_id}&travelmode=walking`"
              >
                <div class="whitespace-nowrap text-xl">
                  Y aller !
                </div>
                <img class="h-6 w-6" :src="direction">
              </a>
            </div>
          </div>
        </div>
        <div id="righty" class="w-full flex flex-col place-content-center place-items-center rounded-3xl bg-cafe-200 p-6 text-cafe-600 text-2xl md:w-1/2">
          Ici, c'est en travaux !
          <img src="http://www.animated-gifs.fr/category_website/under-construction-fr/16072049.gif" class="h-40">
          <div id="events" class="hidden">
            events
          </div>
          <div id="chat" class="hidden">
            chat
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

import subway_icon from '@/assets/img/icons/metro_tantative.png'
import direction from '@/assets/img/direction.png'

const props = defineProps({
  id: String,
})
// get the selected coffee from the store
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id
const selected_coffee = computed(() => coffee_store.selected)

async function initialize_gallery() {
  if (selected_coffee.value?.aws_pics) {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#desktop_gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()
  }
}
onMounted(() => {
  initialize_gallery()
})

// watch(() => selected_coffee.value?.aws_pics, () => {
//   initialize_gallery()
// }, { immediate: true })
</script>

<style scoped>
@import 'photoswipe/dist/photoswipe.css';

.services {
  @apply flex place-content-center bg-cafe-300 rounded-xl p-x-3
}

.flicking-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  @apply m-0
}

.flicking-panel {
  flex: none;
  width: 100%;
  height: 100%;
  @apply p-0
}
</style>
