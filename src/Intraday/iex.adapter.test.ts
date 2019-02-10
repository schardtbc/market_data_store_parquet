import { IEXIntradayAdapter } from "./iex.adapter"

const testdata = [
{"date":"20190125","minute":"09:30","label":"09:30 AM","high":155.3,"low":154.86,"average":155.055,"volume":15446,"notional":2394981.05,"numberOfTrades":120,"marketHigh":155.49,"marketLow":154.86,"marketAverage":155.328,"marketVolume":1115520,"marketNotional":173271198.836,"marketNumberOfTrades":2510,"open":155.3,"close":154.95,"marketOpen":155.28,"marketClose":155.003,"changeOverTime":0,"marketChangeOverTime":0}
,{"date":"20190125","minute":"09:31","label":"09:31 AM","high":154.99,"low":154.63,"average":154.796,"volume":8983,"notional":1390531.14,"numberOfTrades":89,"marketHigh":155,"marketLow":154.61,"marketAverage":154.772,"marketVolume":290328,"marketNotional":44934527.4182,"marketNumberOfTrades":1791,"open":154.99,"close":154.65,"marketOpen":154.99,"marketClose":154.65,"changeOverTime":-0.0016703750282158882,"marketChangeOverTime":-0.003579522043675394}
,{"date":"20190125","minute":"09:32","label":"09:32 AM","high":154.755,"low":154.33,"average":154.546,"volume":10702,"notional":1653953.74,"numberOfTrades":103,"marketHigh":154.79,"marketLow":154.32,"marketAverage":154.56,"marketVolume":256140,"marketNotional":39588965.8331,"marketNumberOfTrades":1828,"open":154.67,"close":154.525,"marketOpen":154.67,"marketClose":154.542,"changeOverTime":-0.003282706136532292,"marketChangeOverTime":-0.004944375772558718}
];

const results = [
{symbol: "AAPL",date:"2019-01-25", time:"09:30",minute:0,usMarketSequenceID:0,"close": 155.003, "epoch": 1548426600000, "high": 155.49, "low": 154.86, "notational": 173271198.836, "open": 155.28, "price": 155.328, "trades": 2510, "volume": 1115520},
{symbol: "AAPL",date:"2019-01-25", time:"09:31",minute:1,usMarketSequenceID:0,"close": 154.65,  "epoch": 1548426660000, "high": 155, "low": 154.61, "notational": 44934527.4182, "open": 154.99, "price": 154.772, "trades": 1791, "volume": 290328},
{symbol: "AAPL",date:"2019-01-25", time:"09:32",minute:2,usMarketSequenceID:0,"close": 154.542, "epoch": 1548426720000, "high": 154.79, "low": 154.32, "notational": 39588965.8331, "open": 154.67, "price": 154.56, "trades": 1828, "volume": 256140}
]

test("iex adapter", () => {
    const iex = new IEXIntradayAdapter();
    iex.symbol = "AAPL";
    expect(iex.adapt(testdata)).toEqual(results)
})    
