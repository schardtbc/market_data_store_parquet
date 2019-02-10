

export function avg(v:number[]): number {
    return v.reduce( (acc,x) => acc+x,0)/v.length
}

export function ema(x: number, prior: number, n: number): number {
    const alpha = 2/(n+1);
    return x*alpha + (1-alpha)* prior;
}



export function vsma(v: number[],n:number): number[] {
    const l = v.length;
    let e = l-1;
    let s = l-n;
    const r: number[] = [];
    while (s>0) {
      r.push(avg(v.slice(s,e)))
      e -= 1;
      s-=1;
    }
    while (e>0) {
        r.push(avg(v.slice(s,e)))
        e-=1;
    }
    r.push(v[0])
    return r
}

export function vema(v: number[],n:number): number[] {
    const l = v.length;
    const  s=0;
    let  e=n-1;
    let prior = avg(v.slice(s,n));
    const r: number[] = [];
    e=e+1;
    let value:number
    while (e<l) {
      value = ema(v[e],prior,n)
      r.push(value);
      prior = value;
      e += 1;
    }
    return r
}
