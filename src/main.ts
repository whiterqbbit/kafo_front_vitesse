import { ViteSSG } from 'vite-ssg'
import routes from 'pages-generated'
import PrimeVue from 'primevue/config'

// @ts-expect-error failed to resolve types
import { anu } from 'anu-vue'
import App from './App.vue'
import analytics from './utils/segment'
import type { UserModule } from './types'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/theme.css'
import 'anu-vue/dist/style.css'
import '@anu-vue/preset-theme-default/dist/style.css'

// import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(PrimeVue)
    ctx.app.use(anu, {
      registerComponents: false,
      themes: { light: { colors: { primary: '4, 23%, 34%' } } },
    })

    if (typeof window !== 'undefined') {
      analytics.load(import.meta.env.VITE_SEGMENT_WRITE_KEY)
      analytics.page()
    }
  },
)
