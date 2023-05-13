import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Club, User } from './xano.d'

const cookies = useCookies(['user'])

export const use_user_store = defineStore('user', () => {
  const is_auth = ref(false)
  const user_coords = ref<{ lat: number; lng: number } | null>(null)
  const bio = ref<string | null>(null)
  const clubs = ref<Array<Club>>([])
  const domaine = ref('')
  const email = ref('')
  const family_name = ref('')
  const first_name = ref('')
  const highlighted_pins = ref<Array<number>>([])
  const highlighted_users = ref<Array<number>>([])
  const id = ref<number | null >(null)
  const incognito = ref<boolean | null >(null)
  const is_inboarded = ref<boolean | null >(null)
  const job_title = ref('')
  const open_to_afterwork = ref<boolean | null >(null)
  const open_to_lunch = ref<boolean | null >(null)
  const open_to_pause = ref<boolean | null >(null)
  const pic_medium = ref('')
  const pic_small = ref('')
  const pic_xsmall = ref('')
  const role = ref('')
  const type = ref('')
  const token = ref('')
  token.value = cookies.get('token')
  // console.log('initial user token.value', token.value.slice(0, 10))

  async function suggestion(form: { email: string; message: string; category: { name: string } }): Promise<void> {
    try {
      const xano_suggestion_url = `${import.meta.env.VITE_XANO_API_URL}/api:5e9BgwVw/suggestion`
      const response = await fetch(xano_suggestion_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            from_email: form.email,
            category: form.category.name,
            body: form.message,
          },
        ),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error during suggestion:', error)
      throw error
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const xano_login_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/login`
      const response = await fetch(xano_login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email,
            password,
          },
        ),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      const data = await response.json()
      token.value = data.authToken
      cookies.set('token', token.value)
      console.log('me called from login')
      me()
    } catch (error) {
      console.error('Error during login:', error)

      const typed_error = error as Error
      switch (typed_error.message) {
        case 'Invalid Credentials.':
          typed_error.message = 'Identifiants incorrects.'
          break
        case 'Missing param: password':
          typed_error.message = 'Veuillez entrer un mot de passe.'
          break
        case 'Missing param: field_value':
          typed_error.message = 'Veuillez remplir tous les champs.'
          break
      }

      throw typed_error
    }
  }

  async function signup(infos: { name: string; first_name: string; job_title: string; bio: string; email: string; password: string }) {
    const { name, first_name, job_title, bio, email, password } = infos

    try {
      const xano_signup_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/signup`
      const response = await fetch(xano_signup_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email,
            password,
            name: first_name,
            nom_de_famille: name,
            bio,
            job_title,
          },
        ),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      const data = await response.json()
      token.value = data.authToken
      cookies.set('token', token.value)
      console.log('me called from signup')
      me()
    } catch (error) {
      console.error('Error during signup:', error)
      const typed_error = error as Error

      switch (typed_error.message) {
        case 'Missing param: nom_de_famille':
          typed_error.message = 'Veuillez entrer un nom de famille.'
          break
        case 'This account is already in use.':
          typed_error.message = 'Ce compte est déjà utilisé.'
          break
        case 'Missing param: field_value':
          typed_error.message = 'Veuillez remplir tous les champs.'
          break
        case 'Input does not meet minimum length requirement of 8 characters':
          typed_error.message = 'Le mot de passe doit contenir 8 caractères minimum.'
          break
        case 'Weak password detected. Please use at least 1 numbers.':
          typed_error.message = 'Le mot de passe est trop faible, veuillez entrer au moins un chiffre.'
          break
      }

      throw typed_error
    }
  }

  const env = import.meta.env.VITE_ENV

  let redirect_uri: string
  switch (env) {
    case 'development':
      redirect_uri = import.meta.env.VITE_REDIR_DEV
      break
    case 'staging':
      redirect_uri = import.meta.env.VITE_REDIR_STAGING
      break
    case 'production':
      redirect_uri = import.meta.env.VITE_REDIR_PROD
      break
    default:
      console.error('Unknown environment:', env)
      break
  }

  async function linkedin_init() {
    try {
      const xano_linkedin_init_url = `${import.meta.env.VITE_XANO_API_URL}/api:UpsZVD6L/oauth/linkedin/init`
      const response = await fetch(`${xano_linkedin_init_url}?redirect_uri=${encodeURIComponent(redirect_uri)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error during linkedin init:', error)
    }
  }

  async function linkedin_continue(code: string | null): Promise<void> {
    try {
      const xano_linkedin_continue_url = `${import.meta.env.VITE_XANO_API_URL}/api:UpsZVD6L/oauth/linkedin/continue`
      const response = await fetch(`${xano_linkedin_continue_url}?code=${code}&redirect_uri=${redirect_uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      const data = await response.json()
      token.value = data.authToken
      cookies.set('token', data.authToken)
      console.log('me called from linkedin continue')
      me()
    } catch (error) {
      console.error('Error during linkedin continue:', error)
    }
  }

  function logout(): void {
    updateUser(null)
    token.value = ''
  }

  async function me(): Promise<void> {
    const token_cookie = cookies.get('token')
    // console.log('>> me called', token_cookie.slice(0, 10))
    if (!token_cookie) return
    // console.log('>> me called with token', token_cookie.slice(0, 10))

    try {
      const xano_me_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/me`
      const response = await fetch(xano_me_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token_cookie}`,
        },
      })
      const data: User = await response.json()
      console.log('>> me data', data)
      // console.log('>> me token set', token.value.slice(0, 10))

      updateUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  function updateUser(data: User | null) {
    is_auth.value = data !== null
    bio.value = data?.bio ?? ''
    clubs.value = data?.clubs ?? []
    domaine.value = data?.domaine ?? ''
    email.value = data?.email ?? ''
    family_name.value = data?.family_name ?? ''
    first_name.value = data?.first_name ?? ''
    highlighted_pins.value = data?.highlighted_pins ?? []
    highlighted_users.value = data?.highlighted_users ?? []
    id.value = data?.id ?? null
    incognito.value = data?.incognito ?? false
    is_inboarded.value = data?.is_inboarded ?? false
    job_title.value = data?.job_title ?? ''
    open_to_afterwork.value = data?.open_to_afterwork ?? false
    open_to_lunch.value = data?.open_to_lunch ?? false
    open_to_pause.value = data?.open_to_pause ?? false
    pic_medium.value = data?.pic_medium ?? ''
    pic_small.value = data?.pic_small ?? ''
    pic_xsmall.value = data?.pic_xsmall ?? ''
    role.value = data?.role ?? ''
    type.value = data?.type ?? ''
  }

  return {
    is_auth,
    bio,
    clubs,
    user_coords,
    domaine,
    email,
    family_name,
    first_name,
    highlighted_pins,
    highlighted_users,
    id,
    incognito,
    is_inboarded,
    job_title,
    open_to_afterwork,
    open_to_lunch,
    open_to_pause,
    pic_medium,
    pic_small,
    pic_xsmall,
    role,
    suggestion,
    type,
    token,
    linkedin_init,
    linkedin_continue,
    login,
    signup,
    logout,
    me,
  }
},
)

// if (import.meta.hot)
//   import.meta.hot.accept(acceptHMRUpdate(use_user_store, import.meta.hot))
