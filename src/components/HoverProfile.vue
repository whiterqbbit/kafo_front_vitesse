<template>
  <div class="hover-profile-container" :style="position_style">
    <img :src="props.attendee?.pic_xsmall ? props.attendee?.pic_xsmall : default_user_pic" class="h-20 rounded-3xl">
    <!-- Information -->
    <div>
      <div class="text-lg font-bold">
        {{ props.attendee?.first_name }}
      </div>
      <div>
        {{ props.attendee?.job_title}}
      </div>
      <div class="text-sm text-gray-500">
        {{ props.attendee?.bio }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/stores/xano.d.ts'
import default_user_pic from '@/assets/img/default_user_pic.png'

const props = defineProps<{
  attendee: User | null
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
    @apply absolute max-w-60 rounded-3xl rounded-lg bg-white p-3 shadow-md flex gap-3
}
</style>
