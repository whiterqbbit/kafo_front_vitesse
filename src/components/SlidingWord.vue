<template>
  <div ref="textRef" class="ml-3">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'

const props = defineProps<{
  items: string[]
}>()

const textRef = ref(null)
const items = props.items
const item = ref(items[0])
let item_index = 0

function next_item() {
  item.value = ` ${items[item_index % items.length]}`
  item_index++
}

const { variant } = useMotion(textRef, {
  initial: {
    y: 0,
    opacity: 1,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1200 + Math.random() * 3000,
      ease: 'easeInOut',
      onComplete: () => {
        variant.value = 'slide_up'
      },
    },
  },
  slide_up: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 400,
      ease: 'easeInOut',
      onComplete: () => {
        next_item()
        variant.value = 'teleports_down'
      },
    },
  },
  teleports_down: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 40,
      ease: 'easeInOut',
      onComplete: () => {
        variant.value = 'slide_mid'
      },
    },
  },
  slide_mid: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 400,
      ease: 'easeInOut',
      onComplete: () => {
        variant.value = 'enter'
      },
    },
  },
})
</script>
