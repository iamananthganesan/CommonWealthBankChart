export interface Stock {
    date: String;
    value: number;
}

export const STOCKS = [
    {date: new Date('2010-01-01'), value: 210.73},
    {date: new Date('2010-01-04'), value: 214.01},
    {date: new Date('2010-01-05'), value: 214.38},
    {date: new Date('2010-01-06'), value: 210.97},
    {date: new Date('2010-01-07'), value: 210.58},
    {date: new Date('2010-01-08'), value: 211.98},
    {date: new Date('2010-01-11'), value: 210.11},
    {date: new Date('2010-01-12'), value: 207.72},
    {date: new Date('2010-01-13'), value: 210.65},
    {date: new Date('2010-01-14'), value: 209.43},
    {date: new Date('2010-01-15'), value: 205.93},
    {date: new Date('2010-01-18'), value: 205.93},
    {date: new Date('2010-01-19'), value: 215.04},
    {date: new Date('2010-01-20'), value: 211.72},
    {date: new Date('2010-01-21'), value: 208.07},
    {date: new Date('2010-01-22'), value: 197.75},
    {date: new Date('2010-01-25'), value: 203.08},
    {date: new Date('2010-01-27'), value: 204.43}
];

export const BUBBLE = {
    'children': [
      { "date": "Jan 04", "value": 214.38 },
      { "date": "Jan 04", "value": 214.01 },
      { "date": "Tue 05", "value": 210.73 },
      { "date": "Thu 07", "value": 210.97 },
      { "date": "Sat 09", "value": 210.58 },
      { "date": "Mon 11", "value": 211.98 },
      { "date": "Wed 13", "value": 210.11 },
      { "date": "Fri 15", "value": 207.72 },
      { "date": "Jan 17", "value": 210.65 },
      { "date": "Tue 19", "value": 209.43 },
      { "date": "Thu 21", "value": 205.93 },
      { "date": "Sat 23", "value": 205.93 },
      { "date": "Mon 25", "value": 215.04 },
      { "date": "Wed 27", "value": 211.72 },
      { "date": "Tue 29", "value": 208.07 },
      { "date": "Wed 21", "value": 197.75 },
      { "date": "Fri 17", "value": 203.08 },
      { "date": "Sun 26", "value": 204.43 }
    ]

  };
