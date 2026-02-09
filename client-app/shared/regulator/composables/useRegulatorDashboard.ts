import { createGlobalState } from "@vueuse/core";
import { ref, shallowRef, computed } from "vue";
import { Logger } from "@/core/utilities";
import type { RegulatorDashboardDataType } from "../types";

function _buildMockData(): RegulatorDashboardDataType {
  return {
    kpis: [
      {
        id: "total-volume",
        label: "Total Marketplace Volume",
        value: 12400000,
        previousValue: 11448000,
        unit: "currency",
        trend: "up",
        trendIsPositive: true,
      },
      {
        id: "active-suppliers",
        label: "Active Suppliers",
        value: 342,
        previousValue: 305,
        unit: "count",
        trend: "up",
        trendIsPositive: true,
      },
      {
        id: "active-buyers",
        label: "Active Buyers",
        value: 1247,
        previousValue: 1185,
        unit: "count",
        trend: "up",
        trendIsPositive: true,
      },
      {
        id: "avg-order-value",
        label: "Average Order Value",
        value: 4850,
        previousValue: 4954,
        unit: "currency",
        trend: "down",
        trendIsPositive: false,
      },
      {
        id: "compliance-rate",
        label: "Overall Compliance Rate",
        value: 94.2,
        previousValue: 92.9,
        unit: "percentage",
        trend: "up",
        trendIsPositive: true,
      },
      {
        id: "price-outliers",
        label: "Price Outlier Alerts",
        value: 23,
        previousValue: 27,
        unit: "count",
        trend: "down",
        trendIsPositive: true,
      },
    ],
    sectorSpend: [
      {
        sector: "manufacturing",
        sectorLabel: "Manufacturing",
        totalSpend: 3200000,
        orderCount: 412,
        supplierCount: 89,
        averageOrderValue: 7767,
        percentageOfTotal: 25.8,
      },
      {
        sector: "healthcare",
        sectorLabel: "Healthcare",
        totalSpend: 2100000,
        orderCount: 287,
        supplierCount: 64,
        averageOrderValue: 7317,
        percentageOfTotal: 16.9,
      },
      {
        sector: "construction",
        sectorLabel: "Construction",
        totalSpend: 1800000,
        orderCount: 198,
        supplierCount: 52,
        averageOrderValue: 9091,
        percentageOfTotal: 14.5,
      },
      {
        sector: "food_beverage",
        sectorLabel: "Food & Beverage",
        totalSpend: 1500000,
        orderCount: 356,
        supplierCount: 47,
        averageOrderValue: 4213,
        percentageOfTotal: 12.1,
      },
      {
        sector: "technology",
        sectorLabel: "Technology",
        totalSpend: 1400000,
        orderCount: 178,
        supplierCount: 38,
        averageOrderValue: 7865,
        percentageOfTotal: 11.3,
      },
      {
        sector: "retail",
        sectorLabel: "Retail",
        totalSpend: 1200000,
        orderCount: 245,
        supplierCount: 31,
        averageOrderValue: 4898,
        percentageOfTotal: 9.7,
      },
      {
        sector: "energy",
        sectorLabel: "Energy",
        totalSpend: 700000,
        orderCount: 64,
        supplierCount: 14,
        averageOrderValue: 10938,
        percentageOfTotal: 5.6,
      },
      {
        sector: "agriculture",
        sectorLabel: "Agriculture",
        totalSpend: 500000,
        orderCount: 112,
        supplierCount: 7,
        averageOrderValue: 4464,
        percentageOfTotal: 4.0,
      },
    ],
    priceBenchmarks: [
      {
        id: "pb-office",
        productCategory: "Office Supplies",
        averagePrice: 45.2,
        medianPrice: 38.0,
        lowestPrice: 12.5,
        highestPrice: 125.0,
        priceVariance: 34.2,
        outlierCount: 3,
        sampleSize: 245,
      },
      {
        id: "pb-medical",
        productCategory: "Medical Equipment",
        averagePrice: 2850.0,
        medianPrice: 2400.0,
        lowestPrice: 450.0,
        highestPrice: 12500.0,
        priceVariance: 52.8,
        outlierCount: 5,
        sampleSize: 128,
      },
      {
        id: "pb-construction",
        productCategory: "Construction Materials",
        averagePrice: 320.0,
        medianPrice: 285.0,
        lowestPrice: 45.0,
        highestPrice: 1850.0,
        priceVariance: 41.5,
        outlierCount: 4,
        sampleSize: 312,
      },
      {
        id: "pb-food",
        productCategory: "Food Ingredients",
        averagePrice: 18.5,
        medianPrice: 15.0,
        lowestPrice: 3.2,
        highestPrice: 85.0,
        priceVariance: 28.7,
        outlierCount: 2,
        sampleSize: 487,
      },
      {
        id: "pb-it",
        productCategory: "IT Equipment",
        averagePrice: 1250.0,
        medianPrice: 980.0,
        lowestPrice: 150.0,
        highestPrice: 8500.0,
        priceVariance: 45.3,
        outlierCount: 3,
        sampleSize: 198,
      },
      {
        id: "pb-safety",
        productCategory: "Safety Equipment",
        averagePrice: 85.0,
        medianPrice: 72.0,
        lowestPrice: 15.0,
        highestPrice: 450.0,
        priceVariance: 38.9,
        outlierCount: 2,
        sampleSize: 156,
      },
      {
        id: "pb-chemicals",
        productCategory: "Chemicals",
        averagePrice: 420.0,
        medianPrice: 350.0,
        lowestPrice: 65.0,
        highestPrice: 2200.0,
        priceVariance: 48.1,
        outlierCount: 4,
        sampleSize: 94,
      },
      {
        id: "pb-raw",
        productCategory: "Raw Materials",
        averagePrice: 780.0,
        medianPrice: 650.0,
        lowestPrice: 120.0,
        highestPrice: 3800.0,
        priceVariance: 42.6,
        outlierCount: 3,
        sampleSize: 267,
      },
      {
        id: "pb-packaging",
        productCategory: "Packaging",
        averagePrice: 28.0,
        medianPrice: 22.0,
        lowestPrice: 5.0,
        highestPrice: 120.0,
        priceVariance: 31.4,
        outlierCount: 1,
        sampleSize: 189,
      },
      {
        id: "pb-transport",
        productCategory: "Transportation",
        averagePrice: 1850.0,
        medianPrice: 1500.0,
        lowestPrice: 350.0,
        highestPrice: 7500.0,
        priceVariance: 55.2,
        outlierCount: 5,
        sampleSize: 76,
      },
    ],
    supplierConcentration: [
      {
        sector: "manufacturing",
        sectorLabel: "Manufacturing",
        totalSuppliers: 89,
        top3Share: 28.5,
        herfindahlIndex: 850,
        concentrationLevel: "low",
      },
      {
        sector: "healthcare",
        sectorLabel: "Healthcare",
        totalSuppliers: 64,
        top3Share: 42.3,
        herfindahlIndex: 1650,
        concentrationLevel: "moderate",
      },
      {
        sector: "construction",
        sectorLabel: "Construction",
        totalSuppliers: 52,
        top3Share: 38.1,
        herfindahlIndex: 1420,
        concentrationLevel: "moderate",
      },
      {
        sector: "food_beverage",
        sectorLabel: "Food & Beverage",
        totalSuppliers: 47,
        top3Share: 35.7,
        herfindahlIndex: 1180,
        concentrationLevel: "moderate",
      },
      {
        sector: "technology",
        sectorLabel: "Technology",
        totalSuppliers: 38,
        top3Share: 55.2,
        herfindahlIndex: 2800,
        concentrationLevel: "high",
      },
      {
        sector: "retail",
        sectorLabel: "Retail",
        totalSuppliers: 31,
        top3Share: 48.9,
        herfindahlIndex: 2100,
        concentrationLevel: "high",
      },
      {
        sector: "energy",
        sectorLabel: "Energy",
        totalSuppliers: 14,
        top3Share: 72.4,
        herfindahlIndex: 4200,
        concentrationLevel: "very_high",
      },
      {
        sector: "agriculture",
        sectorLabel: "Agriculture",
        totalSuppliers: 7,
        top3Share: 81.3,
        herfindahlIndex: 5100,
        concentrationLevel: "very_high",
      },
    ],
    complianceRates: [
      {
        sector: "manufacturing",
        sectorLabel: "Manufacturing",
        totalEntities: 89,
        compliantCount: 84,
        complianceRate: 94.4,
        expiringLicenses: 7,
        violationCount: 3,
      },
      {
        sector: "healthcare",
        sectorLabel: "Healthcare",
        totalEntities: 64,
        compliantCount: 63,
        complianceRate: 98.4,
        expiringLicenses: 2,
        violationCount: 0,
      },
      {
        sector: "construction",
        sectorLabel: "Construction",
        totalEntities: 52,
        compliantCount: 46,
        complianceRate: 88.5,
        expiringLicenses: 8,
        violationCount: 5,
      },
      {
        sector: "food_beverage",
        sectorLabel: "Food & Beverage",
        totalEntities: 47,
        compliantCount: 45,
        complianceRate: 95.7,
        expiringLicenses: 3,
        violationCount: 1,
      },
      {
        sector: "technology",
        sectorLabel: "Technology",
        totalEntities: 38,
        compliantCount: 37,
        complianceRate: 97.4,
        expiringLicenses: 1,
        violationCount: 0,
      },
      {
        sector: "retail",
        sectorLabel: "Retail",
        totalEntities: 31,
        compliantCount: 29,
        complianceRate: 93.5,
        expiringLicenses: 4,
        violationCount: 2,
      },
      {
        sector: "energy",
        sectorLabel: "Energy",
        totalEntities: 14,
        compliantCount: 12,
        complianceRate: 85.7,
        expiringLicenses: 3,
        violationCount: 2,
      },
      {
        sector: "agriculture",
        sectorLabel: "Agriculture",
        totalEntities: 7,
        compliantCount: 7,
        complianceRate: 100.0,
        expiringLicenses: 0,
        violationCount: 0,
      },
    ],
  };
}

export const useRegulatorDashboard = createGlobalState(() => {
  const loading = ref(false);
  const dashboardData = shallowRef<RegulatorDashboardDataType>({
    kpis: [],
    sectorSpend: [],
    priceBenchmarks: [],
    supplierConcentration: [],
    complianceRates: [],
  });

  const totalMarketplaceVolume = computed(() => {
    return dashboardData.value.sectorSpend.reduce((sum, sector) => sum + sector.totalSpend, 0);
  });

  const averageComplianceRate = computed(() => {
    const rates = dashboardData.value.complianceRates;
    if (!rates.length) {
      return 0;
    }
    return rates.reduce((sum, item) => sum + item.complianceRate, 0) / rates.length;
  });

  const highConcentrationSectors = computed(() => {
    return dashboardData.value.supplierConcentration.filter(
      (item) => item.concentrationLevel === "high" || item.concentrationLevel === "very_high",
    );
  });

  const totalPriceOutliers = computed(() => {
    return dashboardData.value.priceBenchmarks.reduce((sum, item) => sum + item.outlierCount, 0);
  });

  async function fetchDashboardData(): Promise<void> {
    loading.value = true;
    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 300));
      dashboardData.value = _buildMockData();
    } catch (err) {
      Logger.error("useRegulatorDashboard", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    dashboardData,
    totalMarketplaceVolume,
    averageComplianceRate,
    highConcentrationSectors,
    totalPriceOutliers,
    fetchDashboardData,
  };
});
