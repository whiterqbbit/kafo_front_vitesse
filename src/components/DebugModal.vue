<template>
  <div bg-green-200>
    {{ props.props }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  props: {
    type: null as any,
    required: false,
  },
})
</script>
