import { describe, expect, it } from 'vitest'
import { ref as deepRef } from 'vue'
import { useAbs } from './index'

describe('useAbs', () => {
  it('should be defined', () => {
    expect(useAbs).toBeDefined()
  })

  it('this should work', () => {
    const original = deepRef(-1)
    const abs = useAbs(original)

    expect(abs.value).toBe(1)

    original.value = -23
    expect(abs.value).toBe(23)

    original.value = 10
    expect(abs.value).toBe(10)

    original.value = 0
    expect(abs.value).toBe(0)
  })

  it('getter', () => {
    const original = deepRef(-1)
    const abs = useAbs(() => original.value)

    expect(abs.value).toBe(1)

    original.value = -23
    expect(abs.value).toBe(23)

    original.value = 10
    expect(abs.value).toBe(10)

    original.value = 0
    expect(abs.value).toBe(0)
  })
})
