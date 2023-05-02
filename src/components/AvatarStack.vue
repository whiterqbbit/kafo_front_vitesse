<template>
  <div class="flex">
    <div v-for="attendee in props.attendees" :key="attendee.id" class="attendee-img h-10 w-10 rounded-full bg-cafe-100">
      <img :src="attendee.url" class="h-full w-full rounded-full object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  attendees: {
    id: number
    url: string
  }[]
}>()
</script>

<style scoped>
.attendee-img {
  position: relative;
  margin-right: -10px;
  z-index: 6;
}

.attendee-img:nth-child(n+2) {
  z-index: 5;
}

.attendee-img:nth-child(n+3) {
  z-index: 4;
}

.attendee-img:nth-child(n+4) {
  z-index: 3;
}

.attendee-img:nth-child(n+5) {
  z-index: 2;
}

.attendee-img:nth-child(n+6) {
  z-index: 1;
}
</style>
