<script setup lang="ts">
const coffee_store = use_coffee_store()
</script>

<template>
  <div m-4 flex flex-col gap-2 p-4>
    <div v-if="coffee_store.coffee_db_loading">
      Fetching...
    </div>
    <div v-else-if="coffee_store.coffee_db_error">
      {{ coffee_store.coffee_db_error }}
    </div>
    <div v-else-if="coffee_store.coffee_db">
      {{ coffee_store.coffee_db[0].nom }}
    </div>
  </div>
</template>
