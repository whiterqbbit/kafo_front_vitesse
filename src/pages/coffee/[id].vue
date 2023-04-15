<template>
  <div class="flex flex-col gap-6 container">
    <div id="carousel_and_titles" class="flex flex-col gap-6">
      <div class="h-100 bg-red-500 text-left text-3xl">
        carousel
      </div>

      <div id="title_and_Co" class="px-5 md:order-first">
        <div id="title" class="font-black text-3xl">
          {{ selected_coffee?.nom }}
        </div>

        <div
          id="personnes_et_minutes"
          class="flex flex-col font-bold md:flex-row md:justify-between"
        >
          <div v-if="selected_coffee?.attendance !== 0" id="les_personnes" class="">
            {{ selected_coffee?.attendance }} personnes y sont en ce moment
          </div>
          <div id="les_minutes" class="">
            les minutes
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!preferences.is_mobile"
      id="tags"
      class="wrap flex flex-row flex-wrap gap-2"
    >
      <div id="tag1" class="w-32 flex">
        tag1
      </div>
      <div id="tag2" class="w-32 flex">
        tag2
      </div>
      <div id="tag3" class="w-32 flex">
        tag3
      </div>
      <div id="tag4" class="w-32 flex">
        tag4
      </div>
      <div id="tag5" class="w-32 flex">
        tag5
      </div>
    </div>

    <div id="main" class="flex flex-col gap-6 px-5 md:flex-row">
      <div id="lefty" class="max-w-2xl flex flex-col gap-6">
        <div id="description" class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
              <div class="font-bold">
                Ambiance :
              </div>
              <div> {{ selected_coffee?.tags.find(tag => ['Studieux', 'Calme', 'Animé'].includes(tag)) }}</div>
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
              <div id="tag1" class="w-32 flex">
                tag1
              </div>
              <div id="tag2" class="w-32 flex">
                tag2
              </div>
              <div id="tag3" class="w-32 flex">
                tag3
              </div>
              <div id="tag4" class="w-32 flex">
                tag4
              </div>
              <div id="tag5" class="w-32 flex">
                tag5
              </div>
            </div>
          </div>

          <div v-if="selected_coffee?.adresse" id="map_and_co" class="flex flex-row place-items-center">
            <div class="flex flex-col">
              <div id="adresse" class="">
                {{ selected_coffee?.adresse }}
              </div>
              <div id="selected_coffee?.metro" class="">
                Métro : {{ selected_coffee?.metro }}
              </div>
            </div>
            <div id="go" class="h-20 flex flex-row place-items-center rounded-3xl bg-grass-500 p-3 font-bold text-cafe-100">
              <div>
                Y aller !
              </div>
              <img src="https://img.icons8.com/ios/50/000000/forward.png">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="righty" class="">
      <div id="ingredients" class="">
        ingredients
      </div>
      <div id="preparation" class="">
        preparation
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
})
const selected_coffee_id = Number(props.id)
const coffee_store = use_coffee_store()
coffee_store.selected_id = selected_coffee_id
const selected_coffee = computed(() => coffee_store.selected)
</script>
