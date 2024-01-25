import { type TorrentPriority } from '@/types/torrent'

export interface TorrentPriorityRequest {
  priority: TorrentPriority
}

export interface ThrottleRequest {
  type: 'up' | 'down'
  kilobytes: number
}
