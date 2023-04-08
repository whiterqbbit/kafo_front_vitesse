<template>
  <div v-if="coffee_store.db">
    {{ coffee_store.selected?.nom }}
    <Button class="fixed right-4 top-4" icon="pi pi-times" severity="danger" text raised rounded aria-label="Close" @click="close_modal" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const coffee_store = use_coffee_store()
function close_modal() {
  coffee_store.selected_id = null
  display.selected_modal = false
}
</script>
