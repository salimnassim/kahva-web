import { expect, test } from 'vitest'
import { human, percent } from '@/types/helpers'

test('x of y bytes as %', () => {
  expect(percent(12345, 1024)).toBe('8%')
})

test('bytes to human conversion', () => {
  expect(human(12345)).toBe('12.06 KB')
})
