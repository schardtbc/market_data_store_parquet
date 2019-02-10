import { ParquetReader, ParquetSchema, ParquetWriter } from 'parquets';

import {MarketSymbolSchema} from "./parquet.schema"

import { getAllSymbols, mergeProfile } from "./model.service"

import { MarketSymbol } from "./model"

import { KVP } from "../Common/interfaces"

export async function iexSymbols(filepath:string,n:number,s:number,e:number) {
    const symArray = await getAllSymbols();
    console.log(new Date() + " start "+n)
    const pArray: Array<Promise<MarketSymbol>> = symArray.slice(s,e).map( (symrec: KVP) => mergeProfile(symrec) );
    const data  = await Promise.all(pArray);
    console.log(new Date() + " merge " + n)
    const writer = await ParquetWriter.openFile(MarketSymbolSchema, filepath+n+".parquet");

    try {
        await Promise.all(data.map( (batch: MarketSymbol, index: number) => writer.appendRow(batch)));
        await writer.close();
    }
    catch {
        await writer.close();
        throw(" MarketSymbol Parquet Service Write Operation Failed");
    }
    console.log(new Date() + " final " + n)
};


console.log(new Date);
// iexSymbols("symbols",1,0,1000);
// iexSymbols("symbols",2,1000,2000);
// iexSymbols("symbols",3,2000,3000);
// iexSymbols("symbols",4,3000,4000);
// iexSymbols("symbols",5,4000,5000);
// iexSymbols("symbols",6,5000,6000);
// iexSymbols("symbols",7,6000,7000);
// iexSymbols("symbols",8,7000,8000);
// iexSymbols("symbols",9,8000,8750);

iexSymbols("symbols",0,0,8750);

