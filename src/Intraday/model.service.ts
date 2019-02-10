

import {IntradayTimeSeries} from "./IntradayTimeSeries.entity"

import * as IEX from "iex-api-wrapper"

import {IEXIntradayAdapter} from "./iex.adapter"


export class ModelService {
    public async query(symbol:string): Promise<IntradayTimeSeries[]> {
        const data  = await IEX.byMinuteToday(symbol);
        if (data === undefined || data.length === 0){
            throw new Error(`Error: IEX Intraday query for ${symbol} returned empty array`);
        }  
        const iex = new IEXIntradayAdapter();         
        iex.symbol = symbol;
        const result = iex.adapt(data)
        return result;
    }
    public async queryForDate(symbol:string, date: string): Promise<IntradayTimeSeries[]> {
        const iexdate = date.replace(/-/g,"")
        const data  = await IEX.byMinuteFor(symbol, iexdate);
        if (data === undefined || data.length === 0){
            throw new Error(`Error: IEX Intraday query for ${symbol} and date ${date} returned empty array`);
        }
        const iex = new IEXIntradayAdapter();   
        iex.symbol = symbol;
        const result = iex.adapt(data)
        return result;
    }
}