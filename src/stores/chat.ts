import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Chat, User } from './xano'

export const use_chat_store = defineStore('chat', () => {
  const user_store = use_user_store()
  const chat_loading = ref(false)
  const chat_error = ref<string | null>(null)
  const messages: Ref<Chat[] | null> = ref([])
  interface Conversation { contact: User; messages: Chat[] }
  const selected_conversation: Ref<Conversation[] | null> = ref(null)

  const conversations = computed(() => {
    if (!messages.value) return null
    const dms: Ref<Conversation[]> = ref([])
    messages.value.forEach((message: Chat) => {
      if (!message) return
      const friend = message.user_id === user_store.id ? message.receiver : message.user
      if (!friend) return
      if (!dms.value.some(dm => dm.contact.id === friend.id)) dms.value.push({ contact: friend, messages: [message] })
      else dms.value.find(dm => dm.contact.id === friend.id)?.messages.push(message)
    })
    return dms
  })

  async function get_all_messages() {
    if (!user_store.is_auth) {
      return
    }
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
      messages.value?.sort((a, b) => {
        if (!a || !b) return 0
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      })
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
    conversations,
    selected_conversation
  }
})
