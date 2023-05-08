export const display = reactive({
  selected_modal: false,
  login_modal: false,
  cookie_modal: false,
  filter_modal: false,
  burger_menu: false,
})

export const stored_display = useStorage('stored_display', {
  welcome_modal: true,
})
