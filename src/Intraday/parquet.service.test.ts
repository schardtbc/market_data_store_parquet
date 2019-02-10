
import { IntradayBatch } from "./model"

import { ParquetService } from "./parquet.service"

import { IntradayTimeSeries } from "./IntradayTimeSeries.entity";

import { IntradaySchema } from "./parquet.schema"

// generate synetic data 


  const data = new IntradayBatch()

  data.symbol = "AAPL";
  data.sourceName = "IEX";
  data.queryTime = 123456789;
  data.ISODate = '2019-01-23T00:00:00Z'
  data.close = 153.00
  data.timeSeries[0] = new IntradayTimeSeries()
  data.timeSeries[0].epoch = 157643200;
  data.timeSeries[0].price = 154.0;
  data.timeSeries[0].volume = 3240;
  data.timeSeries[1] = new IntradayTimeSeries()
  data.timeSeries[1].epoch = 157643201;
  data.timeSeries[1].price = 154.1;
  data.timeSeries[1].volume = 3241;
  data.timeSeries[2] = new IntradayTimeSeries()
  data.timeSeries[2].epoch = 157643202;
  data.timeSeries[2].price = 154.2;
  data.timeSeries[2].volume = 3242;
  
  const batch: IntradayBatch[] = [];
  
  batch[0] = data;
  
  const service = new ParquetService(IntradaySchema);



test("write/read a Intraday Time Series Model to/from a parquet file", async () => {
  await service.write(batch, "parquet_test.parquet");
  const res = await service.read("parquet_test.parquet");
  expect(res).toEqual(expect.arrayContaining([
    expect.objectContaining({
       symbol: "AAPL",
       sourceName: "IEX",
       queryTime: 123456789,
       timeSeries: expect.arrayContaining([
         expect.objectContaining({
           epoch: expect.any(Number)
         }) 
        ])
    })
  ]))
});

