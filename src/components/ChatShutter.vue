<template lang="">
  <div class="absolute right-0 z-20 h-screen--50px max-w-full flex animate-fade-in-right animate-duration-100 overflow-auto border-l-2 border-cafe-400 rounded-l-xl bg-cafe-100 p-3 shadow-md">
    <!-- liste des chatrooms -->
    <div v-if="conversations" class="flex flex-col gap-5 p-2">
      <div class="text-xl font-bold">
        Vos conversations
      </div>
      <div>
        <div
          v-for="conversation in conversations"
          :key="conversation?.contact?.id"
          class="flex place-items-center gap-3 rounded-xl p-2 font-bold"
          :class="conversation === selected_conversation ? 'bg-cafe-600 text-cafe-50' : 'cursor-pointer'"
          @click="selected_conversation = conversation"
        >
          <img v-if="conversation?.contact" :src="conversation?.contact?.pic_xsmall ? conversation?.contact?.pic_xsmall : default_user_pic" class="h-10 w-10 rounded-full object-cover">
          <span v-if="conversation?.contact?.first_name">{{ conversation?.contact?.first_name }}</span>
        </div>
      </div>
    </div>
    <!-- messages -->
    <div v-if="selected_conversation" class="relative w-70 flex flex-col animate-fade-in-right gap-3 border-l-2 border-cafe-400 p-2">
      <button class="absolute right-0 top-2 h-7 w-7 rounded-3xl hover:scale-105" icon="pi pi-times" @click="selected_conversation = null">
        <img :src="svg_close">
      </button>
      <div class="text-xl font-bold">
        {{ selected_conversation.contact.first_name }}
      </div>
      <div
        class="flex flex-col gap-2"
      >
        <div
          v-for="message in selected_conversation.messages"
          :key="message.id"
          class="flex flex-col"
        >
          <div
            class="w-fit flex rounded-xl p-2"
            :class="message.user_id === user_store.id ? 'bg-grass-300 rounded-br-none' : 'bg-cafe-300 rounded-bl-none'"
          >
            {{ message.message }}
          </div>
          <div
            class="text-xs text-cafe-400"
            :class="message.user_id === user_store.id ? 'text-right' : 'text-left'"
          >
            {{ format_timestamp(message.created_at) }}
          </div>
        </div>
      </div>
      <div>
        <ATextarea
          v-model="new_message"
          class="w-full rounded-xl text-sm text-cafe-600 shadow-inner placeholder-cafe-400"
          placeholder="Votre message..."
          auto-size
          :loading="use_chat_store().chat_is_loading"
          @keyup.enter="send_message()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import default_user_pic from '@/assets/img/default_user_pic.png'
import svg_close from '@/assets/svg/icon/MingcuteCloseFill.svg'
import type { Conversation } from '@/stores/xano.d.ts'

const user_store = use_user_store()
const conversations = use_chat_store().conversations
const selected_conversation = ref<Conversation | null>(null)
const new_message = ref('')

function format_timestamp(timestamp: Date) {
  const message_date = new Date(timestamp)
  const current_date = new Date()

  const same_day = message_date.getDate() === current_date.getDate()
                     && message_date.getMonth() === current_date.getMonth()
                     && message_date.getFullYear() === current_date.getFullYear()

  const yesterday = new Date(current_date)
  yesterday.setDate(current_date.getDate() - 1)
  const is_yesterday = message_date.getDate() === yesterday.getDate()
                         && message_date.getMonth() === yesterday.getMonth()
                         && message_date.getFullYear() === yesterday.getFullYear()

  const time_string = message_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  if (same_day) {
    return time_string
  } else if (is_yesterday) {
    return `Hier à ${time_string}`
  } else {
    return `Le ${message_date.toLocaleDateString()} à ${time_string}`
  }
}

function send_message() {
  use_chat_store().send_message(new_message.value, selected_conversation?.value?.contact.id)
  new_message.value = ''
}
</script>
