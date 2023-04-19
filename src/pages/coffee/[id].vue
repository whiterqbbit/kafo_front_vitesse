<template>
  <div class="z-100 flex flex-col gap-6 container">
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
      <div class="font-extra-bold text-cafe-100i rounded-xl bg-grass-500 p-4">
        Rejoindre
      </div>
    </div>
    <div class="overflow-hidden text-left text-3xl">
      <Flicking v-if="preferences.is_mobile" class="flicking-container" :options="flickingOptions">
        <div
          v-for="pic in (selected_coffee ? selected_coffee.aws_pics : [])"
          :key="pic.url"
          class="flicking-panel"
        >
          <img :src="pic.url" class="h-100 w-full object-cover">
        </div>
      </Flicking>
    </div>

    <div id="title_group" class="flex flex-col gap-5">
      <div id="title" class="px-5 font-black text-4xl">
        {{ selected_coffee?.nom }}
      </div>

      <div id="subtitle" class="flex flex-col px-5 font-bold md:flex-row md:justify-between">
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

    <div v-if="!preferences.is_mobile" id="tags" class="wrap flex flex-row flex-wrap gap-2 px-5">
      <div v-for="tag in filtered_tags" :key="tag" class="services">
        {{ tag }}
      </div>
    </div>
    <div id="main" class="flex flex-col gap-6 px-5 md:flex-row md:justify-between">
      <div id="lefty" class="max-w-2xl flex flex-col gap-6">
        <div id="description" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col">
              <div class="font-bold text-lg">
                Ambiance :
              </div>
              <div> {{ selected_coffee?.tags.find(services => ['Studieux', 'Calme', 'Animé'].includes(services)) }}</div>
            </div>

            <div v-if="selected_coffee?.desc" class="flex flex-col gap-2 text-lg">
              <div class="font-bold">
                A propos :
              </div>
              <div> {{ selected_coffee?.desc }}</div>
            </div>

            <div v-if="selected_coffee?.acces_wifi" class="flex flex-row gap-2 text-lg">
              <div class="font-bold">
                Wifi :
              </div>
              <div> {{ selected_coffee?.acces_wifi }}</div>
            </div>
          </div>

          <div v-if="preferences.is_mobile" id="tags" class="wrap flex flex-col flex-wrap gap-2 text-lg">
            <div class="font-bold">
              Service et spécificités :
            </div>
            <div class="flex flex-row flex-wrap gap-2">
              <div v-for="tag in filtered_tags" :key="tag" class="services">
                {{ tag }}
              </div>
            </div>
          </div>

          <div v-if="selected_coffee?.adresse" id="location_container" class="flex flex-row items-center justify-between text-lg">
            <div class="flex flex-col">
              <div id="address" class="">
                {{ selected_coffee?.adresse }}
              </div>
              <div v-if="selected_coffee?.metro" class="flex items-center gap-2">
                <img :src="subway_icon" class="h-6 w-6">
                {{ selected_coffee?.metro }}
              </div>
            </div>
            <div
              id="google_map_link"
              class="h-20 flex flex-row place-items-center rounded-3xl bg-grass-500 p-3 font-bold text-cafe-100"
            >
              <div>
                Y aller !
              </div>
              <img src="https://img.icons8.com/ios/50/000000/forward.png">
            </div>
          </div>
        </div>
      </div>
      <div id="righty" class="flex flex-col">
        <div id="events" class="">
          events
        </div>
        <div id="chat" class="">
          chat
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import subway_icon from '@/assets/img/icons/metro_tantative.png'

const props = defineProps({
  id: String,
})

// get the selected coffee from the store
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id
const selected_coffee = computed(() => coffee_store.selected)
const filtered_tags = selected_coffee?.value?.tags?.filter(tag => !['Calme', 'Studieux', 'Animé', 'Bar', 'Brasserie', 'Restaurant', 'Coworking', 'Tiers lieu', 'Autre lieu'].includes(tag))
const flickingOptions = {
  renderOnlyVisible: false,
  horizontal: true,
  circular: true,
  autoResize: false,
  gap: 0,
}
</script>

<style scoped>
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
