
import { ElementDefinition, ParquetSchema, ParquetType, SchemaDefinition } from "parquets"

export const IntradaySchema = new ParquetSchema({
    schema: { type: 'UTF8'},
    symbol: { type: 'UTF8' },
    sourceName: { type: 'UTF8' },
    queryTime: { type: 'INT64' },
    timeSeriesInterval: { type:  'UTF8'},
    ISODate: { type: 'UTF8'},
    epoch: { type: 'INT64' },
    open:  { type: 'FLOAT' },
    high: { type: 'FLOAT' },
    low:  { type: 'FLOAT' },
    close:  { type: 'FLOAT' },
    volume:  { type: 'FLOAT' },  
    timeSeries: { 
        repeated: true,
         fields: {
              epoch: { type: 'INT32' },
              price: { type: 'FLOAT' },
              open: { type: 'FLOAT' },
              high:{ type: 'FLOAT' },
              low: { type: 'FLOAT' },
              close: { type: 'FLOAT' },
              volume: { type: 'INT32' },
              trades: { type: 'INT_16' },
              notational: { type: 'INT32' },
            }
        },
});
