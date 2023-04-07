<template>
  <div>
    <div v-for="(coffee, index) in use_coffee_store().coffee_db" :key="index">
      <div class="m-4 h-48 rounded-xl bg-cafe-300">
        {{ coffee.nom }}

        <Galleria
          class="w-240px"
          :value="coffee.aws_miniatures"
          :num-visible="3"
          :circular="true"
          container-style="max-width: 640px; max-height: 240px;"
          :show-item-navigators="true"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item.url"
              :alt="coffee.nom"
              style="width: 100%; height: 240px; display: block; object-fit: cover;"
            >
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item.url"
              :alt="coffee.nom"
              style="width: 100%; height: 60px; display: block; object-fit: cover;"
            >
          </template>
        </Galleria>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Galleria from 'primevue/galleria'
</script>
