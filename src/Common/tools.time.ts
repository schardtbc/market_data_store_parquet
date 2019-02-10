import { AnyTxtRecord } from "dns";

import { DateDimension } from "../DateDimension/DateDimension.entity"

export interface TimeBlock {
    epoch: number
    ISODate: string,
    dayOfYear: number
    dayOfQuarter: number
    dayOfWeek: number
    dayOfMonth: number
    weekOfYear: number
    weekOfMonth: number
    month: number
    quarter: number
    year: number
}


export function* marketSequenceGenerator(start: number, calendar: any): IterableIterator<any> {
    const daysInMonthCommon = [31,28,31,30,31,30,31,31,30,31,30,31];
    const daysInMonthLeapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
    let daysInMonth: number[];
    const startDay = 2; // Tuesday
    let marketClosedDates: Set<string>;
    let day=1;
    let mo=1;
    let mi = 0;
    let thisDay = "";
    let dayOfWk = 2;
    let date: Date
    let dayID = 1
    let tdayMo =1
    let tdayOfQ = 1;
    let seqID = start
    let result: any 
    let yr =1980;
    let cal: any;
    let wkOfFri: number = 0;
    let nextDay: string;
    let isOptExp = false;
    let nextDate: Date;
    let nextDateStr: string
    let tdOfOP: number = 1;
    // console.log(typeof calendar)
    for (const key of Object.keys(calendar)) {
        if (key) {
        cal = calendar[key];
        // console.log(cal)
    
        yr = parseInt(key,10);
        if (isLeapYear(yr)){
            daysInMonth = daysInMonthLeapYear;
        } else {
            daysInMonth = daysInMonthCommon;
        }
        marketClosedDates = new Set(cal);
        dayID = 1;
        tdayMo =1;
        tdayOfQ = 1;
        mo=1;
        mi=0;
    while (true){
        isOptExp =false;
        thisDay = key +'-'+ mo +'-'+ day;
        date = new Date(thisDay + ' EST');
        if (dayOfWk === 4 && wkOfFri === 2) {
            nextDay = key +'-'+ mo +'-' + (day+1);
            nextDate = new Date(nextDay);
            nextDateStr = nextDate.toISOString().substr(0,10);
            if (marketClosedDates.has(nextDateStr)) {
                isOptExp = true;
            }
        }
        try {
            thisDay = date.toISOString().substr(0,10);
        }
        catch {
            console.log(thisDay);
            throw( "invalid date");
        }
        if (dayOfWk === 5) {
            wkOfFri +=1;
            if (wkOfFri === 3) {
                isOptExp = true
            }
        }
        if ( dayOfWk >0 && dayOfWk <6 && !marketClosedDates.has(thisDay)) {
           // console.log(thisDay);
           result = dateDimension({ date: thisDay, marketSeqID: seqID, marketDayOfYear: dayID, marketDayOfQtr: tdayOfQ, marketDayOfMonth: tdayMo, isOptionExpiration: isOptExp, tradingDayOfOptionPeriod: tdOfOP });
           if (isOptExp){
               tdOfOP = 1;
           } else {
               tdOfOP +=1;
           }
           seqID +=1
           dayID+=1
           tdayOfQ+=1
           tdayMo+=1
           yield result
        }
        day += 1;
        dayOfWk +=1;
        if (dayOfWk > 6) {
            dayOfWk = 0
        }
        if (day>daysInMonth[mi]){
            day=1;
            mi+=1;
            mo+=1;
            wkOfFri = 0;
            tdayMo=1
            if (mo === 4 || mo === 7 || mo ===10 || mo===13){
                tdayOfQ = 1;
            }
            if (mo===13){
               break;
            }
        }
    }
    }
}
}

const timeZone = 'America/New_York'

const options = {year: 'numeric', month:'2-digit', day:'2-digit',hour12:false,
timeZone, timeZoneName: 'short', hour: '2-digit', minute:'2-digit',second:'2-digit',
pattern: "{year}-{month}-{day} {hour}:{minute}:{second} {timeZoneName}"}

function nytime(epoch: number): string {
    const ny = new Intl.DateTimeFormat('default',options).format(new Date(epoch));
    // 01/31/2019, 19:06:30 EST
    return ny

}

function isLeapYear(year: number) {
    if (year % 4 > 0) {
        return false
    }
    if (year % 100 > 0) {
        return true;
    }
    if (year % 400 >0) {
        return false
    }
    return true;
}


export function dayofweek(y: number, m: number, d:number)	/* 1 <= m <= 12,  y > 1752 (in the U.K.) */
{   
    const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    y -= (m < 3) ? 1: 0;
    return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + t[m-1] + d) % 7;
}

function dayOfWeek(epoch: number):number {
    const ny = nyDateTime(epoch);
    return dayofweek(ny.year,ny.month,ny.day)
}

function dayOfYear(epoch: number): number {
    const date:Date =  new Date(epoch);
    const ny = nytime(epoch);
    const startYear = new Date( ny.substr(6,4) + "-01-01 GMT-0500");
    return 1+Math.floor((epoch - startYear.valueOf())/(1000*60*60*24));
}

function nyDateTime(epoch: number) {
    const ny = nytime(epoch);
    return {
       nys: ny,
       year: parseInt(ny.substr(6,4),10),
       day: parseInt(ny.substr(3,2),10),
       month: parseInt(ny.substr(0,2),10),
       hour: parseInt(ny.substr(11,2),10),
       minute: parseInt(ny.substr(14,2),10),
       seconds: parseInt(ny.substr(117,2),10),
       milliseconds: epoch % 1000,
       timeZone: ny.substr(20,3)
    }
}

function weekOfYear(epoch: number): number {
    const date:Date =  new Date(epoch)
    const ny = nyDateTime(epoch);
    const startYear = new Date( ny.nys.substr(6,4)+ "-01-01 GMT-0500");
    const offset = dayofweek(ny.year,1,1)*24*60*60*1000;
    return 1+Math.floor((epoch - startYear.valueOf()+ offset)/(1000*60*60*24*7));
}

function weekOfMonth(epoch: number): number {
    const date:Date =  new Date(epoch)
    const ny = nyDateTime(epoch);
    const dsom = dayofweek(ny.year,ny.month,1)
       return 1+Math.floor((ny.day+dsom)/7);
}

function dayOfQuarter(epoch: number): number {
    const date:Date =  new Date(epoch);
    const ny = nyDateTime(epoch);
    const yr = ny.year.toString();
    const startQ1 = new Date( yr + "-01-01 GMT-0500");
    const startQ2 = new Date( yr + "-04-01 GMT-0400");
    const startQ3 = new Date( yr + "-07-01 GMT-0400");
    const startQ4 = new Date( yr + "-10-01 GMT-0400");   
    if (epoch < startQ2.valueOf()) {
        return 1+Math.floor((epoch - startQ1.valueOf())/(1000*60*60*24));
    }
    if (epoch < startQ3.valueOf()) {
        return 1+Math.floor((epoch - startQ2.valueOf())/(1000*60*60*24));
    }
    if (epoch < startQ4.valueOf()) {
        return 1+Math.floor((epoch - startQ3.valueOf())/(1000*60*60*24));
    }
    return 1+Math.floor((epoch - startQ4.valueOf())/(1000*60*60*24));
       
}

function month(epoch:number): number {
    const shift = -5*60*60*1000;
    const nyEpoch = epoch+shift;
    const sdate = new Date(nyEpoch);
    return parseInt(sdate.toISOString().substr(6,2),10)
}
function quarter(epoch: number): number {
    const date =  new Date(epoch);
    const ny = nyDateTime(epoch);
    const yr = ny.year.toString();
    const startQ1 = new Date( yr + "-01-01 GMT-0500");
    const startQ2 = new Date( yr + "-04-01 GMT-0400");
    const startQ3 = new Date( yr + "-07-01 GMT-0400");
    const startQ4 = new Date( yr + "-10-01 GMT-0400");    
    if (epoch < startQ2.valueOf()) {
        return 1
    }
    if (epoch < startQ3.valueOf()) {
        return 2
    }
    if (epoch < startQ4.valueOf()) {
        return 3
    }
    return 4
       
}

function fullyear(epoch :number): number {
    const ny=nyDateTime(epoch);
    return ny.year;
}


export function timeBlock(epoch: number): TimeBlock {
    const ny = nyDateTime(epoch)
    const date = new Date(epoch)
    return {
        epoch,
        ISODate: date.toISOString(),
        dayOfMonth: ny.day,
        month: ny.month,
        year: ny.year,
        dayOfWeek: dayOfWeek(epoch),
        dayOfYear: dayOfYear(epoch),
        dayOfQuarter: dayOfQuarter(epoch),
        weekOfMonth: weekOfMonth(epoch),        
        weekOfYear: weekOfYear(epoch),
        quarter: quarter(epoch),
    }
}

export function dateDimension(ds: any): DateDimension {
    const nydate = new Date(ds.date+ " 09:30:00.000 EST")
    const epoch = nydate.valueOf();
    const ny = nyDateTime(epoch)
    return {
        date: ds.date, // YYYY-MM-DD  
        usMarketSequenceID: ds.marketSeqID,
        tradingDayOfYear: ds.marketDayOfYear,
        ISODate: nydate.toISOString(),
        dayOfWeek:  dayOfWeek(epoch),
        tradingDayOfMonth: ds.marketDayOfMonth,
        dayOfMonth: ny.day,
        isOptionExpiration: ds.isOptionExpiration,
        tradingDayOfOptionPeriod: ds.tradingDayOfOptionPeriod,
        tradingDaysTillOptionExp: 0,
        tradingDayOfQuarter: ds.marketDayOfQtr,
        tradingDaysTillEndOfQuarter: 0,
        dayOfQuarter: dayOfQuarter(epoch),
        dayOfYear:  dayOfYear(epoch),
        weekOfMonth: weekOfMonth(epoch),      
        weekOfYear: weekOfYear(epoch),
        month: ny.month,
        quarter: quarter(epoch),
        year: ny.year,
    }
}