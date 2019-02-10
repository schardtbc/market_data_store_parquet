


import { IntradayTimeSeries } from "./IntradayTimeSeries.entity"

import { MarketDataSchema } from "../Common/interfaces";

type DayTypes = "UP" | "DOWN" | "INSIDE" | "OUTSIDE" | "GAPUP" | "GAPDOWN"

export class IntradayBatch {
    public schema: MarketDataSchema = "INTRADAY"
    public symbol: string = "";
    public sourceName: string = ""
    public queryTime  = 0;
    public timeSeriesInterval: string = 'P01M'
    public ISODate: string = "";
    public epoch  = 0;
    public open =0;
    public high  = 0;
    public low  = 0;
    public close  = 0;
    public volume  = 0;  
    public timeSeries: IntradayTimeSeries[] = [];
    constructor(sym?: string,d?: Date, data?: IntradayTimeSeries[] ) {
        if (sym) {
           this.symbol = sym;
        }
        if (d) {
        this.queryTime = d.valueOf();
        }
        if (data) {
           this.timeSeries = data;
        }
    }
}