export type SectorType =
  | "manufacturing"
  | "healthcare"
  | "construction"
  | "food_beverage"
  | "technology"
  | "retail"
  | "energy"
  | "agriculture";

export type KpiMetricType = {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  unit: string; // "count", "currency", "percentage"
  trend: "up" | "down" | "stable";
  trendIsPositive: boolean; // whether the trend direction is good
};

export type SectorSpendType = {
  sector: SectorType;
  sectorLabel: string;
  totalSpend: number;
  orderCount: number;
  supplierCount: number;
  averageOrderValue: number;
  percentageOfTotal: number;
};

export type PriceBenchmarkType = {
  id: string;
  productCategory: string;
  averagePrice: number;
  medianPrice: number;
  lowestPrice: number;
  highestPrice: number;
  priceVariance: number; // percentage
  outlierCount: number;
  sampleSize: number;
};

export type SupplierConcentrationType = {
  sector: SectorType;
  sectorLabel: string;
  totalSuppliers: number;
  top3Share: number; // percentage of market held by top 3
  herfindahlIndex: number; // 0-10000 market concentration
  concentrationLevel: "low" | "moderate" | "high" | "very_high";
};

export type ComplianceRateType = {
  sector: SectorType;
  sectorLabel: string;
  totalEntities: number;
  compliantCount: number;
  complianceRate: number; // percentage
  expiringLicenses: number;
  violationCount: number;
};

export type RegulatorDashboardDataType = {
  kpis: KpiMetricType[];
  sectorSpend: SectorSpendType[];
  priceBenchmarks: PriceBenchmarkType[];
  supplierConcentration: SupplierConcentrationType[];
  complianceRates: ComplianceRateType[];
};
