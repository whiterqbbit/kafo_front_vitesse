<template>
  <img
    :src="zoom_icon" class="fixed z-10 m-2 cursor-pointer"
    :class="zoomed ? 'animate-rubber-band' : 'animate-jello'"
    @click="zoom"
  >
  <div
    class="mx-auto overflow-auto bg-cafe-50 px-9 py-4"
    :class="{ zoomed }"
  >
    <!-- {{ place_store.db_full_computed }} -->
    <div
      v-for="place in place_db"
      :key="place.id"
      class="mb-8 flex"
    >
      <DraggableGallery
        :place="place"
        :class="{ zoomed }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const place_store = use_place_store()
const place_db = computed(() => place_store.db_full_computed)
const zoom_icon = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Loupe.svg'
const zoomed = ref(false)

function zoom() {
  zoomed.value = !zoomed.value
}
</script>

<style scoped>
.zoomed {
  @apply max-w-200vw w-200vw
}
</style>
