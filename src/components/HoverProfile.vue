<template>
  <div class="hover-profile-container absolute" :style="position_style">
    <div class="w-60 rounded-3xl rounded-lg bg-white p-4 shadow-md">
      <h3>{{ props.attendee?.id }}</h3>
      <img :src="props.attendee?.url" class="rounded-3xl">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  attendee: {
    id: number
    url: string
  } | null
  x: number
  y: number
  width: number
  height: number
}>()

const position_style = computed(() => {
  const padding = 16
  const profile_width = 80
  const profile_height = 100

  let left = props.x
  let top = props.y

  if (left + profile_width + padding > props.width) left = props.width - profile_width - padding
  if (left - profile_width - padding < 0) left = profile_width + padding
  if (top + profile_height + padding > props.height) top = props.height - profile_height - padding
  if (top - profile_height - padding < 0) top = profile_height + padding

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
})
</script>

<style scoped>
.hover-profile-container {
    transform: translateX(-50%);
}
</style>
