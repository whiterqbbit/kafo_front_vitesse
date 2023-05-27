import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Chat } from './xano'

export const use_chat_store = defineStore('chat', () => {
  const user_store = use_user_store()
  const chat_loading = ref(false)
  const chat_error = ref<string | null>(null)
  const messages: Ref<Chat[] | null> = ref(null)

  const DMS = computed(() => {
    if (!messages.value) return null
    const dms: Ref<Record<number, Chat[]>> = ref({})
    messages.value.map((message: Chat) => {
      if (!message || message.club_uuid || message.coffee_id) return null
      const friend_id = message.user_id === user_store.id ? message.receiver_id : message.user_id
      if (!dms.value[friend_id]) dms.value[friend_id] = []
      dms.value[friend_id].push(message)
      return null
    })
    delete dms.value[0]
    return dms
  })

  async function get_all_messages() {
    const cookies = useCookies(['user'])
    const user_auth_cookie = cookies.get('token')
    try {
      const xano_get_chat_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/chat`
      const response = await fetch(xano_get_chat_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_auth_cookie}`,
        },
      })
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}. Failed to fetch all messages.`)
      const data = await response.json() as Chat[] | null

      messages.value = data
    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function listen_to_messages() {
    try {

    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function send_message(message: string) {
    try {

    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  return {
    send_message,
    messages,
    get_all_messages,
    chat_loading,
    chat_error,
    DMS,
  }
})
