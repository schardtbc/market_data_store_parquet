
import {Column,Entity,Index,PrimaryColumn} from "typeorm";

@Entity()
export class IntradayTimeSeries {
  @PrimaryColumn()
  public symbol: string = "";
  @PrimaryColumn()
  public date: string = "";
  @PrimaryColumn()
  public time: string="";
  @Column({type: "int"})
  public minute: number = 0;
  @Column({type: "int"})
  public usMarketSequenceID: number = 0;
  @Column({type: "bigint"})
  public epoch: number = 0;
  @Column({type: "float"})
  public price: number = 0;
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
  @Column({type: "int"})
  public trades: number = 0;
  @Column({type: "float"})
  public notational: number = 0;
}
