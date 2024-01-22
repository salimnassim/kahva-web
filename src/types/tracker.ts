export interface Tracker {
  tracker_id: string
  is_busy: number
  is_open: number
  type: number
  url: string
  activity_time_last: number
  activity_time_next: number
  failed_counter: number
  failed_time_last: number
  failed_time_next: number
}

export interface TrackerResponse {
  status: 'ok' | 'error'
  trackers: Tracker[]
}

export function IsTrackerResponse(object: any): object is TrackerResponse {
  return 'trackers' in object
}
