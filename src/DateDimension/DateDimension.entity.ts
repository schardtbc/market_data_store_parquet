

import {Column, Entity, Index, PrimaryColumn} from "typeorm";

@Entity()
export class DateDimension {
    @PrimaryColumn()
    @Index({ unique: true })
    public date: string = ""; // YYYY-MM-DD  
    
    @Column()
    @Index({ unique: true })
    public usMarketSequenceID: number=0;

    @Column()
    public tradingDayOfYear: number=0;
    @Column()
    public ISODate: string='';
    @Column()
    public dayOfWeek: number=0;
    @Column()
    public tradingDayOfMonth: number=0;
    @Column()
    public isOptionExpiration: boolean = false;
    @Column()
    public tradingDayOfOptionPeriod: number = 0;
    @Column()
    public tradingDaysTillOptionExp: number=0;
    @Column()
    public dayOfMonth: number=0;
    @Column()
    public tradingDayOfQuarter: number=0;
    @Column()
    public tradingDaysTillEndOfQuarter: number=0;
    @Column()
    public dayOfQuarter: number=0;
    @Column()
    public dayOfYear:  number=0;
    @Column()
    public weekOfMonth: number=0;
    @Column()
    public weekOfYear: number=0;
    @Column()
    public month: number=0;
    @Column()
    public quarter: number=0;
    @Column()
    public year: number=0; 

}