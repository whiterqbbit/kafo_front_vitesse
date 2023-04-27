<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { use_user_store } from '@/stores/user'

const user = use_user_store()
use_coffee_store().fetch_db()
use_club_store().fetch_db()

function is_landing_page(route: RouteLocationNormalizedLoaded) {
  return route.path === '/landing'
}

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('code') !== null) {
    user.linkedin_continue(urlParams.get('code'))
  }

  const isMobileWidth: MediaQueryList = window.matchMedia('(max-width: 768px)')

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
  <main bg-cafe-50 text-cafe-600>
    <DesktopHeader v-if="!is_landing_page($route) && !preferences.is_mobile" />
    <MobileHeader v-else-if="!is_landing_page($route)" />
    <RouterView class="h-screen" />
    <!-- <TheFooter
      v-if="!is_landing_page($route) && preferences.is_mobile"
      class="fixed bottom-0 z-50 h-56px w-full rounded-t-xl"
    /> -->
  </main>
</template>
