

import { ElementDefinition, ParquetSchema, ParquetType, SchemaDefinition } from "parquets"


export const MarketSymbolSchema = new ParquetSchema({
    symbol: { type: "UTF8" },
    name: { type: "UTF8" , optional: true, compression: "SNAPPY"},
    isEnabled: { type: "BOOLEAN" , optional: true},
    type: { type: "UTF8" , optional: true},
    iexId: { type: "INT32" , optional: true},
    exchange: { type: "UTF8" , optional: true, compression: "SNAPPY"},
    sector: { type: "UTF8" , optional: true, compression: "SNAPPY"},
    industry: { type: "UTF8" , optional: true, compression: "SNAPPY"},
});