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
    <div class="text-left text-3xl">
      <Galleria
        :value="selected_coffee?.aws_pics"
        :num-visible="3"
        :show-thumbnails="false"
        :show-item-navigators="true"
        :circular="true"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.url"
            class="h-500px w-full rounded-b-2xl object-cover"

            :alt="selected_coffee?.nom"
            style="width: 100%; display: block"
          >
        </template>
      </Galleria>
    </div>

    <div id="title_group" class="px-5">
      <div id="title" class="font-black text-4xl">
        {{ selected_coffee?.nom }}
      </div>

      <div id="subtitle" class="flex flex-col font-bold md:flex-row md:justify-between">
        <div v-if="selected_coffee?.attendance !== 0" id="attendance">
          {{ selected_coffee?.attendance }} personnes y sont en ce moment
        </div>
        <div id="eta" class="">
          Les minutes
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
            <div class="flex flex-row gap-2">
              <div class="font-bold">
                Ambiance :
              </div>
              <div> {{ selected_coffee?.tags.find(services => ['Studieux', 'Calme', 'Animé'].includes(services)) }}</div>
            </div>

            <div v-if="selected_coffee?.desc" class="flex flex-col gap-2">
              <div class="font-bold">
                A propos :
              </div>
              <div> {{ selected_coffee?.desc }}</div>
            </div>

            <div v-if="selected_coffee?.acces_wifi" class="flex flex-row gap-2">
              <div class="font-bold">
                Wifi :
              </div>
              <div> {{ selected_coffee?.acces_wifi }}</div>
            </div>
          </div>

          <div v-if="preferences.is_mobile" id="tags" class="wrap flex flex-col flex-wrap gap-2">
            <div class="font-bold">
              Service et spécificités :
            </div>
            <div class="flex flex-row flex-wrap gap-2">
              <div v-for="tag in filtered_tags" :key="tag" class="services">
                {{ tag }}
              </div>
            </div>
          </div>

          <div v-if="selected_coffee?.adresse" id="location_container" class="flex flex-row place-items-center">
            <div class="flex flex-col">
              <div id="address" class="">
                {{ selected_coffee?.adresse }}
              </div>
              <div v-if="selected_coffee?.metro" class="">
                Métro : {{ selected_coffee?.metro }}
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
const props = defineProps({
  id: String,
})

// get the selected coffee from the store
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id
const selected_coffee = computed(() => coffee_store.selected)
const filtered_tags = selected_coffee?.value?.tags?.filter(tag => !['Calme', 'Studieux', 'Animé', 'Bar', 'Brasserie', 'Restaurant', 'Coworking', 'Tiers lieu', 'Autre lieu'].includes(tag))
</script>

<style scoped>
.services {
  @apply flex place-content-center bg-cafe-300 rounded-xl p-x-3
}
</style>
