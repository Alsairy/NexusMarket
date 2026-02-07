export type InsightSeverityType = "info" | "warning" | "critical";
export type InsightCategoryType = "pricing" | "risk" | "demand" | "catalog" | "procurement";

export type PriceOutlierType = {
  id: string;
  productName: string;
  productId: string;
  currentPrice: number;
  marketAverage: number;
  deviation: number;
  direction: "above" | "below";
  severity: InsightSeverityType;
  supplierName: string;
  detectedAt: string;
  recommendation: string;
};

export type SupplierRiskScoreType = {
  id: string;
  supplierId: string;
  supplierName: string;
  overallScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  factors: {
    deliveryReliability: number;
    qualityScore: number;
    financialHealth: number;
    complianceScore: number;
    diversificationRisk: number;
  };
  trend: "improving" | "stable" | "declining";
  lastUpdated: string;
  alerts: string[];
};

export type DemandForecastType = {
  id: string;
  productCategory: string;
  currentDemand: number;
  forecastedDemand: number;
  changePercentage: number;
  confidence: number;
  period: string;
  seasonalFactor: string;
  recommendation: string;
};

export type CatalogNormalizationType = {
  id: string;
  type: "duplicate" | "mismatch" | "incomplete" | "substitution";
  productName: string;
  productId: string;
  relatedProductName?: string;
  relatedProductId?: string;
  description: string;
  confidence: number;
  suggestion: string;
  status: "pending" | "accepted" | "dismissed";
};

export type ProcurementInsightType = {
  id: string;
  category: InsightCategoryType;
  severity: InsightSeverityType;
  title: string;
  description: string;
  impact: string;
  suggestedAction: string;
  createdAt: string;
  acknowledged: boolean;
};

export type AiAnalyticsSummaryType = {
  totalOutliers: number;
  criticalRisks: number;
  demandChanges: number;
  catalogIssues: number;
  unacknowledgedInsights: number;
  lastAnalysisRun: string;
};
