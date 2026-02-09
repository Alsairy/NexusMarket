import { createGlobalState } from "@vueuse/core";
import { ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type {
  TimePeriodType,
  AnalyticsDashboardDataType,
  MetricCardType,
  SalesDataPointType,
  TopProductType,
  OrderTrendType,
  PerformanceScoreType,
  SpendByCategoryType,
} from "@/shared/account";

function generateSalesData(days: number): SalesDataPointType[] {
  const data: SalesDataPointType[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRevenue = isWeekend ? 5000 : 8000;
    const variance = Math.floor(Math.random() * 7000);
    const baseOrders = isWeekend ? 3 : 5;
    const orderVariance = Math.floor(Math.random() * 3);

    data.push({
      date: dateStr,
      revenue: baseRevenue + variance,
      orders: baseOrders + orderVariance,
    });
  }

  return data;
}

function generateMetrics(): MetricCardType[] {
  return [
    {
      id: "total-revenue",
      label: "pages.account.analytics.metrics.total_revenue",
      value: 284530,
      previousValue: 261200,
      format: "currency",
      icon: "wallet",
      color: "primary",
    },
    {
      id: "total-orders",
      label: "pages.account.analytics.metrics.total_orders",
      value: 156,
      previousValue: 142,
      format: "number",
      icon: "clipboard-list",
      color: "success",
    },
    {
      id: "avg-order-value",
      label: "pages.account.analytics.metrics.avg_order_value",
      value: 1824,
      previousValue: 1840,
      format: "currency",
      icon: "chart",
      color: "info",
    },
    {
      id: "fulfillment-rate",
      label: "pages.account.analytics.metrics.fulfillment_rate",
      value: 96.8,
      previousValue: 95.2,
      format: "percentage",
      icon: "check-circle",
      color: "warning",
    },
  ];
}

function generateTopProducts(): TopProductType[] {
  return [
    { id: "p1", name: "Industrial Bearing Set", sku: "IBS-4420", totalSold: 342, revenue: 48960 },
    { id: "p2", name: "Safety Goggles Pack", sku: "SGP-1100", totalSold: 528, revenue: 31680 },
    { id: "p3", name: "Hydraulic Press HX-500", sku: "HPX-5000", totalSold: 12, revenue: 29400 },
    { id: "p4", name: "Steel Cable Spool 100m", sku: "SCS-1000", totalSold: 87, revenue: 26100 },
    { id: "p5", name: "Precision Drill Bit Kit", sku: "PDB-2250", totalSold: 156, revenue: 23400 },
    { id: "p6", name: "Welding Rod Bundle", sku: "WRB-3300", totalSold: 245, revenue: 19600 },
    { id: "p7", name: "Industrial Adhesive 5L", sku: "IAD-5050", totalSold: 189, revenue: 17010 },
    { id: "p8", name: "Thermal Insulation Roll", sku: "TIR-8800", totalSold: 64, revenue: 15360 },
  ];
}

function generateOrderTrends(): OrderTrendType[] {
  return [
    { period: "Oct 2025", total: 142, completed: 128, cancelled: 6, pending: 8 },
    { period: "Nov 2025", total: 158, completed: 140, cancelled: 8, pending: 10 },
    { period: "Dec 2025", total: 134, completed: 118, cancelled: 10, pending: 6 },
    { period: "Jan 2026", total: 167, completed: 152, cancelled: 5, pending: 10 },
    { period: "Feb 2026", total: 149, completed: 136, cancelled: 7, pending: 6 },
    { period: "Mar 2026", total: 156, completed: 143, cancelled: 4, pending: 9 },
  ];
}

function generatePerformanceScores(): PerformanceScoreType[] {
  return [
    { category: "pages.account.analytics.performance.order_fulfillment", score: 96, benchmark: 90, trend: "up" },
    { category: "pages.account.analytics.performance.delivery_timeliness", score: 88, benchmark: 85, trend: "up" },
    { category: "pages.account.analytics.performance.customer_satisfaction", score: 92, benchmark: 88, trend: "stable" },
    { category: "pages.account.analytics.performance.compliance_score", score: 94, benchmark: 90, trend: "up" },
    { category: "pages.account.analytics.performance.response_time", score: 85, benchmark: 82, trend: "down" },
  ];
}

function generateSpendByCategory(): SpendByCategoryType[] {
  return [
    { category: "pages.account.analytics.spend.raw_materials", amount: 99585, percentage: 35, color: "#4f46e5" },
    { category: "pages.account.analytics.spend.equipment", amount: 71133, percentage: 25, color: "#0891b2" },
    { category: "pages.account.analytics.spend.safety_supplies", amount: 42680, percentage: 15, color: "#16a34a" },
    { category: "pages.account.analytics.spend.packaging", amount: 34144, percentage: 12, color: "#ca8a04" },
    { category: "pages.account.analytics.spend.office_supplies", amount: 22762, percentage: 8, color: "#dc2626" },
    { category: "pages.account.analytics.spend.services", amount: 14227, percentage: 5, color: "#9333ea" },
  ];
}

function _useAnalytics() {
  const loading = ref(false);
  const selectedPeriod = ref<TimePeriodType>("30d");

  const dashboardData = shallowRef<AnalyticsDashboardDataType>({
    metrics: generateMetrics(),
    salesData: generateSalesData(30),
    topProducts: generateTopProducts(),
    orderTrends: generateOrderTrends(),
    performanceScores: generatePerformanceScores(),
    spendByCategory: generateSpendByCategory(),
  });

  async function fetchAnalytics(period: TimePeriodType): Promise<void> {
    try {
      loading.value = true;
      selectedPeriod.value = period;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const daysMap: Record<TimePeriodType, number> = {
        "7d": 7,
        "30d": 30,
        "90d": 90,
        "12m": 365,
      };

      dashboardData.value = {
        metrics: generateMetrics(),
        salesData: generateSalesData(daysMap[period]),
        topProducts: generateTopProducts(),
        orderTrends: generateOrderTrends(),
        performanceScores: generatePerformanceScores(),
        spendByCategory: generateSpendByCategory(),
      };
    } catch (e) {
      Logger.error(`${useAnalytics.name}.${fetchAnalytics.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    selectedPeriod,
    dashboardData,
    fetchAnalytics,
  };
}

export const useAnalytics = createGlobalState(_useAnalytics);
