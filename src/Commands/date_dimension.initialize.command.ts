

import {marketSequenceGenerator} from '../Common/tools.time'

import {DateDimension} from '../DateDimension/DateDimension.entity'

import {marketCalendar} from "../Common/market.calendar"





function calcTradingDaysTillEndOfQtr(records: DateDimension[]): DateDimension[] {
    const qtrtStartRecords = records.filter( (d) => d.tradingDayOfQuarter ===1 )
    qtrtStartRecords.push(records.slice(-1)[0])
    const sID = qtrtStartRecords .map((d) => d.usMarketSequenceID);
    let lq = sID.map( (v: number, idx0:number) => {
        if (idx0 === 0) {
            return v-1;
        } else {
          return v - sID[idx0-1];
        }
    });
    lq= lq.slice(1);

    let idx = 0;
    let tdoq=0;
    let tdteq=0;
    const result = [];
    for (const obj of records) {
      if (obj) {
         tdoq = obj.tradingDayOfQuarter;
         tdteq = lq[idx]-tdoq;
         if (isNaN(tdteq)) { tdteq =0}
         obj.tradingDaysTillEndOfQuarter = tdteq;
            result.push(obj)
            if (tdteq === 0){
                idx +=1;
            }
        }
    }
    return result
}

function calcTradingDayTillOptExp(records: DateDimension[]): DateDimension[] {
    const startOP = records.filter( (d) => d.isOptionExpiration )
    startOP.push(records.slice(-1)[0])
    const lop = startOP.map( (v) => v.tradingDayOfOptionPeriod );
     let idx1=0;
     let tdoOP=0;
     let tdtoe=0;
    const result = [];
    for (const obj of records) {
         if (obj) {
           tdoOP = obj.tradingDayOfOptionPeriod;
           tdtoe = lop[idx1]-tdoOP;
           obj.tradingDaysTillOptionExp = tdtoe;
           result.push(obj)
           if (obj.isOptionExpiration){
              idx1 +=1;
            }
        }
    }
    return result
}

function genDateDimRecords(calendar: {[k:string]: string[]}): DateDimension[] {
    const gen = marketSequenceGenerator(10000, calendar);
    const records: DateDimension[] =[];
    for (const rec of gen) {
        Object.assign(new DateDimension(),rec)
        records.push(Object.assign(new DateDimension(),rec));
    }
    return calcTradingDayTillOptExp(calcTradingDaysTillEndOfQtr( records ));
}

console.log("starting...")
const marketDates: DateDimension[] = genDateDimRecords(marketCalendar);


console.log("saving to db...")
import { createConnection } from "typeorm";

 createConnection().then(  conn => {
    const repository = conn.getRepository(DateDimension);

    repository
       .save(marketDates)
       .then(post => {
           console.log("finished >DateDimension records have been saved to database: ");
           process.exit(0);
        })
       .catch(error => {
           console.log("failed >Could not save Date Dimension Data to database. Error: ", error)
           process.exit(16);
        });

});
