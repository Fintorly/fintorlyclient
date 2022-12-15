export enum RangeKey {
  Max = 'max',
  Min = 'min',
}
export enum LocationKey {
  City = 'city',
  District = 'district',
}
export enum AmountKey {
  Amount = 'amount',
  Unit = 'unit',
}
export enum DateKey {
  Last1 = 1,
  Last2 = 2,
  Last3 = 3,
  Last4 = 4,
  Last5 = 5,
  Last6 = 6,
  Last7 = 7,
}

export enum TimeRangeKey {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export enum HourKey {
  Last12 = 12,
  Last24 = 24,
  Last36 = 36,
  Last48 = 48,
  Last60 = 60,
  Last72 = 72,
}

export enum ShippingCost {
  Including = 1,
  NotIncluding = 2,
}

export enum AdvertiseOrderByEnum {
  AscendingPrice,
  DescendingPrice,
  DescendingAdvertiseDate,
  AscendingAdvertiseDate,
  AscendingAmount,
  DescendingAmount,
}
