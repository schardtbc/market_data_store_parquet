

import { timeBlock } from "./tools.time"

test("timeBock 2019-01-15", () => {
    const d = new Date("2019-01-15 09:30:00.000GMT-0500");
    expect(timeBlock(d.valueOf())).toEqual(
        {"ISODate": "2019-01-15T14:30:00.000Z",
        "dayOfMonth": 15,
        "dayOfQuarter": 15,
        "dayOfWeek": 2,
        "dayOfYear": 15,
        "epoch": 1547562600000,
        "month": 1,
        "quarter": 1,
        "weekOfMonth": 3,
        "weekOfYear": 3,
        "year": 2019});
})

test("timeBock 2019-04-14", () => {
    const d = new Date("2019-04-14 09:30:00.000 GMT-0500");
    expect(timeBlock(d.valueOf())).toEqual(
        {"ISODate": "2019-04-14T14:30:00.000Z",
        "dayOfMonth": 14,
        "dayOfQuarter": 14,
        "dayOfWeek": 0,
        "dayOfYear": 104,
        "epoch": 1555252200000,
        "month": 4,
        "quarter": 2,
        "weekOfMonth": 3,
        "weekOfYear": 16,
        "year": 2019});
})

test("timeBock 2019-04-15", () => {
    const d = new Date("2019-04-15 09:30:00.000 GMT-0500");
    expect(timeBlock(d.valueOf())).toEqual(
        {"ISODate": "2019-04-15T14:30:00.000Z",
        "dayOfMonth": 15,
        "dayOfQuarter": 15,
        "dayOfWeek": 1,
        "dayOfYear": 105,
        "epoch": 1555338600000,
        "month": 4,
        "quarter": 2,
        "weekOfMonth": 3,
        "weekOfYear": 16,
        "year": 2019});
})
