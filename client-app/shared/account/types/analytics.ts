export type TimePeriodType = "7d" | "30d" | "90d" | "12m";

export type MetricCardType = {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: "currency" | "number" | "percentage";
  icon: string;
  color: "primary" | "success" | "info" | "warning";
};

export type SalesDataPointType = {
  date: string;
  revenue: number;
  orders: number;
};

export type TopProductType = {
  id: string;
  name: string;
  sku: string;
  totalSold: number;
  revenue: number;
  imageUrl?: string;
};

export type OrderTrendType = {
  period: string;
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
};

export type PerformanceScoreType = {
  category: string;
  score: number; // 0-100
  benchmark: number; // industry benchmark
  trend: "up" | "down" | "stable";
};

export type SpendByCategoryType = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

export type AnalyticsDashboardDataType = {
  metrics: MetricCardType[];
  salesData: SalesDataPointType[];
  topProducts: TopProductType[];
  orderTrends: OrderTrendType[];
  performanceScores: PerformanceScoreType[];
  spendByCategory: SpendByCategoryType[];
};
