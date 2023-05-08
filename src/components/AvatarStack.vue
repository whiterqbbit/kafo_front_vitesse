<template>
  <div class="avatar-container flex">
    <div
      v-for="attendee in props.attendees"
      :key="attendee.id || 'fallback'"
      class="attendee-img relative h-10 w-10 rounded-full bg-cafe-100"
      @mouseenter="show_hover_profile(attendee)"
      @mouseleave="hide_hover_profile"
    >
      <img :src="attendee?.pic_xsmall ? attendee?.pic_xsmall : default_user_pic" class="h-full w-full rounded-full object-cover">
      <Teleport v-if="is_mounted" to="#main_container">
        <HoverProfile v-if="hover_profile_visible" ref="hover_profile" :profile_dimensions="profile_dimensions" :attendee="current_attendee ? current_attendee : null" :x="x" :y="y" :width="width" :height="height" class="z-100" />
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/stores/xano.d.ts'
import default_user_pic from '@/assets/img/default_user_pic.png'

const props = defineProps<{
  attendees: User[]
}>()

const is_mounted = ref(false)
const hover_profile_visible = ref(false)
const current_attendee = ref<User | null>(null)

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const hover_profile = ref<HTMLElement | null>(null)
const profile_width = hover_profile?.value?.clientWidth ?? 0
const profile_height = hover_profile?.value?.clientHeight ?? 0
const profile_dimensions = {
  width: profile_width,
  height: profile_height,
}

onMounted(() => {
  // for SSG
  is_mounted.value = true
})

function show_hover_profile(attendee: User) {
  current_attendee.value = attendee
  hover_profile_visible.value = true
}

function hide_hover_profile() {
  hover_profile_visible.value = false
}
</script>

<style scoped>
.attendee-img {
  position: relative;
  margin-right: -10px;
  z-index: 6;
}
</style>
