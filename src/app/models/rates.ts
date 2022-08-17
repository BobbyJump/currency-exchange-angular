export interface IRates {
  motd: {
    msg: string
    url: string
  }
  success: boolean
  base: string
  date: string
  rates: {
    vallet: number
  }
}
