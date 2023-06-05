import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import place_page from '@/pages/place/[id].vue'
import { use_event_store } from '@/stores/event'
import Index from '@/pages/index.vue'

describe('page/[id].vue', () => {
  let event_store: ReturnType<typeof use_event_store>

  beforeAll(async () => {
    setActivePinia(createPinia())
    event_store = use_event_store()
    event_store.selected_place_id = 126
    await event_store.get_place_events()
  })

  it('should render', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: Index },
        { path: '/map', component: { template: '<div></div>' } }],
    })
    // router.push({ path: '/', query: { display_more_events: 'true' } })
    // await router.isReady()

    const wrapper = mount(place_page as any, {
      propsData: { id: '126' },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('En ce moment')
    expect(wrapper.text()).toContain('Rejoindre')
  })
})
