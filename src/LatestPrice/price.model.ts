

export class Price {
    public symbol: string ="";
    public price: number = 0;
    public size: number = 0;
    public time: number = 0;
}

export interface Prices {
    prices: Price[]
}