<template>
  <div class="container">
    <!-- {{ place_store.db_full_computed }} -->
    <div
      v-for="place in place_db"
      :key="place.id"
      class="mb-8 flex"
    >
      <DraggableGallery :place="place" />
    </div>
  </div>
</template>

<script setup lang="ts">
const place_store = use_place_store()
const place_db = computed(() => place_store.db_full_computed)
</script>
