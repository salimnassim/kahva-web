export function IsResponse(object: any): object is Response {
  return 'status' in object
}

export interface Response {
  status: 'ok' | 'error'
}
