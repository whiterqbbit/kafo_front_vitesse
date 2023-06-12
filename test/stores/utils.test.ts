import { beforeAll, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { use_utils_store } from '@/stores/utils'

describe('utils store', () => {
  let utils_store: ReturnType<typeof use_utils_store>

  beforeAll(async () => {
    setActivePinia(createPinia())
    utils_store = use_utils_store()
  })

  it('test_generate_id_returns_valid_uuid', () => {
    const uuid = utils_store.generate_id()
    const uuid2 = utils_store.generate_id()
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(regex.test(uuid)).toBe(true)
    expect(uuid.length).toBe(36)
    expect(uuid).not.toBe(uuid2)
  })
})
