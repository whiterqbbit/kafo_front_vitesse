<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'
import { use_user_store } from '@/stores/user'
const user = use_user_store()

use_coffee_store().fetch_db()
const cookies = useCookies(['user'])
const display_cookies = ref(false)

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('code') !== null)
    user.linkedin_continue(urlParams.get('code'))
})
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '[Alpha] Kafo | Coworking partout, solitude nulle part',
  meta: [
    { name: 'description', content: 'Ca va, ca vient' },
    {
      name: 'theme-color',
      content: '#815a4f',
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
    <div>
      <button @click="display_cookies = !display_cookies">
        {{ display_cookies ? 'hide' : 'display' }} cookies
      </button>
      <pre v-if="display_cookies">{{ cookies.getAll() }}</pre>
    </div>
    <RouterView h-screen />
  </main>
</template>
