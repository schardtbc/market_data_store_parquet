
import {Column, Entity, Index , PrimaryColumn} from "typeorm"

import { DailyHistory } from "../DataBase/dailyhistory.schema"

@Entity()
export class Daily implements DailyHistory {
    @PrimaryColumn()
    public symbol: string = "";
    @PrimaryColumn()
    public date: string = ""; // yyyy-mm-dd  (America/New_York)
    @Column()
    @Index()
    public usMarketSequenceID: number = 0;

    @Column()
    public epoch: number = 0; // UTC time ms resulution
    @Column()
    public sourceName: string = "";  // IEX
    @Column()
    public dayPostEarnings: number = 0;
    @Column()
    public dayPreEarnings: number = 0;
    @Column({type: "float"})
    public open: number = 0;
    @Column({type: "float"})
    public high: number = 0;
    @Column({type: "float"})
    public low: number = 0;
    @Column({type: "float"})
    public close: number = 0;
    @Column({type: "int"})
    public volume: number = 0;
    @Column({type: "float"})
    public volumeRatio: number = 0;
    @Column({type: "int"})
    public lemav: number = 0;   // long exponential moving average of volume
    @Column({type: "int"})
    public lowTS: number = 0;   // time in s after open for low of the day
    @Column({type: "int"})
    public highTS: number = 0;  // time in s after open for high of the day
    @Column({type: "float"})
    public spread: number = 0; // high-low
    @Column({type: "float"})
    public candle: number = 0; // floor(close-open)/spread
    @Column({type: "float"})
    public uwick: number = 0; // floor(high - max(open,close))/spread
    @Column({type: "float"})
    public lwick: number = 0; // floor(min(open,close) - low)/
    @Column({type: "float"})
    public gap: number = 0;
    @Column({type: "float"})
    public ogain: number = 0;
    @Column({type: "float"})
    public hgain: number = 0;
    @Column({type: "float"})
    public lgain: number = 0;
    @Column({type: "float"})
    public cgain: number = 0;
    @Column({type: "boolean"})
    public do: boolean = false;
    @Column({type: "boolean"})
    public dh: boolean = false;
    @Column({type: "boolean"})
    public dl: boolean = false;
    @Column({type: "boolean"})
    public dc: boolean = false;
    @Column({type: "boolean"})
    public dt: boolean = false;
    @Column({type: "float"})
    public froic: number = 0;  // fast  ema of roi measured using closing price
    @Column({type: "float"})
    public sroic: number = 0;  // slow  ema of roi measured using closing price
    @Column({type: "float"})
    public semac: number = 0;
    @Column({type: "float"})
    public femac: number = 0;
    @Column({type: "float"})
    public iemac: number = 0;
    @Column({type: "float"})
    public lemac: number = 0;
    @Column({type: "float"})
    public froil: number = 0;
    @Column({type: "float"})
    public sroil: number = 0;
    @Column({type: "float"})
    public semal: number = 0;
    @Column({type: "float"})
    public femal: number = 0;
    @Column({type: "float"})
    public iemal: number = 0;
    @Column({type: "float"})
    public lemal: number = 0;
    @Column({type: "float"})
    public srsi: number = 0;
    @Column({type: "float"})
    public frsi: number = 0;
    @Column({type: "float"})
    public irsi: number = 0;
    @Column({type: "float"})
    public lrsi: number = 0;
    @Column({type: "float"})
    public roi005: number = 0; // 1 wk
    @Column({type: "float"})
    public roi010: number = 0; // 2 wk
    @Column({type: "float"})
    public roi015: number = 0; // 3 wk
    @Column({type: "float"})
    public roi020: number = 0; // mo
    @Column({type: "float"})
    public roi040: number = 0; // 2 mo
    @Column({type: "float"})
    public roi060: number = 0; // qtr
    @Column({type: "float"})
    public roi120: number = 0; // 2 qtr
    @Column({type: "float"})
    public roi180: number = 0; // 3 qtr
    @Column({type: "float"})
    public roi240: number = 0; // yr
}
