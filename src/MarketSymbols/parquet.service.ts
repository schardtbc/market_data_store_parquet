

import { ParquetReader, ParquetSchema, ParquetWriter } from 'parquets';

import { MarketSymbolSchema } from "./Parquet.schema"

import  { MarketSymbol }  from "./model"


export class ParquetService {
    public schema: ParquetSchema = MarketSymbolSchema;
    

    public async write (databatches: MarketSymbol[], filepath: string ) {
        const writer = await ParquetWriter.openFile(this.schema, filepath);
        try {
            await Promise.all(databatches.map( (batch: MarketSymbol, index: number) => writer.appendRow(batch)));
            await writer.close();
        }
        catch {
            await writer.close();
            throw(" MarketSymbol Parquet Service Write Operation Failed");
        }
    };

    public async read (filepath: string) {
        const reader = await ParquetReader.openFile(filepath);

        const cursor = reader.getCursor();
        const batchArray: MarketSymbol[] = [];
        let batch: MarketSymbol;
        let tmp: any
          while (true) {
            tmp = await cursor.next()
            if (!tmp) {
                break;
            }
            batch = Object.assign(new MarketSymbol(), tmp)
            batchArray.push(batch);
          }
        await reader.close();
        return batchArray;
    };

}
