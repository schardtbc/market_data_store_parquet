
import * as IEX from "iex-api-wrapper"

import { KVP } from "../Common/interfaces"

import { kvp2str} from "../Common/tools"

import { MarketSymbol } from "./model"

import { ParquetService } from "./parquet.service";


export async function getAllSymbols() {
    const res: KVP[] = await IEX.allSymbols();
    return res.map( (rec: KVP) => {rec.iexId = parseInt(rec.iexId,10); return rec;});
}

export async function mergeProfile(symrec: KVP) {
    let profile: KVP ;
    delete symrec.date;
    try {

      profile = await IEX.profile(symrec.symbol);
      //console.log(profile)
      delete profile.tags
      delete profile.issueType
      delete profile.description
      delete profile.CEO;
      delete profile.website;
      delete profile.companyName;
    }
    catch {
      profile = {};
    }
    const ms = new MarketSymbol()
    Object.assign(ms,symrec);
    if (profile) {
        Object.assign(ms,profile);
    }
    //console.log(ms)
    return ms
}

export function writeSymbolFile(data: MarketSymbol[]) {
    try {
    const ps = new ParquetService();
    ps.write(data,"PROFILE.LATEST.parquet");
    }
    catch {
        throw ("failed");
    }

}

import {  createWriteStream } from 'fs'

export function writeSymbol2csvFile(data: MarketSymbol[],n:number) {
    const ws = createWriteStream(`market_symbol_${n}.csv`);
    const str = data.reduce ( (acc, y: KVP, idx) => 
           acc+ kvp2str(y)
     ,"");
    ws.write(str);
    ws.close()
}

export async function iexSymbols() {
    const symArray = await getAllSymbols();
    const pArray: Array<Promise<MarketSymbol>> = symArray.map( async (symrec: KVP) => await mergeProfile(symrec) );
    const data  = await Promise.all(pArray);
    writeSymbolFile(data);
}

export async function iexSymbols2csv(n:number, s:number, e:number) {
    const symArray = await getAllSymbols();
    const pArray: Array<Promise<MarketSymbol>> = symArray.slice(s,e).map( async (symrec: KVP) => await mergeProfile(symrec) );
    const data  = await Promise.all(pArray);
    writeSymbol2csvFile(data,n);
}




