<template>
  <div class="h-screen--50px w-90 overflow-auto">
    <div v-if="coffee_store.db_loading">
      <img :src="spinner" m-auto>
    </div>
    <div v-else-if="coffee_store.db_error">
      {{ coffee_store.db_error }}
    </div>
    <div v-else-if="coffee_db" class="my-3 flex flex-col gap-4">
      <div v-for="coffee in coffee_db.slice(0, 20)" :key="coffee.id" class="mx-2 overflow-hidden rounded-xl shadow-md">
        <CoffeeCard :place="coffee" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import spinner from '@/assets/img/spinner.gif'

const coffee_store = use_coffee_store()
const coffee_db = computed(() => coffee_store.db_filtered)
</script>
