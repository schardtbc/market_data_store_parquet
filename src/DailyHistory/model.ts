
import { DailyStats, OHLCV} from "./interfaces"

import { MarketDataSchema } from "../Common/interfaces"

import { TimeBlock } from "../Common/tools.time"

export class Daily implements TimeBlock, OHLCV, DailyStats{
    public schema: MarketDataSchema = "DAILY"
    public symbol: string = "";
    public sourceName: string = ""
    public timeSeriesInterval: string = 'P01M'
    public ISODate: string = "";
    public epoch: number = 0;
    public dayOfYear = 0;
    public dayOfQuarter = 0;
    public dayPostEarnings = 0;
    public dayPreEarnings = 0;
    public dayOfWeek = 0;
    public dayOfMonth = 0;
    public weekOfYear = 0;
    public weekOfMonth = 0;
    public month = 0;
    public quarter = 0;
    public year = 0;
    public open: number=0;
    public high: number = 0;
    public low: number = 0;
    public close: number = 0;
    public volume: number = 0;
    public volumeRatio: number = 0;
    public lowTS: number = 0;
    public highTS: number = 0;
    public spread: number = 0;
    public candle: number = 0;
    public uwick: number = 0;
    public lwick: number = 0;
    public gap: number = 0;
    public mingain: number = 0;
    public dh: boolean = false;
    public dl: boolean = false;   
    public dc: boolean = false;   
    public dt: boolean = false; 
}