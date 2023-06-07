export const display = reactive({
  selected_modal: false,
  login_modal: false,
  cookie_modal: true,
  filter_modal: false,
  burger_menu: false,
  profile_modal: false,
  join_club_modal: false,
})

export function reset_display() {
  display.selected_modal = false
  display.login_modal = false
  display.cookie_modal = false
  display.filter_modal = false
  display.burger_menu = false
  display.profile_modal = false
  display.burger_menu = false
  display.join_club_modal = false
}

export const stored_display = useStorage('stored_display', {
  welcome_modal: true,
})
