import { type Indexable } from '@/stores/store'
import { type File } from '@/types/file'
import { type Peer } from '@/types/peer'
import { type Tracker } from '@/types/tracker'

export enum TorrentPriority {
  Off = 0,
  Low = 1,
  Normal = 2,
  High = 3
}

export enum TorrentStatus {
  Invalid = 'Invalid',
  Closed = 'Closed',
  Paused = 'Paused',
  Stopped = 'Stopped',
  Started = 'Started',
  Hashing = 'Hashing'
}

export interface TorrentLabel {
  name: string
}

export interface Torrent extends Indexable {
  hash: string
  name: string
  size_bytes: number
  completed_bytes: number
  upload_rate: number
  upload_total: number
  download_rate: number
  download_total: number
  message: string
  is_active: boolean
  is_open: boolean
  is_hashing: boolean
  leechers: number
  seeders: number
  state: number
  state_changed: number
  state_counter: number
  priority: TorrentPriority

  files: File[] | undefined
  peers: Peer[] | undefined
  trackers: Tracker[] | undefined
}

export interface ViewResponse {
  status: 'ok' | 'error'
  torrents: Torrent[]
}

export function IsViewResponse(object: any): object is ViewResponse {
  return 'torrents' in object
}
