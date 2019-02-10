


export interface OHLCV {
    open: number
    high: number
    low: number
    close: number
    volume: number 
}

export interface DailyStats {
    lowTS: number
    highTS: number
    spread: number
    candle: number
    uwick: number
    lwick: number
    volumeRatio: number
    gap: number
    mingain: number
    dh: boolean 
    dl: boolean
    dc: boolean
    dt: boolean
}