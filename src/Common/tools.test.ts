

import * as _ from "./tools"

test("genParquetFileName", () => {
    const e = new Date("2019-01-22");
    const epoch = e.valueOf();
    expect(_.genParquetFileName("INTRADAY", "AAPL", epoch ,"P01M")).toEqual("INTRADAY.AAPL.P01M.D2019-01-22T00:00:00.000Z.parquet")
});

test("rename simple", () => {
     expect(_.renames(["a"],["b"])({ a: 10 , c: 0})).toEqual({b: 10, c:0})
})

test("rename array", () => {
    expect([{ a: 10 , c: 0},{a:5,c:3}].map(_.renames(["a"],["b"]))).toEqual(
        [{b: 10, c:0},{b:5,c:3}])
})

test("4 eq 4", () => {
    expect( _.eq(4)(4)).toBeTruthy()
})

test("4 eq 5 is false", () => {
    expect( _.eq(4)(5)).toBeFalsy()
})

test("3 th 4", () => {
    expect( _.lt(4)(3)).toBeTruthy()
})

test("5 th 4 is false", () => {
    expect( _.lt(4)(5)).toBeFalsy()
})

test("3 th 4", () => {
    expect( _.gt(4)(3)).toBeFalsy()
})

test("5 th 4 is false", () => {
    expect( _.gt(4)(5)).toBeTruthy()
})

test( "3< 5 < 9", () => {
    expect( _.and(_.gt(3),_.lt(9))(5)).toBeTruthy()
})

test( "3< 10 < 9", () => {
    expect( _.and(_.gt(3),_.lt(9))(10)).toBeFalsy()
})

test( "3< 1 < 9", () => {
    expect( _.and(_.gt(3),_.lt(9))(1)).toBeFalsy()
})

test( "3< 5 < 9", () => {
    expect( _.and(_.gt(3),_.lt(9))(5)).toBeTruthy()
})

test( "3< 10 < 9", () => {
    expect( _.and(_.gt(3),_.lt(9))(10)).toBeFalsy()
})

test( "3< 5 || 5  < 1", () => {
    expect( _.or(_.gt(3),_.lt(1))(5)).toBeTruthy()
})

test( "3< 2 || 2  < 1", () => {
    expect( _.or(_.gt(3),_.lt(1))(2)).toBeFalsy()
})

test( "3< 5 || 5  < 1", () => {
    expect( _.isfield("aaa",_.or(_.gt(3),_.lt(1)))({b: 30,aaa: 5})).toBeTruthy()
})

test( "3< 2 || 2  < 1", () => {
    expect( _.isfield("aaa",_.or(_.gt(3),_.lt(1)))({b: 30,aaa: 2})).toBeFalsy()
})

test(" 30*2*2 + 20*2 + 10 = 170", () => {
    expect( _.polynominal([10,20,30])(2)).toEqual(170)
})

test(" 30*2*2 + 20*2 + 10 = 170", () => {
    expect( _.of("aaa",_.polynominal([10,20,30]))({b: 30,aaa: 2})).toEqual(170)
})

test("MUTATION 30*2*2 + 20*2 + 10", () => {
    expect( _.mutate_as("ccc",_.of("aaa",_.polynominal([10,20,30])))({b: 30,aaa: 2})).toEqual({b: 30,aaa: 2, ccc: 170})
})

test("kvp2str", () => {
    const result = _.kvp2str({ a:2, b:"asew", c: 345})
    expect(result).toEqual('2,"asew",345\n')
})