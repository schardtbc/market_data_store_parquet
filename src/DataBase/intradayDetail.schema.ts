export interface IntradayDetail {
    symbol: string
    date: string
    second: number // delta from open 9:30 am ny-ny
    epoch: number
    price: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    trades: number
    notational: number
    type: string
  }