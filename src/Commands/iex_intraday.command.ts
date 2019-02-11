
import { ModelService } from "../Intraday/model.service"

import { createConnection } from "typeorm";

import { IntradayTimeSeries } from "../Intraday/IntradayTimeSeries.entity";

import { getAllSymbols } from "../MarketSymbols/model.service"
const dateList = [
'2018-12-26',
'2018-12-27',
'2018-12-28',
'2018-12-31',
'2019-01-02',
'2019-01-03',
'2019-01-04',
'2019-01-07',
'2019-01-08',
'2019-01-09',
'2019-01-10',
'2019-01-11',
'2019-01-14',
'2019-01-15',
'2019-01-16',
'2019-01-17',
'2019-01-18',
'2019-01-22',
'2019-01-23',
'2019-01-24',
'2019-01-25',
'2019-01-28',
'2019-01-29',
'2019-01-30',
'2019-01-31',
'2019-02-01',
'2019-02-04',
'2019-02-05',
'2019-02-06',
'2019-02-07',
'2019-02-08',
];

// const symbolList = ["AAPL","AMZN","WDC"];
// const dateList = [
// '2019-02-01',
// '2019-02-04',
// '2019-02-05',
// '2019-02-06',
// '2019-02-07',
// '2019-02-08',
// ];

async function IEXIntraday( dates: string[]) {
    console.log("Starting...")
    const st = (new Date()).valueOf();
    const allSymbols = await getAllSymbols();
    const symbolList = allSymbols.map( v => v.symbol )
    const conn = await createConnection();
    const repository = conn.getRepository(IntradayTimeSeries);

    const service = new ModelService();
    const pArray = [];
    for (const sym of symbolList) {
        pArray.length = 0;
        for (const date of dates){

            pArray.push(service.queryForDate(sym,date).then( intradayData => {
                if (intradayData !== undefined && intradayData.length >0) {
                    return repository
                .save(intradayData)
                .then(post => {
                    const dt = (new Date()).valueOf() - st;
                    console.log(dt,` saved ... ${sym} ${date}`)
                    return dt;
                    //console.log(`Success Intraday data for ${sym} ${date} saved to database: `);
                 })
                .catch(error => {
                    const dt = (new Date()).valueOf() - st;
                    console.log(dt,` ......failed  ${sym} ${date}`)
                    return dt;
                  //  console.log(`failed: Could not save Intraday data for ${sym} ${date} to database. Error: `)
                 });
                 
                } else {
                    return 0
                }             
            }).catch( error => {
                console.log((new Date()).valueOf() - st)
                console.log(`failed: Could not save Intraday data for ${sym} ${date} to database. Error: `)
            }))
        }
        await Promise.all(pArray).catch( error => console.log("pa fail")) ;
        console.log(`date loop complete for ${sym}`);
    } 
    console.log('Done...')
    return 1
}

async function command() {
    await IEXIntraday( dateList );
    //process.exit(0);
}

command();