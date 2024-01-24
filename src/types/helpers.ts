import { type Torrent, TorrentStatus } from '@/types/torrent'

export function priority(priority: number): string {
  switch (priority) {
    case 0:
      return 'Off'
    case 1:
      return 'Low'
    case 2:
      return 'Normal'
    case 3:
      return 'High'
    default:
      return '?'
  }
}

export function percent(size_bytes: number, bytes_completed: number): string {
  const percent = Math.round((bytes_completed / size_bytes) * 100)
  if (percent === Infinity) {
    return '∞'
  }
  return `${percent}%`
}

// Converts bytes to a human readable format.
export function human(bytes: number) {
  if (bytes === undefined || bytes === 0) {
    return '0'
  }
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Number((bytes / Math.pow(1024, index)).toFixed(2)) * 1} ${(['B', 'KB', 'MB', 'GB', 'TB'] as const)[index]}`
}

export function status(torrent: Torrent | undefined): TorrentStatus {
  if (torrent === undefined) {
    return TorrentStatus.Invalid
  }
  if (torrent.is_hashing) {
    return TorrentStatus.Hashing
  }
  if (torrent.state === 1 && torrent.is_active && torrent.is_open) {
    return TorrentStatus.Started
  }
  if (torrent.state === 1 && !torrent.is_active && torrent.is_open) {
    return TorrentStatus.Paused
  }
  if (torrent.state === 0 && torrent.is_open) {
    return TorrentStatus.Stopped
  }
  if (torrent.state === 0 && !torrent.is_open) {
    return TorrentStatus.Closed
  }
  return TorrentStatus.Invalid
}
