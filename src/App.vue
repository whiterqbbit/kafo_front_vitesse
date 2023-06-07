<script setup lang="ts">
use_place_store().fetch_db()
use_place_store().update_open_status()
use_user_store().me()
use_event_store().populate_places()
use_club_store().fetch_db()

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('code') !== null) {
    use_user_store().linkedin_continue(urlParams.get('code'))
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
const environnement = import.meta.env.VITE_ENV
const env_string = environnement === 'production' ? '' : environnement === 'staging' ? '[Beta] ' : '[dev] '
const favicon = environnement === 'production' ? '/favicon.png' : environnement === 'staging' ? '/favicon_beta.png' : '/favicon_dev.png'

useHead({
  title: `${env_string}Kafo | Coworking partout, solitude nulle part`,
  meta: [
    { name: 'description', content: 'Coworking partout, solitude nulle part' },
    {
      name: 'theme-color',
      content: '#815a4f',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: favicon,
    },
  ],
})

const route = useRoute()
const club_uuid = route.query.club_uuid as string

if (club_uuid) {
  display.join_club_modal = true
}

if (environnement === 'production') {
  // eslint-disable-next-line no-console
  console.log(' 🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪'
  + '\n🤪                                            🤪'
  + '\n🤪       ,--. ,--.         ,---.              🤪'
  + '\n🤪       |  .\'   / ,--,--./  .-\' ,---.        🤪'
  + '\n🤪       |  .   \' \' ,-.  ||  `-,| .-. |       🤪'
  + '\n🤪       |  |\   \\ \'-\'  ||  .-\'\' \'-\' \'         🤪'
  + '\n🤪       `--\' \'--\' `--`--\'`--\'   `---\'        🤪'
  + '\n🤪                                            🤪'
  + '\n 🤪🤪🤪🤪🤪🤪🤪 Coucou petit cokinou 🤪🤪🤪🤪🤪🤪🤪')
}

const pages_with_landing_header = ['/', '/a-propos', '/confidentialite', '/mentions-legales']
</script>

<template>
  <main bg-cafe-50 text-cafe-600>
    <DesktopHeader v-if="!(pages_with_landing_header.includes($route.path)) && !preferences.is_mobile" />
    <MobileHeader v-else-if="!(pages_with_landing_header.includes($route.path))" />
    <ModalJoinClub v-if="display.join_club_modal" :club_uuid="club_uuid" />
    <RouterView v-slot="{ Component }" :key="$route.fullPath" class="h-screen">
      <KeepAlive include="map">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>
