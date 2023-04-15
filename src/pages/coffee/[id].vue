<template>
  <div class="bg-cafe-100">
    <h1>{{ props.id }}</h1>
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
const selected_id = ref(coffee_store.selected_id)
</script>
