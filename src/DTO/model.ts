import { KVP } from "../Common/interfaces"

import { kvp2str } from "../Common/tools"

import { close, createWriteStream, ReadStream, WriteStream } from 'fs'

 export abstract class DTO implements KVP {
     
    public toCSV(): string {
        return kvp2str(this);
    }
 }