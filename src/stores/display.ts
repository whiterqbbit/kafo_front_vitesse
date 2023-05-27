type DisplayKey = 'login_modal' | 'cookie_modal' | 'filter_modal' | 'burger_menu' | 'profile_modal'

export const display = reactive({
  login_modal: false,
  cookie_modal: true,
  filter_modal: false,
  burger_menu: false,
  profile_modal: false,
  chat_shutter: false,
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
