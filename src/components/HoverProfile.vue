<template>
  <div ref="hover_profile" class="hover-profile-container" :style="position_style">
    <img :src="props.attendee?.pic_xsmall ? props.attendee?.pic_xsmall : default_user_pic" class="h-20 rounded-3xl">
    <!-- x{{ x }} y{{ y }} -->
    <!-- Information -->
    <div>
      <div class="text-lg font-bold">
        {{ props.attendee?.first_name }}
      </div>
      <div>
        {{ props.attendee?.job_title }}
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
const hover_profile = ref<HTMLElement | null>(null)

const position_style = computed(() => {
  const padding = 5

  const left = props.x ?? 0
  const top = props.y + padding ?? 0

  // if (left + props.profile_dimensions.width + padding > props.width) left = props.width - props.profile_dimensions.width - padding
  // if (left - props.profile_dimensions.width - padding < 0) left = props.profile_dimensions.width + padding
  // if (top + props.profile_dimensions.height + padding > props.height) top = props.height - props.profile_dimensions.height - padding
  // if (top - props.profile_dimensions.height - padding < 0) top = props.profile_dimensions.height + padding

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
