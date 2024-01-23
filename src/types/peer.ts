export interface Peer {
  id: string
  html_id: string
  address: string
  port: number
  client_version: string
  down_rate: number
  down_total: number
  up_rate: number
  up_total: number
  is_encrypted: number
  is_obfuscated: number
  latest_event: string
}

export interface PeerResponse {
  status: 'ok' | 'error'
  peers: Peer[]
}

export function IsPeerResponse(object: any): object is PeerResponse {
  return 'peers' in object
}
