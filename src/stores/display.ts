import type { User } from './xano'

type DisplayKey = 'login_modal' | 'cookie_modal' | 'filter_modal' | 'burger_menu' | 'profile_modal'

export const display = reactive({
  login_modal: false,
  cookie_modal: true,
  filter_modal: false,
  burger_menu: false,
  profile_modal: false,
  chat_shutter: false,
  hover_profile: false,
  hover_profile_attendee: null as User | null,
})

export function reset_display() {
  display.login_modal = false
  display.cookie_modal = false
  display.filter_modal = false
  display.burger_menu = false
  display.profile_modal = false
  display.burger_menu = false
}

export function toggle_modal(modal: DisplayKey) {
  reset_display()
  display[modal] = true
}

export const stored_display = useStorage('stored_display', {
  welcome_modal: true,
})

export function toggle_hover_profile(attendee: User) {
  console.log('bebe')
  console.log(display.hover_profile)
  console.log(display.hover_profile_attendee)
  if (!(display.hover_profile === true && display.hover_profile_attendee?.id === attendee.id)) {
    display.hover_profile_attendee = attendee
    display.hover_profile = true
  }
  console.log('bobo')
}
