

import {KVP, MarketDataSchema ,monad, mutation ,predicate, transformer} from "./interfaces"


export function genParquetFileName(fileSchema: MarketDataSchema,  symbol: string, epoch:number, duration: string ) {
    const iso = new Date(epoch);
    const isoDate = new Date(iso.toISOString().substr(0,10)) 
    return fileSchema+"."+symbol+"."+duration+".D"+isoDate.toISOString()+".parquet"
} 

export function or(...args: predicate[]): predicate {
    return (x: any) => {
        return args.reduce( (acc:boolean, v: predicate) => acc || v(x),false)
    }
}

export function and(...args: predicate[]): predicate{
    return (x) => {
        return args.reduce( (acc:boolean, v: predicate) => acc && v(x),true)
    }
}

export function not(p1: predicate ): predicate{
    return (x) => {
        return ! p1(x)
    }
}

export function lt(x: number): predicate {
    return (y: number) => {
        return y < x
    }
}

export function gt(x: number): predicate  {
    return (y: number) => {
        return y > x
    }
}

export function eq (x: number): predicate {
    return (y:number) => {
        return y === x
    }
}

export function hasProp(x: string): predicate {
    return (y: object) => {
        return Object.prototype.hasOwnProperty.call(y, x);
    }
}

export function ismember(x: Set<any>): predicate {
      return (y: any) => {
          return  x.has(y)
      }
}

export function isfield(fieldname: string, p: predicate) {
    return (y: any) => {
        return p(y[fieldname])
    }
}

export function polynominal(coef: number[]): transformer<number,number> {
    return (y:number) => 
         coef.reduce((acc, c, idx) => acc + c*y**idx ,0);
}

export function of(fieldname: string, t: transformer<any,any>): transformer<any,any> {
    return (y: any) => {
        return t(y[fieldname])
    }
}

export function addfield( key: string ,value: any): transformer<object,object> {
    return (y: object) => {
        return Object.assign(y, {[key]: value})
    }
}

export function mutate_as(fieldname: string, t: transformer<any,any>): mutation<any,any> {
    return (y: object) => {
        return Object.assign(y, {[fieldname]: t(y)})
    }
}

export function compose(...functions: Array<monad<any,any>>): monad<any,any> {
    return (data: any) => {
        return functions.reduceRight((value, func) => func(value), data);
    }
}

export function pipe(...functions: Array<monad<any,any>>): monad<any,any> {
    return (data:any) => {
        return functions.reduce((value, func) => func(value), data)
    }
}

export function renames(from: string[], to:string[]): transformer<object,object> {
    return (y: KVP) => {
        return to.reduce((acc, t, idx) => {
            acc[t] = acc[from[idx]];
        delete acc[from[idx]];
        return acc;
    },y)
  }
}

export function renameWith(fnc: monad<string,string>): transformer<object,object> {
    return (y: KVP) => {
        return y.keys().reduce((acc: KVP, k: string) => ({
            ...acc,
            ...{[ fnc(k) || k]: y[k]}
            })
        ,{});
  }
}

export function selects(from: string[]): transformer<object,object> {
    return (y: KVP) => {
        return from.reduce((acc: KVP, f: string) => {
                    acc[f] = y[f];
                    return acc;
                 },{})
  }
}

export function kvp2str( kvp: KVP ): string {
    let acc='' 
    for (const key in kvp) {
        if (true) {
        if (typeof kvp[key] === "string") {
            acc = acc + '"' + kvp[key] + '"' + ","
        }
        if (typeof kvp[key] === "number") {
            acc = acc + kvp[key] + ","           
        }
    }}
    return acc.slice(0,-1)+"\n";

};
