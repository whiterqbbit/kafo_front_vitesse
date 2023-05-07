<template>
  <div class="h-screen--50px w-90 overflow-auto fill-current fill-grass-500">
    <div class="my-3 flex flex-col gap-4">
      <div v-for="coffee in coffee_db" :key="coffee.id" class="relative mx-2 overflow-hidden rounded-xl shadow-md">
        <CoffeeCard :place="coffee" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const coffee_store = use_coffee_store()
const coffee_db = computed(() => coffee_store.db_filtered)
</script>
