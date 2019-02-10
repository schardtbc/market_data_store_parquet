

import Service from "./model.service"

import { kvp2str } from "../Common/tools";

import { createWriteStream } from "fs"
import { WriteStream } from "tty";


async function exec( symbol: string ) {
    const prices = await Service.query(symbol);
    const flt = prices.filter( (p) => p.time !== 0)
    flt.sort((a, b) =>{
        if (a.symbol<b.symbol) { // sort string ascending
            return -1 }
        if (a.symbol > b.symbol) {
            return 1
        }
        return 0 // default return value (no sorting)
    })
    const csv = flt.map( (p) => kvp2str(p));

    const ws = createWriteStream("prices.csv");
    ws.write(csv.join(""));
    ws.close();
    console.log(new Date())
}

console.log(new Date())
exec("");