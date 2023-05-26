<template>
  <div>
    <div v-if="props.tags.includes('Studieux')" i-ci-volume-off class="icon-btn">
      <ATooltip text="Studieux" />
    </div>
    <div v-else-if="props.tags.includes('Calme')" i-ci-volume-min class="icon-btn">
      <ATooltip text="Calme" />
    </div>
    <div v-else-if="props.tags.includes('Animé')" i-ci-volume-max class="icon-btn">
      <ATooltip text="Animé" />
    </div>
    <div v-if="props.tags.includes('Wifi')" i-ci-wifi-high class="icon-btn">
      <ATooltip bg-white text="Wifi" />
    </div>
    <div v-else i-ci-wifi-off class="icon-btn">
      <ATooltip text="Pas de Wifi" />
    </div>
    <div v-if="!props.tags.includes('Prises')" i-ic-round-power-off class="icon-btn">
      <ATooltip text="Pas de prises" />
    </div>
    <div v-else i-ic-round-power class="icon-btn">
      <ATooltip text="Prises" />
    </div>
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
