
 interface  KVP  { [K: string]: any }

export  class MarketSymbol implements KVP {
    public symbol: string = "null";
    public name: string = "null";
//    public date: string = "null";
    public isEnabled: boolean = false;
    public type: string = "null";
    public iexId: number =0;
    public exchange: string = "null";
 //   public companyName: string = "";
    public sector: string = "null";
    public industry: string = "null";
 //   public description: string =  "";
 //   public CEO: string = "";
 //   public website: string = "";
}

