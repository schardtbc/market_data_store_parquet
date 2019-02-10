
import { Adapter } from "../interfaces";

import { IEXIntraday } from "../interfaces"

import { IntradayTimeSeries } from "./IntradayTimeSeries.entity"

import { KVP } from "../Common/interfaces"

import {  addfield, mutate_as, pipe, renames, selects } from "../Common/tools"
import { IsNull } from "typeorm";
import { isNullOrUndefined } from "util";


const reformDate = ( { date }: KVP): string =>
{
    const result =  date.substr(0,4) + "-"+ date.substr(4,2) + "-" +
    date.substr(6,2)  
    return result 
}

const toepoch = ({date, minute}: KVP): number => {
    const dts =   date  +" "+ minute + " GMT-0500";
    const nyt = new Date(dts);
    return nyt.valueOf()
}

const formatDate = mutate_as("date", reformDate)
const computeEpoch = mutate_as("epoch",toepoch);

export  class IEXIntradayAdapter implements Adapter<any[], IntradayTimeSeries[]> {
    public symbol = "";
    private prep = 
        pipe(
          addfield('symbol', ""),
          addfield('usMarketSequenceID', 0),
          formatDate,
          computeEpoch,
          renames(
            ["minute","marketAverage","marketOpen","marketHigh","marketLow","marketClose","marketVolume","marketNumberOfTrades","marketNotional"]
            ,["time","price",             "open",      "high",      "low",      "close",      "volume",              "trades",      "notational"]
          ),
          addfield('minute', 0 ),
          selects(["symbol","date","time","usMarketSequenceID","minute","epoch","price","open","high","low","close","volume","trades","notational"])
        )

    public adapt( objIn: IEXIntraday[]):IntradayTimeSeries[] {
        const tmp0 = objIn.filter( v => !(v.high === 0))
        const tmp1:IntradayTimeSeries[] = tmp0.map(this.prep);
        const starttime = tmp1[0].epoch;
        const tmp2 =tmp1.map( (v) => { v.symbol = this.symbol; v.minute = (v.epoch - starttime)/60000; return v});
        const result = tmp2.filter( v => !isNullOrUndefined(v.open));
        return result;
    }
}

