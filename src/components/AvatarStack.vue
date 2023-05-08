<template>
  <div class="avatar-container flex">
    <div
      v-for="attendee in props.attendees"
      :key="attendee.id"
      class="attendee-img relative h-10 w-10 rounded-full bg-cafe-100"
      @mouseenter="show_hover_profile(attendee)"
      @mouseleave="hide_hover_profile"
    >
      <img :src="attendee.url" class="h-full w-full rounded-full object-cover">
      <Teleport v-if="is_mounted" to="#main_container">
        <HoverProfile v-if="hover_profile_visible" :attendee="current_attendee" :x="x" :y="y" :width="width" :height="height" class="z-100" />
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Attendee {
  id: number
  url: string
}

const props = defineProps<{
  attendees: Attendee[]
}>()

const is_mounted = ref(false)
const hover_profile_visible = ref(false)
const current_attendee = ref<Attendee | null>(null)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

onMounted(() => {
  // for SSG
  is_mounted.value = true
})

function show_hover_profile(attendee: Attendee) {
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
