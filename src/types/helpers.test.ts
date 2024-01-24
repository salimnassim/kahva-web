import { expect, test } from 'vitest'
import { human, percent, status } from '@/types/helpers'
import { type Torrent, TorrentStatus } from '@/types/torrent'

test('x of y bytes as %', () => {
  expect(percent(12345, 1024)).toBe('8%')
})

test('bytes to human conversion', () => {
  expect(human(12345)).toBe('12.06 KB')
})

test('torrent status', () => {
  expect(status({ state: 1, is_active: true, is_open: true } as Torrent)).toBe(
    TorrentStatus.Started
  )
  expect(status({ state: 1, is_active: false, is_open: true } as Torrent)).toBe(
    TorrentStatus.Paused
  )
  expect(status({ state: 0, is_open: false } as Torrent)).toBe(TorrentStatus.Closed)
  expect(status({ state: 0, is_open: true } as Torrent)).toBe(TorrentStatus.Stopped)
  expect(status({ is_hashing: true } as Torrent)).toBe(TorrentStatus.Hashing)
})
