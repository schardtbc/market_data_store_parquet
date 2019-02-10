

export interface DailyHistory {
    symbol: string
    date: string // yyyy-mm-dd  (America/New_York)
    epoch: number // UTC time ms resulution
    usMarketSequenceID: number
    sourceName: string  // IEX
    dayPostEarnings: number
    dayPreEarnings: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    volumeRatio: number
    lemav: number
    lowTS: number   // time in s after open for low of the day
    highTS: number  // time in s after open for high of the day
    spread: number // high-low
    candle: number // floor(close-open)/spread
    uwick: number // floor(high - max(open,close))/spread
    lwick: number // floor(min(open,close) - low)/
    gap: number
    ogain: number
    hgain: number
    lgain: number
    cgain: number
    do: boolean
    dh: boolean
    dl: boolean
    dc: boolean
    dt: boolean
    froic: number
    sroic: number
    semac: number
    femac: number
    iemac: number
    lemac: number
    froil: number
    sroil: number
    semal: number
    femal: number
    iemal: number
    lemal: number
    srsi: number
    frsi: number
    irsi: number
    lrsi: number
    roi005: number
    roi010: number
    roi015: number
    roi020: number
    roi040: number
    roi060: number
    roi120: number
    roi180: number
    roi240: number
}