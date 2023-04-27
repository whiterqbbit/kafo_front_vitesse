<template>
  <div>
    <div v-if="props.tags.includes('Studieux')" i-ci-volume-off class="icon-btn" />
    <div v-else-if="props.tags.includes('Calme')" i-ci-volume-min class="icon-btn" />
    <div v-else-if="props.tags.includes('Animé')" i-ci-volume-max class="icon-btn" />
    <div v-if="props.tags.includes('Wifi')" i-ci-wifi-high class="icon-btn" />
    <div v-else i-ci-wifi-off class="icon-btn" />
    <div v-if="props.tags.includes('Prises')" i-ic-round-power-off class="icon-btn" />
    <div v-else i-ic-round-power class="icon-btn" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: String[]
}>()
</script>

<style scoped>
.icon-btn {
  height: 1.8rem;
}
</style>
