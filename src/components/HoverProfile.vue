<template>
  <div ref="hover_profile" class="hover-profile-container" :style="position_style">
    <div class="flex animate-zoom-in animate-duration-40 gap-3 rounded-3xl bg-white p-3 shadow-md">
      <img :src="props.attendee?.pic_xsmall ? props.attendee?.pic_small : default_user_pic" class="h-25 rounded-full">
      <div class="flex flex-col gap-1">
        <div v-if="props.attendee?.first_name" class="text-lg font-bold">
          {{ props.attendee?.first_name }}
        </div>
        <div v-if="props.attendee?.job_title">
          {{ props.attendee?.job_title }}
        </div>
        <div v-if="props.attendee?.bio" class="text-sm text-gray-500">
          {{ props.attendee?.bio }}
        </div>
        <div>
          <div v-if="props.attendee?.open_to_pause" class="text-xs font-bold">
            Dispo pour un café
          </div>
          <div v-if="props.attendee?.open_to_lunch" class="text-xs font-bold">
            Dispo pour casser une graine
          </div>
          <div v-if="props.attendee?.open_to_afterwork" class="text-xs font-bold">
            Dispo pour un afterwork
          </div>
        </div>
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
}>()
const hover_profile = ref<HTMLElement | null>(null)

const profile_dimensions = computed(() => {
  if (!hover_profile.value) return { width: 400, height: 400 }
  return {
    width: hover_profile.value.clientWidth,
    height: hover_profile.value.clientHeight,
  }
})

const position_style = computed(() => {
  const padding = 10

  const left = props.x + profile_dimensions.value.width / 2 + padding ?? 0
  const top = props.y - profile_dimensions.value.height - padding ?? 0

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
})
</script>

<style scoped>
.hover-profile-container {
    transform: translateX(-50%);
    @apply absolute place-items-center max-w-100
}
</style>
