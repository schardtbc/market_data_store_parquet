
  interface OHLCV {
    interval: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number; 
 }

 interface Quote {
     price: number;
     ask: number;
     bid: number;
     askSize: number;
     bidSize: number;
 }

 interface CompanyDimensions {
     symbol: string;
     market: string;
     companyName: string;
     id: number;
 }

 interface TimeDimensions {
     epoch: number;
     date: string;
     time: number;
     label: string
 }

 interface Option {
     symbol: string
     expireDate: number
     strike: number
 }

 export interface Adapter<I,O> {
     adapt(item: I): O;
 }

 export interface IEXQuote {
  symbol: string;
  companyName: string;
  primaryExchange: string;
  sector: string;
  calculationPrice: string;
  open: number
  openTime: number
  close: number
  closeTime: number
  high: number
  low: number
  latestPrice: number
  latestSource: string;
  latestTime: string;
  latestUpdate: number
  latestVolume: number
  iexRealtimePrice: number
  iexRealtimeSize: number
  iexLastUpdated: number
  delayedPrice: number
  delayedPriceTime: number
  extendedPrice: number
  extendedChange: number
  extendedChangePercent: number
  extendedPriceTime: number
  previousClose: number
  change: number
  changePercent: number
  iexMarketPercent: number
  iexVolume: number
  avgTotalVolume: number
  iexBidPrice: number
  iexBidSize: number
  iexAskPrice: number
  iexAskSize: number
  marketCap: number
  peRatio: number
  week52High: number
  week52Low: number
  ytdChange: number
 }

 export interface IEXIntraday {
  date: string;
  minute: string;
  label: string;
  high: number;
  low: number;
  average: number;
  volume: number;
  notional: number;
  numberOfTrades: number;
  marketHigh: number;
  marketLow: number;
  marketAverage: number;
  marketVolume: number;
  marketNotional: number;
  marketNumberOfTrades: number;
  open: number;
  close: number;
  marketOpen: number;
  marketClose: number;
  changeOverTime: number;
  marketChangeOverTime: number;
 }

 export interface IEXHistory {
  date:string;
  open: number;
  high:  number;
  low:  number;
  close:  number;
  volume:  number;
  unadjustedClose:  number;
  unadjustedVolume:  number;
  change:  number;
  changePercent:  number;
  vwap:  number;
  label: string;
  changeOverTime:  number;
 }

export interface IEXShortInterest {
  SettlementDate: string;
  SecurityName: string;
  CurrentShortInterest: number;
  PreviousShortInterest:number;
  PercentChange: number;
  AverageDailyVolume: number;
  DaystoCover: number;
  StockAdjustmentFlag: string;
  RevisionFlag: string;
  SymbolinINETSymbology: string;
  SymbolinCQSSymbology: string;
  SymbolinCMSSymbology: string;
  NewIssueFlag: string;
  CompanyName: string;
 }
 
export interface IEXFinancials {
  reportDate: string;
  costOfRevenue: number;
  operatingRevenue: number;
  totalRevenue: number;
  operatingIncome: number;
  netIncome: number;
  researchAndDevelopment: number;
  operatingExpense: number;
  currentAssets: number;
  totalAssets: number;
  totalLiabilities: number;
  currentCash: number;
  currentDebt: number;
  totalCash: number;
  totalDebt: number;
  shareholderEquity: number;
  cashChange: number;
  cashFlow: number;
  operatingGainsLosses: number;
 }