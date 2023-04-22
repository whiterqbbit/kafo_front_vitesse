<template>
  <div class="flex flex-col gap-6 container">
    <div id="floating_CTA" class="fixed bottom-3 hidden w-[95%] flex-row place-self-center justify-between rounded-xl bg-cafe-200 p-2 text-center shadow-lg">
      <div class="flex flex-col">
        <div>En ce moment</div>
        <div v-if="selected_coffee?.attendance !== 0">
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
    <div class="overflow-hidden text-left text-3xl">
      <Flicking v-if="preferences.is_mobile && selected_coffee?.aws_pics" class="flicking-container" :options="flickingOptions">
        <div
          v-for="pic in (selected_coffee?.aws_pics)"
          :key="pic.url"
          class="flicking-panel"
        >
          <img :src="pic.url" class="h-full w-full object-cover">
        </div>
      </Flicking>

      <div v-else id="desktop_gallery" class="pswp-gallery relative h-150 flex gap-2 overflow-hidden rounded-2xl">
        <!-- button more images -->
        <div v-if="selected_coffee && selected_coffee?.aws_pics?.length > 5" class="absolute bottom-10 right-10 rounded-xl bg-cafe-100 px-3 py-1 text-cafe-600 shadow-xl text-base">
          <a
            :href="selected_coffee?.aws_pics[0].url"
            :data-pswp-width="1000"
            :data-pswp-height="1000"
            target=""
          >Afficher toutes les photos
          </a>
        </div>

        <!-- left image -->
        <div v-if="selected_coffee?.aws_pics[0]" id="img1" class="w-100%">
          <a
            :href="selected_coffee?.aws_pics[0].url"
            :data-pswp-width="1000"
            :data-pswp-height="1000"
            target=""
          >
            <img id="miniature" :src="selected_coffee?.aws_pics[0].url" class="h-full w-100% object-cover" alt="">
          </a>
        </div>

        <!-- right block -->
        <div v-if="selected_coffee?.aws_pics[1]" class="h-full w-100% flex flex-col gap-2">
          <!-- top row -->
          <div class="h-1/2 w-100% flex flex flex-row gap-2 object-cover" :class="selected_coffee?.aws_pics[2] ? 'h-1/2' : 'h-full'">
            <div class="w-100%">
              <a
                :href="selected_coffee?.aws_pics[1].url"
                :data-pswp-width="1000"
                :data-pswp-height="1000"
                target=""
              >
                <img id="miniature" :src="selected_coffee?.aws_pics[1].url" class="h-full w-100% object-cover" alt="">
              </a>
            </div>
            <div v-if="selected_coffee?.aws_pics[3]" class="w-100%">
              <a
                :href="selected_coffee?.aws_pics[3].url"
                :data-pswp-width="1000"
                :data-pswp-height="1000"
                target=""
              >
                <img id="miniature" :src="selected_coffee?.aws_pics[3].url" class="h-full w-100% object-cover" alt="">
              </a>
            </div>
          </div>

          <!-- bottom row -->
          <div v-if="selected_coffee?.aws_pics[2]" class="h-1/2 w-100% flex flex-row gap-2 object-cover">
            <div class="w-100%">
              <a
                :href="selected_coffee?.aws_pics[2].url"
                :data-pswp-width="1000"
                :data-pswp-height="1000"
                target=""
              >
                <img id="miniature" :src="selected_coffee?.aws_pics[2].url" class="h-full w-100% object-cover" alt="">
              </a>
            </div>
            <div v-if="selected_coffee?.aws_pics[4]" class="w-100%">
              <a
                :href="selected_coffee?.aws_pics[4].url"
                :data-pswp-width="1000"
                :data-pswp-height="1000"
                target=""
              >
                <img id="miniature" :src="selected_coffee?.aws_pics[4].url" class="h-full w-100% object-cover" alt="">
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
        <!-- <div v-if="!preferences.is_mobile" class="flex flex-col font-normal">
          <div id="address">
            {{ selected_coffee?.adresse }}
          </div>
          <div v-if="selected_coffee?.metro" class="flex items-center gap-2">
            <img :src="subway_icon" class="h-6 w-6">
            {{ selected_coffee?.metro }}
          </div>
        </div> -->
        <div id="description" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div v-if="selected_coffee?.desc" class="flex flex-col gap-2 text-lg">
              <!-- <span class="font-bold">A propos :</span> -->
              <div>{{ selected_coffee?.desc }}</div>
            </div>

            <div v-if="selected_coffee?.acces_wifi" class="flex flex-col gap-2 text-lg">
              <div class="font-bold">
                Acces wifi :
              </div>
              <div>{{ selected_coffee?.acces_wifi }}</div>
            </div>
          </div>
          <TagsIcon v-if="selected_coffee && preferences.is_mobile" :tags="selected_coffee?.tags" />

          <div v-if="selected_coffee?.adresse" id="location_container" class="flex flex-row items-center justify-between text-lg">
            <div class="flex flex-col">
              <div id="address">
                {{ selected_coffee?.adresse }}
              </div>
              <div v-if="selected_coffee?.metro" class="flex items-center gap-2">
                <img :src="subway_icon" class="h-6 w-6">
                {{ selected_coffee?.metro }}
              </div>
            </div>
            <div
              id="google_map_link"
              class="flex flex-row place-items-center gap-2 rounded-3xl bg-grass-500 px-4 py-2 font-bold text-cafe-100"
            >
              <div class="text-xl">
                Y aller !
              </div>
              <img class="h-10" :src="direction">
            </div>
          </div>
        </div>
      </div>

      <div id="righty" class="w-1/2 flex flex-col place-content-center place-items-center rounded-3xl bg-cafe-200 p-6 text-cafe-600 text-2xl">
        Ici, c'est en travaux !
        <img src="http://www.animated-gifs.fr/category_website/under-construction-fr/16072049.gif" class="h-50">
        <div id="events" class="hidden">
          events
        </div>
        <div id="chat" class="hidden">
          chat
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import subway_icon from '@/assets/img/icons/metro_tantative.png'
import direction from '@/assets/img/direction.png'
import 'photoswipe/style.css'

const props = defineProps({
  id: String,
})
// get the selected coffee from the store
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id
const selected_coffee = computed(() => coffee_store.selected)
const flickingOptions = {
  renderOnlyVisible: false,
  horizontal: true,
  circular: true,
  autoResize: true,
  gap: 0,
}

// initialisation de la galery swipephoto
const lightbox = new PhotoSwipeLightbox({
  gallery: '#desktop_gallery',
  children: 'a',
  pswpModule: () => import('photoswipe'),
})

async function initializeGallery() {
  if (selected_coffee.value?.aws_pics) {
    lightbox.init()
  }
}

watch(() => selected_coffee.value?.aws_pics, () => {
  initializeGallery()
}, { immediate: true })
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
  height: 100%;
  @apply m-0
}

.flicking-panel {
  flex: none;
  width: 100%;
  height: 100%;
  @apply p-0
}
</style>
