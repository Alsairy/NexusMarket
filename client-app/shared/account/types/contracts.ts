export type ContractStatusType = "draft" | "active" | "suspended" | "expired" | "terminated";

export type PricingTierType = {
  id: string;
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  discount: number; // percentage
};

export type ContractLineItemType = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  unit: string;
  committedQuantity: number;
  fulfilledQuantity: number;
  pricingTiers: PricingTierType[];
  currentPrice: number;
};

export type CallOffOrderType = {
  id: string;
  contractId: string;
  orderNumber: string;
  createdAt: string;
  status: "pending" | "approved" | "fulfilled" | "cancelled";
  lineItems: { productName: string; quantity: number; unitPrice: number; total: number }[];
  totalAmount: number;
};

export type PerformanceMetricType = {
  metric: string;
  target: number;
  actual: number;
  unit: string;
  status: "met" | "at_risk" | "breached";
};

export type DemandPoolType = {
  id: string;
  productCategory: string;
  totalDemand: number;
  participatingBuyers: number;
  currentBestPrice: number;
  nextTierQuantity: number;
  nextTierPrice: number;
  expiresAt: string;
};

export type FrameworkContractType = {
  id: string;
  contractNumber: string;
  title: string;
  supplierName: string;
  supplierId: string;
  status: ContractStatusType;
  startDate: string;
  endDate: string;
  totalValue: number;
  consumedValue: number;
  currency: string;
  lineItems: ContractLineItemType[];
  callOffOrders: CallOffOrderType[];
  performanceMetrics: PerformanceMetricType[];
  autoRenewal: boolean;
  penaltyClause?: string;
  createdAt: string;
  updatedAt: string;
};
