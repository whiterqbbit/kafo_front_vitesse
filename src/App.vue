<script setup lang="ts">
import { use_user_store } from '@/stores/user'

const user = use_user_store()
use_coffee_store().fetch_db()
use_club_store().fetch_db()

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('code') !== null) {
    user.linkedin_continue(urlParams.get('code'))
  }

  const isMobileWidth: MediaQueryList = window.matchMedia('(max-width: 768px)')
  display.filter_modal = !isMobileWidth.matches // Hide the filter modal on mobile

  isMobileWidth.addEventListener('change', event => handleWidthChange(event.target as MediaQueryList))
  handleWidthChange(isMobileWidth) // Call the function initially to set the correct state

  function handleWidthChange(mediaQueryList: MediaQueryList) {
    if (mediaQueryList.matches) {
      preferences.is_mobile = true
    } else {
      preferences.is_mobile = false
    }
  }
})
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '[Beta] Kafo | Coworking partout, solitude nulle part',
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
  <main bg-cafe-50 text-cafe-600>
    <DesktopHeader v-if="!($route.path === '/') && !preferences.is_mobile" />
    <MobileHeader v-else-if="!($route.path === '/')" />
    <RouterView class="h-screen" />
  </main>
</template>
