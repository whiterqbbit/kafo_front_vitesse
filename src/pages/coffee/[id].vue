<template>
  <div class="container">
    <div id="carousel_and_titles" class="flex flex-col bg-pink-500 p-2">
      <div class="h-100 bg-red-500 text-center text-3xl">
        carousel
      </div>
      <div id="title_and_Co" class="bg-teal-700 p-2 md:order-first">
        <div id="title" class="bg-cafe-500">
          Cafe machin
        </div>
        <div id="personnes_et_minutes" class="flex flex-col bg-yellow-500 p-2 md:flex-row md:justify-between">
          <div id="les_personnes" class="bg-cafe-100">
            les personnes
          </div>
          <div id="les_minutes" class="bg-cafe-500">
            les minutes
          </div>
        </div>
      </div>
    </div>
    <div id="main" class="flex flex-col gap-9 bg-green-700 p-2 md:flex-row">
      <div id="lefty" class="max-w-2xl bg-yellow-500 p-2">
        <div id="description" class="bg-blue-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          tincidunt nisl. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </div>
        <div id="tags" class="wrap flex flex-row flex-wrap gap-2 bg-green-500 p-2">
          <div id="tag1" class="w-32 flex bg-cafe-500">
            tag1
          </div>
          <div id="tag2" class="w-32 flex bg-cafe-500">
            tag2
          </div>
          <div id="tag3" class="w-32 flex bg-cafe-500">
            tag3
          </div>
          <div id="tag4" class="w-32 flex bg-cafe-500">
            tag4
          </div>
          <div id="tag5" class="w-32 flex bg-cafe-500">
            tag5
          </div>
        </div>
        <div id="map_and_co" class="bg-teal-700 p-2">
          <div id="map" class="bg-cafe-500">
            map
          </div>
          <div id="co" class="bg-cafe-500">
            co
          </div>
        </div>
      </div>
      <div id="righty" class="bg-blue-500 p-2">
        <div id="ingredients" class="bg-cafe-500">
          ingredients
        </div>
        <div id="preparation" class="bg-cafe-500">
          preparation
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const coffee_store = use_coffee_store()
</script>
