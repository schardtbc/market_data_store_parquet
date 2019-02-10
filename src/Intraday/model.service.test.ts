import { ModelService } from "./model.service"

test("Intraday IEX data download", async() => {
    const service = new ModelService()
    const result = await service.query("AAPL");
    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
           symbol: expect.any(String),
           date: expect.any(String),
           time: expect.any(String),
           usMarketSequenceID: expect.any(Number),
           minute: expect.any(Number),
           epoch: expect.any(Number),
           price: expect.any(Number),
           open: expect.any(Number),
           high: expect.any(Number),
           low: expect.any(Number),
           close: expect.any(Number),
           volume: expect.any(Number),
           trades: expect.any(Number),
           notational: expect.any(Number),
        }
        )
    ])
    );
})

test("Intraday IEX data download", async() => {
    const service = new ModelService()
    const result = await service.queryForDate("AAPL","2019-02-06");
    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
           symbol: expect.any(String),
           date: expect.any(String),
           time: expect.any(String),
           usMarketSequenceID: expect.any(Number),
           minute: expect.any(Number),
           epoch: expect.any(Number),
           price: expect.any(Number),
           open: expect.any(Number),
           high: expect.any(Number),
           low: expect.any(Number),
           close: expect.any(Number),
           volume: expect.any(Number),
           trades: expect.any(Number),
           notational: expect.any(Number),
        }
        )
    ])
    );
})

test("Intraday IEX data download throw error", async() => {
    const service = new ModelService()
    async function queryIEX() {
        const result = await service.queryForDate("AAPL","2019-01-06");
    }
    await expect(queryIEX()).rejects.toThrowError('Error: IEX Intraday')
})

