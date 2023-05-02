import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { Club, User } from './xano.d'

const xano_login_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/login`
const xano_signup_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/signup`
const xano_me_url = `${import.meta.env.VITE_XANO_API_URL}/api:EW8LvnML/auth/me`
const xano_linkedin_init_url = `${import.meta.env.VITE_XANO_API_URL}/api:UpsZVD6L/oauth/linkedin/init`
const xano_linkedin_continue_url = `${import.meta.env.VITE_XANO_API_URL}/api:UpsZVD6L/oauth/linkedin/continue`
const cookies = useCookies(['user'])

export const use_user_store = defineStore('user', () => {
  const is_auth = ref(false)
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

  async function login(email: string, password: string): Promise<void> {
    try {
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
      me()
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  async function signup(infos: { name: string; first_name: string; job_title: string; bio: string; email: string; password: string }) {
    const { name, first_name, job_title, bio, email, password } = infos

    try {
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
      me()
    } catch (error) {
      console.error('Error during signup:', error)
      throw error
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
      const response = await fetch(`${xano_linkedin_continue_url}?code=${code}&redirect_uri=${redirect_uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP error ${response.status}`)
      const data = await response.json()
      token.value = data.authToken
      me()
    } catch (error) {
      console.error('Error during linkedin continue:', error)
    }
  }

  function logout(): void {
    is_auth.value = false
    bio.value = ''
    clubs.value = []
    domaine.value = ''
    email.value = ''
    family_name.value = ''
    first_name.value = ''
    highlighted_pins.value = []
    highlighted_users.value = []
    id.value = null
    incognito.value = null
    is_inboarded.value = null
    job_title.value = ''
    open_to_afterwork.value = null
    open_to_lunch.value = null
    open_to_pause.value = null
    pic_medium.value = ''
    pic_small.value = ''
    pic_xsmall.value = ''
    role.value = ''
    type.value = ''
    token.value = ''
  }

  async function me(): Promise<void> {
    try {
      const response = await fetch(xano_me_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      })
      const data: User = await response.json()
      cookies.set('user', data)

      is_auth.value = true
      bio.value = data.bio ?? ''
      clubs.value = data.clubs ?? []
      domaine.value = data.domaine ?? ''
      email.value = data.email ?? ''
      family_name.value = data.family_name ?? ''
      first_name.value = data.first_name ?? ''
      highlighted_pins.value = data.highlighted_pins ?? []
      highlighted_users.value = data.highlighted_users ?? []
      id.value = data.id ?? null
      incognito.value = data.incognito ?? false
      is_inboarded.value = data.is_inboarded ?? false
      job_title.value = data.job_title ?? ''
      open_to_afterwork.value = data.open_to_afterwork ?? false
      open_to_lunch.value = data.open_to_lunch ?? false
      open_to_pause.value = data.open_to_pause ?? false
      pic_medium.value = data.pic_medium ?? ''
      pic_small.value = data.pic_small ?? ''
      pic_xsmall.value = data.pic_xsmall ?? ''
      role.value = data.role ?? ''
      type.value = data.type ?? ''
    } catch (error) {
      console.error(error)
    }
  }
  return {
    is_auth,
    bio,
    clubs,
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
