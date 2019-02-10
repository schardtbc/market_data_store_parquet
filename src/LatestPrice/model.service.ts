
import { last } from "iex-api-wrapper"
import { Price } from "./price.model";

import { KVP } from "../Common/interfaces"

export default class Service {
    public static async query(symbol: string = ""): Promise<Price[]> {
        if (symbol) {
            const res: Price[] = await last(symbol);
            return res
        } else {
            const res: Price[] = await last();
            return res;
        }
    }
}