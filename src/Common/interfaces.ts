export type MarketDataSchema = "SYMBOLS" | "INTRADAY" | "DAILY" | "WEEKLY" | "OPTIONS" | "BALANCESHEET" | "CASHFLOW" | "INCOME" | "PROFILE" | "STATS" | "NEWS" | "TWEETS" | "HISTORY" | "ANNOTATIONS" 

export type monad<I,O> = (v: I) =>  O
export type mutation<I,O> = (x: I) => O
export type transformer<I,O> = (x: I) => O

export type predicate = (x: any) => boolean
export interface KVP  {[k: string]: any}