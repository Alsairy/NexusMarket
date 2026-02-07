import { createGlobalState } from "@vueuse/core";
import { computed, readonly, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type {
  PriceOutlierType,
  SupplierRiskScoreType,
  DemandForecastType,
  CatalogNormalizationType,
  ProcurementInsightType,
  AiAnalyticsSummaryType,
} from "@/shared/account";

function generatePriceOutliers(): PriceOutlierType[] {
  return [
    {
      id: "po-001",
      productName: "Industrial Bearing Set A-420",
      productId: "IBS-4420",
      currentPrice: 185.0,
      marketAverage: 142.5,
      deviation: 29.8,
      direction: "above",
      severity: "critical",
      supplierName: "Precision Parts Co.",
      detectedAt: "2026-02-06T14:30:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.negotiate_price",
    },
    {
      id: "po-002",
      productName: "Steel Cable Spool 100m",
      productId: "SCS-1000",
      currentPrice: 245.0,
      marketAverage: 298.0,
      deviation: -17.8,
      direction: "below",
      severity: "info",
      supplierName: "MetalWorks Ltd.",
      detectedAt: "2026-02-05T09:15:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.lock_in_price",
    },
    {
      id: "po-003",
      productName: "Hydraulic Cylinder HC-200",
      productId: "HYC-2000",
      currentPrice: 1420.0,
      marketAverage: 1150.0,
      deviation: 23.5,
      direction: "above",
      severity: "warning",
      supplierName: "HydraFlow Systems",
      detectedAt: "2026-02-05T16:45:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.seek_alternatives",
    },
    {
      id: "po-004",
      productName: "Safety Goggles Pack Pro",
      productId: "SGP-1100",
      currentPrice: 48.0,
      marketAverage: 62.0,
      deviation: -22.6,
      direction: "below",
      severity: "info",
      supplierName: "SafeGuard Supplies",
      detectedAt: "2026-02-04T11:20:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.bulk_order",
    },
    {
      id: "po-005",
      productName: "Welding Rod Bundle WR-33",
      productId: "WRB-3300",
      currentPrice: 112.0,
      marketAverage: 80.0,
      deviation: 40.0,
      direction: "above",
      severity: "critical",
      supplierName: "WeldTech Industries",
      detectedAt: "2026-02-06T08:00:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.switch_supplier",
    },
    {
      id: "po-006",
      productName: "Thermal Insulation Roll R-30",
      productId: "TIR-8800",
      currentPrice: 220.0,
      marketAverage: 240.0,
      deviation: -8.3,
      direction: "below",
      severity: "info",
      supplierName: "InsulPro Materials",
      detectedAt: "2026-02-03T13:10:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.maintain_contract",
    },
    {
      id: "po-007",
      productName: "Precision Drill Bit Kit DK-50",
      productId: "PDB-2250",
      currentPrice: 195.0,
      marketAverage: 150.0,
      deviation: 30.0,
      direction: "above",
      severity: "critical",
      supplierName: "DrillMaster Corp.",
      detectedAt: "2026-02-06T10:30:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.negotiate_price",
    },
    {
      id: "po-008",
      productName: "Industrial Adhesive 5L IA-500",
      productId: "IAD-5050",
      currentPrice: 78.0,
      marketAverage: 90.0,
      deviation: -13.3,
      direction: "below",
      severity: "info",
      supplierName: "ChemBond Solutions",
      detectedAt: "2026-02-04T15:45:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.lock_in_price",
    },
    {
      id: "po-009",
      productName: "Pneumatic Valve Set PV-100",
      productId: "PNV-1000",
      currentPrice: 340.0,
      marketAverage: 290.0,
      deviation: 17.2,
      direction: "above",
      severity: "warning",
      supplierName: "AirControl Inc.",
      detectedAt: "2026-02-05T07:30:00Z",
      recommendation: "pages.account.ai_insights.outlier_recommendations.seek_alternatives",
    },
  ];
}

function generateRiskScores(): SupplierRiskScoreType[] {
  return [
    {
      id: "rs-001",
      supplierId: "sup-001",
      supplierName: "Precision Parts Co.",
      overallScore: 32,
      riskLevel: "critical",
      factors: {
        deliveryReliability: 28,
        qualityScore: 45,
        financialHealth: 22,
        complianceScore: 35,
        diversificationRisk: 30,
      },
      trend: "declining",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [
        "pages.account.ai_insights.risk_alerts.late_deliveries",
        "pages.account.ai_insights.risk_alerts.financial_instability",
      ],
    },
    {
      id: "rs-002",
      supplierId: "sup-002",
      supplierName: "MetalWorks Ltd.",
      overallScore: 88,
      riskLevel: "low",
      factors: {
        deliveryReliability: 92,
        qualityScore: 90,
        financialHealth: 85,
        complianceScore: 88,
        diversificationRisk: 84,
      },
      trend: "stable",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [],
    },
    {
      id: "rs-003",
      supplierId: "sup-003",
      supplierName: "HydraFlow Systems",
      overallScore: 61,
      riskLevel: "medium",
      factors: {
        deliveryReliability: 70,
        qualityScore: 78,
        financialHealth: 55,
        complianceScore: 50,
        diversificationRisk: 52,
      },
      trend: "declining",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [
        "pages.account.ai_insights.risk_alerts.compliance_gap",
      ],
    },
    {
      id: "rs-004",
      supplierId: "sup-004",
      supplierName: "SafeGuard Supplies",
      overallScore: 94,
      riskLevel: "low",
      factors: {
        deliveryReliability: 96,
        qualityScore: 95,
        financialHealth: 92,
        complianceScore: 93,
        diversificationRisk: 90,
      },
      trend: "improving",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [],
    },
    {
      id: "rs-005",
      supplierId: "sup-005",
      supplierName: "WeldTech Industries",
      overallScore: 45,
      riskLevel: "high",
      factors: {
        deliveryReliability: 50,
        qualityScore: 60,
        financialHealth: 35,
        complianceScore: 40,
        diversificationRisk: 38,
      },
      trend: "declining",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [
        "pages.account.ai_insights.risk_alerts.quality_decline",
        "pages.account.ai_insights.risk_alerts.single_source_risk",
      ],
    },
    {
      id: "rs-006",
      supplierId: "sup-006",
      supplierName: "InsulPro Materials",
      overallScore: 76,
      riskLevel: "medium",
      factors: {
        deliveryReliability: 82,
        qualityScore: 80,
        financialHealth: 70,
        complianceScore: 75,
        diversificationRisk: 72,
      },
      trend: "stable",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [],
    },
    {
      id: "rs-007",
      supplierId: "sup-007",
      supplierName: "DrillMaster Corp.",
      overallScore: 58,
      riskLevel: "medium",
      factors: {
        deliveryReliability: 65,
        qualityScore: 72,
        financialHealth: 48,
        complianceScore: 52,
        diversificationRisk: 55,
      },
      trend: "stable",
      lastUpdated: "2026-02-06T12:00:00Z",
      alerts: [
        "pages.account.ai_insights.risk_alerts.financial_watch",
      ],
    },
  ];
}

function generateDemandForecasts(): DemandForecastType[] {
  return [
    {
      id: "df-001",
      productCategory: "pages.account.ai_insights.categories.industrial_bearings",
      currentDemand: 1250,
      forecastedDemand: 1580,
      changePercentage: 26.4,
      confidence: 87,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.spring_maintenance",
      recommendation: "pages.account.ai_insights.forecast_recommendations.increase_inventory",
    },
    {
      id: "df-002",
      productCategory: "pages.account.ai_insights.categories.safety_equipment",
      currentDemand: 3200,
      forecastedDemand: 4100,
      changePercentage: 28.1,
      confidence: 92,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.regulatory_cycle",
      recommendation: "pages.account.ai_insights.forecast_recommendations.pre_order",
    },
    {
      id: "df-003",
      productCategory: "pages.account.ai_insights.categories.hydraulic_components",
      currentDemand: 480,
      forecastedDemand: 420,
      changePercentage: -12.5,
      confidence: 74,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.project_slowdown",
      recommendation: "pages.account.ai_insights.forecast_recommendations.reduce_stock",
    },
    {
      id: "df-004",
      productCategory: "pages.account.ai_insights.categories.welding_supplies",
      currentDemand: 890,
      forecastedDemand: 950,
      changePercentage: 6.7,
      confidence: 81,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.construction_uptick",
      recommendation: "pages.account.ai_insights.forecast_recommendations.maintain_levels",
    },
    {
      id: "df-005",
      productCategory: "pages.account.ai_insights.categories.electrical_components",
      currentDemand: 2100,
      forecastedDemand: 2750,
      changePercentage: 31.0,
      confidence: 89,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.infrastructure_spending",
      recommendation: "pages.account.ai_insights.forecast_recommendations.secure_contracts",
    },
    {
      id: "df-006",
      productCategory: "pages.account.ai_insights.categories.packaging_materials",
      currentDemand: 5400,
      forecastedDemand: 4900,
      changePercentage: -9.3,
      confidence: 78,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.shipping_decline",
      recommendation: "pages.account.ai_insights.forecast_recommendations.defer_purchases",
    },
    {
      id: "df-007",
      productCategory: "pages.account.ai_insights.categories.precision_tools",
      currentDemand: 670,
      forecastedDemand: 810,
      changePercentage: 20.9,
      confidence: 85,
      period: "Q2 2026",
      seasonalFactor: "pages.account.ai_insights.seasonal.manufacturing_expansion",
      recommendation: "pages.account.ai_insights.forecast_recommendations.increase_inventory",
    },
  ];
}

function generateCatalogIssues(): CatalogNormalizationType[] {
  return [
    {
      id: "cn-001",
      type: "duplicate",
      productName: "Industrial Bearing Set A-420",
      productId: "IBS-4420",
      relatedProductName: "Bearing Set Industrial A420",
      relatedProductId: "BSI-A420",
      description: "pages.account.ai_insights.catalog_descriptions.potential_duplicate",
      confidence: 94,
      suggestion: "pages.account.ai_insights.catalog_suggestions.merge_listings",
      status: "pending",
    },
    {
      id: "cn-002",
      type: "mismatch",
      productName: "Hydraulic Cylinder HC-200",
      productId: "HYC-2000",
      description: "pages.account.ai_insights.catalog_descriptions.spec_mismatch",
      confidence: 88,
      suggestion: "pages.account.ai_insights.catalog_suggestions.update_specs",
      status: "pending",
    },
    {
      id: "cn-003",
      type: "incomplete",
      productName: "Pneumatic Valve Set PV-100",
      productId: "PNV-1000",
      description: "pages.account.ai_insights.catalog_descriptions.missing_attributes",
      confidence: 91,
      suggestion: "pages.account.ai_insights.catalog_suggestions.add_attributes",
      status: "pending",
    },
    {
      id: "cn-004",
      type: "substitution",
      productName: "Welding Rod Bundle WR-33",
      productId: "WRB-3300",
      relatedProductName: "Premium Welding Rod WR-35",
      relatedProductId: "WRB-3500",
      description: "pages.account.ai_insights.catalog_descriptions.substitution_available",
      confidence: 76,
      suggestion: "pages.account.ai_insights.catalog_suggestions.offer_alternative",
      status: "pending",
    },
    {
      id: "cn-005",
      type: "duplicate",
      productName: "Safety Goggles Pack Pro",
      productId: "SGP-1100",
      relatedProductName: "Pro Safety Goggles (Pack)",
      relatedProductId: "PSG-1100",
      description: "pages.account.ai_insights.catalog_descriptions.potential_duplicate",
      confidence: 89,
      suggestion: "pages.account.ai_insights.catalog_suggestions.merge_listings",
      status: "accepted",
    },
    {
      id: "cn-006",
      type: "incomplete",
      productName: "Steel Cable Spool 100m",
      productId: "SCS-1000",
      description: "pages.account.ai_insights.catalog_descriptions.missing_certifications",
      confidence: 95,
      suggestion: "pages.account.ai_insights.catalog_suggestions.request_certifications",
      status: "pending",
    },
    {
      id: "cn-007",
      type: "mismatch",
      productName: "Thermal Insulation Roll R-30",
      productId: "TIR-8800",
      description: "pages.account.ai_insights.catalog_descriptions.unit_mismatch",
      confidence: 82,
      suggestion: "pages.account.ai_insights.catalog_suggestions.standardize_units",
      status: "dismissed",
    },
  ];
}

function generateInsights(): ProcurementInsightType[] {
  return [
    {
      id: "pi-001",
      category: "pricing",
      severity: "critical",
      title: "pages.account.ai_insights.insight_titles.price_surge_detected",
      description: "pages.account.ai_insights.insight_descriptions.price_surge_bearings",
      impact: "pages.account.ai_insights.insight_impacts.annual_cost_increase_45k",
      suggestedAction: "pages.account.ai_insights.insight_actions.renegotiate_contracts",
      createdAt: "2026-02-06T14:00:00Z",
      acknowledged: false,
    },
    {
      id: "pi-002",
      category: "risk",
      severity: "critical",
      title: "pages.account.ai_insights.insight_titles.supplier_financial_risk",
      description: "pages.account.ai_insights.insight_descriptions.precision_parts_risk",
      impact: "pages.account.ai_insights.insight_impacts.supply_chain_disruption",
      suggestedAction: "pages.account.ai_insights.insight_actions.diversify_suppliers",
      createdAt: "2026-02-06T10:30:00Z",
      acknowledged: false,
    },
    {
      id: "pi-003",
      category: "demand",
      severity: "warning",
      title: "pages.account.ai_insights.insight_titles.demand_spike_forecast",
      description: "pages.account.ai_insights.insight_descriptions.safety_equipment_surge",
      impact: "pages.account.ai_insights.insight_impacts.potential_stockout",
      suggestedAction: "pages.account.ai_insights.insight_actions.increase_safety_stock",
      createdAt: "2026-02-05T16:00:00Z",
      acknowledged: false,
    },
    {
      id: "pi-004",
      category: "catalog",
      severity: "info",
      title: "pages.account.ai_insights.insight_titles.duplicate_products_found",
      description: "pages.account.ai_insights.insight_descriptions.catalog_duplicates",
      impact: "pages.account.ai_insights.insight_impacts.procurement_inefficiency",
      suggestedAction: "pages.account.ai_insights.insight_actions.review_catalog",
      createdAt: "2026-02-05T12:00:00Z",
      acknowledged: true,
    },
    {
      id: "pi-005",
      category: "procurement",
      severity: "warning",
      title: "pages.account.ai_insights.insight_titles.contract_expiration",
      description: "pages.account.ai_insights.insight_descriptions.contracts_expiring_q2",
      impact: "pages.account.ai_insights.insight_impacts.price_uncertainty",
      suggestedAction: "pages.account.ai_insights.insight_actions.initiate_renewals",
      createdAt: "2026-02-04T09:00:00Z",
      acknowledged: false,
    },
    {
      id: "pi-006",
      category: "pricing",
      severity: "info",
      title: "pages.account.ai_insights.insight_titles.cost_savings_opportunity",
      description: "pages.account.ai_insights.insight_descriptions.bulk_discount_available",
      impact: "pages.account.ai_insights.insight_impacts.potential_savings_12k",
      suggestedAction: "pages.account.ai_insights.insight_actions.consolidate_orders",
      createdAt: "2026-02-04T07:30:00Z",
      acknowledged: true,
    },
    {
      id: "pi-007",
      category: "risk",
      severity: "warning",
      title: "pages.account.ai_insights.insight_titles.single_source_dependency",
      description: "pages.account.ai_insights.insight_descriptions.welding_supplies_single_source",
      impact: "pages.account.ai_insights.insight_impacts.high_concentration_risk",
      suggestedAction: "pages.account.ai_insights.insight_actions.qualify_backup_supplier",
      createdAt: "2026-02-03T15:00:00Z",
      acknowledged: false,
    },
    {
      id: "pi-008",
      category: "demand",
      severity: "info",
      title: "pages.account.ai_insights.insight_titles.seasonal_trend_detected",
      description: "pages.account.ai_insights.insight_descriptions.packaging_seasonal_decline",
      impact: "pages.account.ai_insights.insight_impacts.overstock_risk",
      suggestedAction: "pages.account.ai_insights.insight_actions.adjust_reorder_points",
      createdAt: "2026-02-03T11:00:00Z",
      acknowledged: true,
    },
    {
      id: "pi-009",
      category: "procurement",
      severity: "critical",
      title: "pages.account.ai_insights.insight_titles.compliance_deadline",
      description: "pages.account.ai_insights.insight_descriptions.new_regulations_q2",
      impact: "pages.account.ai_insights.insight_impacts.regulatory_penalties",
      suggestedAction: "pages.account.ai_insights.insight_actions.update_supplier_requirements",
      createdAt: "2026-02-02T14:00:00Z",
      acknowledged: false,
    },
    {
      id: "pi-010",
      category: "catalog",
      severity: "warning",
      title: "pages.account.ai_insights.insight_titles.incomplete_product_data",
      description: "pages.account.ai_insights.insight_descriptions.missing_product_specs",
      impact: "pages.account.ai_insights.insight_impacts.search_accuracy_reduced",
      suggestedAction: "pages.account.ai_insights.insight_actions.enrich_product_data",
      createdAt: "2026-02-02T10:00:00Z",
      acknowledged: false,
    },
  ];
}

function _useAiAnalytics() {
  const loading = ref(false);
  const analysisRunning = ref(false);

  const priceOutliers = shallowRef<PriceOutlierType[]>([]);
  const riskScores = shallowRef<SupplierRiskScoreType[]>([]);
  const demandForecasts = shallowRef<DemandForecastType[]>([]);
  const catalogIssues = shallowRef<CatalogNormalizationType[]>([]);
  const insights = shallowRef<ProcurementInsightType[]>([]);

  const summary = computed<AiAnalyticsSummaryType>(() => ({
    totalOutliers: priceOutliers.value.length,
    criticalRisks: riskScores.value.filter((r) => r.riskLevel === "critical" || r.riskLevel === "high").length,
    demandChanges: demandForecasts.value.filter((d) => Math.abs(d.changePercentage) >= 10).length,
    catalogIssues: catalogIssues.value.filter((c) => c.status === "pending").length,
    unacknowledgedInsights: insights.value.filter((i) => !i.acknowledged).length,
    lastAnalysisRun: new Date().toISOString(),
  }));

  async function fetchAiAnalytics(): Promise<void> {
    try {
      loading.value = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      priceOutliers.value = generatePriceOutliers();
      riskScores.value = generateRiskScores();
      demandForecasts.value = generateDemandForecasts();
      catalogIssues.value = generateCatalogIssues();
      insights.value = generateInsights();
    } catch (e) {
      Logger.error(`${useAiAnalytics.name}.${fetchAiAnalytics.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function acknowledgeInsight(id: string): void {
    insights.value = insights.value.map((insight) =>
      insight.id === id ? { ...insight, acknowledged: true } : insight,
    );
  }

  function acceptCatalogSuggestion(id: string): void {
    catalogIssues.value = catalogIssues.value.map((issue) =>
      issue.id === id ? { ...issue, status: "accepted" as const } : issue,
    );
  }

  function dismissCatalogSuggestion(id: string): void {
    catalogIssues.value = catalogIssues.value.map((issue) =>
      issue.id === id ? { ...issue, status: "dismissed" as const } : issue,
    );
  }

  async function runAnalysis(): Promise<void> {
    try {
      analysisRunning.value = true;

      // Simulate AI analysis processing time
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Regenerate all data to simulate fresh analysis
      priceOutliers.value = generatePriceOutliers();
      riskScores.value = generateRiskScores();
      demandForecasts.value = generateDemandForecasts();
      catalogIssues.value = generateCatalogIssues();
      insights.value = generateInsights();
    } catch (e) {
      Logger.error(`${useAiAnalytics.name}.${runAnalysis.name}`, e);
      throw e;
    } finally {
      analysisRunning.value = false;
    }
  }

  // Auto-fetch on init
  void fetchAiAnalytics();

  return {
    loading: readonly(loading),
    analysisRunning: readonly(analysisRunning),
    priceOutliers,
    riskScores,
    demandForecasts,
    catalogIssues,
    insights,
    summary,
    fetchAiAnalytics,
    acknowledgeInsight,
    acceptCatalogSuggestion,
    dismissCatalogSuggestion,
    runAnalysis,
  };
}

export const useAiAnalytics = createGlobalState(_useAiAnalytics);
