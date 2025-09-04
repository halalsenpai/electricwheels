export type Locale = 'en' | 'ur';

export type Brand = {
  id: string;
  name: string;
  slug: string;
  country?: string;
};

export type ModelSpec = {
  motorPowerW: number; // watts
  topSpeedKmh: number;
  rangeKm: number;
  batteryCapacityAh?: number;
  batteryVoltageV?: number;
  batteryType?: string;
  chargingTimeH?: number;
  weightKg?: number;
  wheelSizeIn?: number;
  brakes?: string;
};

export type Price = {
  currency: 'PKR';
  msrp: number;
  updatedAt: string; // ISO
};

export type Model = {
  id: string;
  brandId: string;
  brand: string;
  name: string;
  slug: string;
  specs: ModelSpec;
  price: Price;
  images?: string[];
  description?: string;
};

export type Dealer = {
  id: string;
  name: string;
  city: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  brandIds: string[];
};

export type LeadPayload = {
  name: string;
  phone: string;
  modelId?: string;
  message?: string;
  locale?: Locale;
};


