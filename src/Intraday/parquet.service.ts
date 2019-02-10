

import { ParquetReader, ParquetSchema, ParquetWriter } from 'parquets';

import { IntradaySchema } from "./Parquet.schema"

import { IntradayBatch } from "./model"


export class ParquetService {
    public schema: ParquetSchema
    constructor (schema: ParquetSchema) {
        this.schema = schema;
    }

    public async write (databatches: IntradayBatch[], filepath: string ) {
        const writer = await ParquetWriter.openFile(this.schema, filepath);
        try {
            await Promise.all(databatches.map( async (batch: IntradayBatch, index: number) => await writer.appendRow(batch)));
            await writer.close();
        }
        catch {
            await writer.close();
            throw("Intraday Parquet Service Write Operation Failed");
        }
    };

    public async read (filepath: string) {
        const reader = await ParquetReader.openFile(filepath);

        const cursor = reader.getCursor();
        const batchArray: IntradayBatch[] = [];
        let batch: IntradayBatch;
        let tmp: any
          while (true) {
            tmp = await cursor.next()
            if (!tmp) {
                break;
            }
            batch = Object.assign(new IntradayBatch(), tmp)
            batchArray.push(batch);
          }
        await reader.close();
        return batchArray;
    };

}
