import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import Ably from 'ably'

export const use_chat_store = defineStore('chat', () => {
  const user_store = use_user_store()
  const channel_id = ref<string | null>(null)
  const ably: Ref<Ably.Realtime | null> = ref(null)
  const channel: Ref<Ably.Types.RealtimeChannelCallbacks | null> = ref(null)
  const messages: Ref<Ably.Types.Message[] | null> = ref(null)

  watchEffect(async () => {
    if (!channel_id.value || !ably.value) return
    channel.value = ably.value.channels.get(channel_id.value)
    listen_to_messages()
    messages.value = await fetch_messages_from_server()
  })

  async function initialize_ably() {
    try {
      const token = await get_token()

      ably.value = new Ably.Realtime(token)
      await connect_to_ably()
    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function fetch_messages_from_server() {
    const xano_ably_get_messages_url = `${import.meta.env.VITE_XANO_API_URL}/api:YkBUDKvR/ably/chat/place`
    const cookies = useCookies(['user'])
    const user_auth_cookie = cookies.get('token')
    try {
      const response = await fetch(xano_ably_get_messages_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_auth_cookie}`,
        },
        body: JSON.stringify(
          {
            place_id: channel_id.value,
          },
        ),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
    } catch (error: any) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function get_token() {
    const xano_ably_token_url = `${import.meta.env.VITE_XANO_API_URL}/api:YkBUDKvR/ably/auth/token`
    const cookies = useCookies(['user'])
    const user_auth_cookie = cookies.get('token')
    try {
      const response = await fetch(xano_ably_token_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_auth_cookie}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
    } catch (error: any) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function connect_to_ably() {
    try {
      if (!ably.value) throw new Error('Ably is not available.')
      await ably.value.connection.once('connected')
      console.log('Connected to Ably!')
    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function listen_to_messages() {
    try {
      if (!channel.value) throw new Error('Channel is not available.')
      await channel.value.subscribe((message) => {
        console.log(`Received a message in realtime: ${message.data}`)
        messages.value?.push(message)
      })
    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  async function send_message(message: string) {
    try {
      if (!channel.value) throw new Error('Channel is not available.')
      const displayed_name = user_store.first_name
      await channel.value.publish(displayed_name, message)
    } catch (error) {
      const typed_error = error as Error
      console.error(typed_error.message)
    }
  }

  initialize_ably().catch(console.error)

  return {
    channel_id,
    send_message,
    messages,
  }
})
