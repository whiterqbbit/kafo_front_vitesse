<template>
  <div>
    <div v-for="(coffee, index) in use_coffee_store().coffee_db" :key="index">
      <div m-4 h-48 rounded-xl bg-cafe-300>
        {{ coffee.nom }}
        <!-- <Galleria
          :value="images" :num-visible="5" :circular="true" container-style="max-width: 640px"
          :show-item-navigators="true"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;">
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;">
          </template>
        </Galleria> -->
        <Image preview src="https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg" alt="Image" width="250" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image'
const images = [
  'https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg',
  'https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg',
  'https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg',
]
</script>
