<script setup lang="ts">
const coffee_store = use_coffee_store()
coffee_store.fetch_coffee_db()

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: '#00aba9',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <TheHeader />
  <main bg-fuchsia>
    <RouterView h-screen />
  </main>
</template>
