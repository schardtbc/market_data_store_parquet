import { MarketSymbol } from "./model"
import {getAllSymbols,iexSymbols2csv, mergeProfile } from "./model.service"
import { ParquetService } from "./parquet.service";

test("getAllSymbols", async() =>{
    const sym = await getAllSymbols();
    const asym = sym.slice(0,4);
    expect(asym).toEqual(expect.arrayContaining([
        expect.objectContaining({
            // date: expect.any(String),
            iexId: expect.any(Number),
            isEnabled: expect.any(Boolean),
            name: expect.any(String),
            symbol: expect.any(String),
            type: expect.any(String),
            })
        ])
    )
});

test("mergeProfile", async() => {
    const sym = await getAllSymbols();
    const asym = sym.slice(37,40);
    const pA =  asym.map( mergeProfile );
    const msym = await Promise.all(pA);
    expect(msym).toEqual(expect.arrayContaining([
        expect.objectContaining({
         //   CEO: expect.any(String),
         //   companyName: expect.any(String),
         //   date: expect.any(String),
         //   description: expect.any(String),
            exchange: expect.any(String),
            iexId: expect.any(Number) ,
            industry: expect.any(String),
            isEnabled: expect.any(Boolean),
            name: expect.any(String) ,
            sector: expect.any(String), 
            symbol: expect.any(String),
            type: expect.any(String),
         //   website: expect.any(String),
        })
    ]));
});

test("write/read MarketSymbolFile", async() => {
    const sym = await getAllSymbols();
    const asym = sym.slice(37,40);
    const pA: Array<Promise<MarketSymbol>> =  asym.map( mergeProfile );
    const msym = await Promise.all(pA);
    const ps = new  ParquetService(); 
    await ps.write(msym,"MarketSymTestFile.parquest")
    const rsym = await ps.read("MarketSymTestFile.parquest");

    expect(rsym).toEqual(expect.arrayContaining([
        expect.objectContaining({
        //    CEO: expect.any(String),
        //    companyName: expect.any(String),
        //    date: expect.any(String),
        //    description: expect.any(String),
            exchange: expect.any(String),
            iexId: expect.any(Number) ,
            industry: expect.any(String),
            isEnabled: expect.any(Boolean),
            name: expect.any(String) ,
            sector: expect.any(String), 
            symbol: expect.any(String),
            type: expect.any(String),
        //    website: expect.any(String),
        })
    ]));
},30000);

