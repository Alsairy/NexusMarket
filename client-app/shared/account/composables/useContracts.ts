import { createGlobalState } from "@vueuse/core";
import { computed, readonly, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type {
  CallOffOrderType,
  DemandPoolType,
  FrameworkContractType,
} from "@/shared/account";

const MOCK_CONTRACTS: FrameworkContractType[] = [
  {
    id: "fc-001",
    contractNumber: "FC-2025-00142",
    title: "Office Supplies Annual Agreement",
    supplierName: "Global Office Solutions Ltd.",
    supplierId: "sup-001",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    totalValue: 250000,
    consumedValue: 87500,
    currency: "USD",
    lineItems: [
      {
        id: "li-001",
        productId: "prod-001",
        productName: "A4 Copy Paper (80gsm)",
        sku: "OFS-PAP-A4-80",
        unit: "ream",
        committedQuantity: 10000,
        fulfilledQuantity: 3500,
        pricingTiers: [
          { id: "pt-001", minQuantity: 1, maxQuantity: 999, unitPrice: 5.50, discount: 0 },
          { id: "pt-002", minQuantity: 1000, maxQuantity: 4999, unitPrice: 4.75, discount: 13.6 },
          { id: "pt-003", minQuantity: 5000, maxQuantity: 9999, unitPrice: 4.20, discount: 23.6 },
          { id: "pt-004", minQuantity: 10000, maxQuantity: 99999, unitPrice: 3.85, discount: 30.0 },
        ],
        currentPrice: 4.20,
      },
      {
        id: "li-002",
        productId: "prod-002",
        productName: "Ballpoint Pens (Black, Box of 50)",
        sku: "OFS-PEN-BLK-50",
        unit: "box",
        committedQuantity: 500,
        fulfilledQuantity: 210,
        pricingTiers: [
          { id: "pt-005", minQuantity: 1, maxQuantity: 49, unitPrice: 18.00, discount: 0 },
          { id: "pt-006", minQuantity: 50, maxQuantity: 199, unitPrice: 15.50, discount: 13.9 },
          { id: "pt-007", minQuantity: 200, maxQuantity: 499, unitPrice: 13.75, discount: 23.6 },
          { id: "pt-008", minQuantity: 500, maxQuantity: 99999, unitPrice: 12.00, discount: 33.3 },
        ],
        currentPrice: 13.75,
      },
      {
        id: "li-003",
        productId: "prod-003",
        productName: "Toner Cartridge HP-26A",
        sku: "OFS-TNR-HP26A",
        unit: "unit",
        committedQuantity: 200,
        fulfilledQuantity: 75,
        pricingTiers: [
          { id: "pt-009", minQuantity: 1, maxQuantity: 19, unitPrice: 85.00, discount: 0 },
          { id: "pt-010", minQuantity: 20, maxQuantity: 99, unitPrice: 72.50, discount: 14.7 },
          { id: "pt-011", minQuantity: 100, maxQuantity: 199, unitPrice: 65.00, discount: 23.5 },
          { id: "pt-012", minQuantity: 200, maxQuantity: 99999, unitPrice: 58.00, discount: 31.8 },
        ],
        currentPrice: 72.50,
      },
    ],
    callOffOrders: [
      {
        id: "co-001",
        contractId: "fc-001",
        orderNumber: "CO-2025-0321",
        createdAt: "2025-02-15",
        status: "fulfilled",
        lineItems: [
          { productName: "A4 Copy Paper (80gsm)", quantity: 2000, unitPrice: 4.75, total: 9500 },
          { productName: "Ballpoint Pens (Black, Box of 50)", quantity: 100, unitPrice: 15.50, total: 1550 },
        ],
        totalAmount: 11050,
      },
      {
        id: "co-002",
        contractId: "fc-001",
        orderNumber: "CO-2025-0487",
        createdAt: "2025-04-10",
        status: "fulfilled",
        lineItems: [
          { productName: "A4 Copy Paper (80gsm)", quantity: 1500, unitPrice: 4.75, total: 7125 },
          { productName: "Toner Cartridge HP-26A", quantity: 50, unitPrice: 72.50, total: 3625 },
        ],
        totalAmount: 10750,
      },
      {
        id: "co-003",
        contractId: "fc-001",
        orderNumber: "CO-2025-0612",
        createdAt: "2025-06-20",
        status: "approved",
        lineItems: [
          { productName: "Ballpoint Pens (Black, Box of 50)", quantity: 110, unitPrice: 15.50, total: 1705 },
          { productName: "Toner Cartridge HP-26A", quantity: 25, unitPrice: 72.50, total: 1812.50 },
        ],
        totalAmount: 3517.50,
      },
    ],
    performanceMetrics: [
      { metric: "On-Time Delivery", target: 95, actual: 97.2, unit: "%", status: "met" },
      { metric: "Quality Score", target: 98, actual: 99.1, unit: "%", status: "met" },
      { metric: "Fill Rate", target: 90, actual: 92, unit: "%", status: "met" },
      { metric: "Response Time", target: 24, actual: 18, unit: "hours", status: "met" },
    ],
    autoRenewal: true,
    penaltyClause: "2% discount on next order for each day beyond agreed delivery window, capped at 10%.",
    createdAt: "2024-11-15",
    updatedAt: "2025-06-20",
  },
  {
    id: "fc-002",
    contractNumber: "FC-2025-00198",
    title: "Industrial Equipment Maintenance Parts",
    supplierName: "Apex Industrial Components Inc.",
    supplierId: "sup-002",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    totalValue: 480000,
    consumedValue: 156000,
    currency: "USD",
    lineItems: [
      {
        id: "li-004",
        productId: "prod-004",
        productName: "Hydraulic Cylinder Seal Kit",
        sku: "AIC-HYD-SK-200",
        unit: "kit",
        committedQuantity: 600,
        fulfilledQuantity: 195,
        pricingTiers: [
          { id: "pt-013", minQuantity: 1, maxQuantity: 49, unitPrice: 145.00, discount: 0 },
          { id: "pt-014", minQuantity: 50, maxQuantity: 199, unitPrice: 128.50, discount: 11.4 },
          { id: "pt-015", minQuantity: 200, maxQuantity: 499, unitPrice: 115.00, discount: 20.7 },
          { id: "pt-016", minQuantity: 500, maxQuantity: 99999, unitPrice: 105.00, discount: 27.6 },
        ],
        currentPrice: 128.50,
      },
      {
        id: "li-005",
        productId: "prod-005",
        productName: "Industrial V-Belt (B68)",
        sku: "AIC-BLT-VB68",
        unit: "unit",
        committedQuantity: 1200,
        fulfilledQuantity: 390,
        pricingTiers: [
          { id: "pt-017", minQuantity: 1, maxQuantity: 99, unitPrice: 32.00, discount: 0 },
          { id: "pt-018", minQuantity: 100, maxQuantity: 499, unitPrice: 27.50, discount: 14.1 },
          { id: "pt-019", minQuantity: 500, maxQuantity: 999, unitPrice: 24.00, discount: 25.0 },
          { id: "pt-020", minQuantity: 1000, maxQuantity: 99999, unitPrice: 21.50, discount: 32.8 },
        ],
        currentPrice: 27.50,
      },
    ],
    callOffOrders: [
      {
        id: "co-004",
        contractId: "fc-002",
        orderNumber: "CO-2025-0550",
        createdAt: "2025-04-01",
        status: "fulfilled",
        lineItems: [
          { productName: "Hydraulic Cylinder Seal Kit", quantity: 100, unitPrice: 128.50, total: 12850 },
          { productName: "Industrial V-Belt (B68)", quantity: 200, unitPrice: 27.50, total: 5500 },
        ],
        totalAmount: 18350,
      },
      {
        id: "co-005",
        contractId: "fc-002",
        orderNumber: "CO-2025-0701",
        createdAt: "2025-05-22",
        status: "pending",
        lineItems: [
          { productName: "Hydraulic Cylinder Seal Kit", quantity: 95, unitPrice: 128.50, total: 12207.50 },
          { productName: "Industrial V-Belt (B68)", quantity: 190, unitPrice: 27.50, total: 5225 },
        ],
        totalAmount: 17432.50,
      },
    ],
    performanceMetrics: [
      { metric: "On-Time Delivery", target: 95, actual: 91.5, unit: "%", status: "at_risk" },
      { metric: "Quality Score", target: 99, actual: 98.8, unit: "%", status: "met" },
      { metric: "Fill Rate", target: 92, actual: 88, unit: "%", status: "at_risk" },
      { metric: "Response Time", target: 12, actual: 14, unit: "hours", status: "at_risk" },
    ],
    autoRenewal: false,
    createdAt: "2025-01-20",
    updatedAt: "2025-05-22",
  },
  {
    id: "fc-003",
    contractNumber: "FC-2024-00087",
    title: "IT Infrastructure & Services",
    supplierName: "TechVantage Solutions",
    supplierId: "sup-003",
    status: "expired",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    totalValue: 350000,
    consumedValue: 342800,
    currency: "USD",
    lineItems: [
      {
        id: "li-006",
        productId: "prod-006",
        productName: "Enterprise SSD 1TB",
        sku: "TVS-SSD-ENT-1T",
        unit: "unit",
        committedQuantity: 300,
        fulfilledQuantity: 285,
        pricingTiers: [
          { id: "pt-021", minQuantity: 1, maxQuantity: 24, unitPrice: 220.00, discount: 0 },
          { id: "pt-022", minQuantity: 25, maxQuantity: 99, unitPrice: 195.00, discount: 11.4 },
          { id: "pt-023", minQuantity: 100, maxQuantity: 299, unitPrice: 175.00, discount: 20.5 },
          { id: "pt-024", minQuantity: 300, maxQuantity: 99999, unitPrice: 160.00, discount: 27.3 },
        ],
        currentPrice: 175.00,
      },
      {
        id: "li-007",
        productId: "prod-007",
        productName: "Cat6A Network Cable (305m Box)",
        sku: "TVS-CBL-C6A-305",
        unit: "box",
        committedQuantity: 150,
        fulfilledQuantity: 148,
        pricingTiers: [
          { id: "pt-025", minQuantity: 1, maxQuantity: 9, unitPrice: 280.00, discount: 0 },
          { id: "pt-026", minQuantity: 10, maxQuantity: 49, unitPrice: 245.00, discount: 12.5 },
          { id: "pt-027", minQuantity: 50, maxQuantity: 149, unitPrice: 215.00, discount: 23.2 },
          { id: "pt-028", minQuantity: 150, maxQuantity: 99999, unitPrice: 195.00, discount: 30.4 },
        ],
        currentPrice: 215.00,
      },
    ],
    callOffOrders: [
      {
        id: "co-006",
        contractId: "fc-003",
        orderNumber: "CO-2024-1201",
        createdAt: "2024-03-15",
        status: "fulfilled",
        lineItems: [
          { productName: "Enterprise SSD 1TB", quantity: 150, unitPrice: 175.00, total: 26250 },
          { productName: "Cat6A Network Cable (305m Box)", quantity: 75, unitPrice: 215.00, total: 16125 },
        ],
        totalAmount: 42375,
      },
      {
        id: "co-007",
        contractId: "fc-003",
        orderNumber: "CO-2024-1589",
        createdAt: "2024-08-20",
        status: "fulfilled",
        lineItems: [
          { productName: "Enterprise SSD 1TB", quantity: 135, unitPrice: 175.00, total: 23625 },
          { productName: "Cat6A Network Cable (305m Box)", quantity: 73, unitPrice: 215.00, total: 15695 },
        ],
        totalAmount: 39320,
      },
    ],
    performanceMetrics: [
      { metric: "On-Time Delivery", target: 97, actual: 98.5, unit: "%", status: "met" },
      { metric: "Quality Score", target: 99.5, actual: 99.7, unit: "%", status: "met" },
      { metric: "Fill Rate", target: 95, actual: 96.7, unit: "%", status: "met" },
      { metric: "Response Time", target: 8, actual: 6, unit: "hours", status: "met" },
    ],
    autoRenewal: false,
    createdAt: "2023-11-01",
    updatedAt: "2024-12-31",
  },
  {
    id: "fc-004",
    contractNumber: "FC-2025-00215",
    title: "Janitorial & Cleaning Supplies",
    supplierName: "CleanPro Distributors",
    supplierId: "sup-004",
    status: "draft",
    startDate: "2025-08-01",
    endDate: "2026-07-31",
    totalValue: 120000,
    consumedValue: 0,
    currency: "USD",
    lineItems: [
      {
        id: "li-008",
        productId: "prod-008",
        productName: "Industrial Floor Cleaner (20L)",
        sku: "CPD-CLN-FLR-20",
        unit: "drum",
        committedQuantity: 400,
        fulfilledQuantity: 0,
        pricingTiers: [
          { id: "pt-029", minQuantity: 1, maxQuantity: 19, unitPrice: 65.00, discount: 0 },
          { id: "pt-030", minQuantity: 20, maxQuantity: 99, unitPrice: 56.00, discount: 13.8 },
          { id: "pt-031", minQuantity: 100, maxQuantity: 399, unitPrice: 48.50, discount: 25.4 },
          { id: "pt-032", minQuantity: 400, maxQuantity: 99999, unitPrice: 42.00, discount: 35.4 },
        ],
        currentPrice: 48.50,
      },
    ],
    callOffOrders: [],
    performanceMetrics: [],
    autoRenewal: true,
    createdAt: "2025-06-10",
    updatedAt: "2025-06-10",
  },
  {
    id: "fc-005",
    contractNumber: "FC-2025-00103",
    title: "Safety & PPE Equipment",
    supplierName: "SafeGuard Equipment Co.",
    supplierId: "sup-005",
    status: "suspended",
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    totalValue: 185000,
    consumedValue: 42000,
    currency: "USD",
    lineItems: [
      {
        id: "li-009",
        productId: "prod-009",
        productName: "Safety Helmet (Class E)",
        sku: "SGE-HLM-CE",
        unit: "unit",
        committedQuantity: 2000,
        fulfilledQuantity: 480,
        pricingTiers: [
          { id: "pt-033", minQuantity: 1, maxQuantity: 99, unitPrice: 28.00, discount: 0 },
          { id: "pt-034", minQuantity: 100, maxQuantity: 499, unitPrice: 24.00, discount: 14.3 },
          { id: "pt-035", minQuantity: 500, maxQuantity: 1999, unitPrice: 21.00, discount: 25.0 },
          { id: "pt-036", minQuantity: 2000, maxQuantity: 99999, unitPrice: 18.50, discount: 33.9 },
        ],
        currentPrice: 24.00,
      },
      {
        id: "li-010",
        productId: "prod-010",
        productName: "Nitrile Gloves (Box of 100)",
        sku: "SGE-GLV-NIT-100",
        unit: "box",
        committedQuantity: 5000,
        fulfilledQuantity: 1200,
        pricingTiers: [
          { id: "pt-037", minQuantity: 1, maxQuantity: 199, unitPrice: 14.00, discount: 0 },
          { id: "pt-038", minQuantity: 200, maxQuantity: 999, unitPrice: 12.00, discount: 14.3 },
          { id: "pt-039", minQuantity: 1000, maxQuantity: 4999, unitPrice: 10.50, discount: 25.0 },
          { id: "pt-040", minQuantity: 5000, maxQuantity: 99999, unitPrice: 9.00, discount: 35.7 },
        ],
        currentPrice: 10.50,
      },
    ],
    callOffOrders: [
      {
        id: "co-008",
        contractId: "fc-005",
        orderNumber: "CO-2025-0290",
        createdAt: "2025-03-05",
        status: "fulfilled",
        lineItems: [
          { productName: "Safety Helmet (Class E)", quantity: 480, unitPrice: 24.00, total: 11520 },
          { productName: "Nitrile Gloves (Box of 100)", quantity: 1200, unitPrice: 10.50, total: 12600 },
        ],
        totalAmount: 24120,
      },
      {
        id: "co-009",
        contractId: "fc-005",
        orderNumber: "CO-2025-0445",
        createdAt: "2025-04-18",
        status: "cancelled",
        lineItems: [
          { productName: "Safety Helmet (Class E)", quantity: 300, unitPrice: 24.00, total: 7200 },
        ],
        totalAmount: 7200,
      },
    ],
    performanceMetrics: [
      { metric: "On-Time Delivery", target: 95, actual: 78.4, unit: "%", status: "breached" },
      { metric: "Quality Score", target: 98, actual: 94.2, unit: "%", status: "breached" },
      { metric: "Fill Rate", target: 90, actual: 82, unit: "%", status: "breached" },
      { metric: "Response Time", target: 24, actual: 36, unit: "hours", status: "breached" },
    ],
    autoRenewal: false,
    penaltyClause: "Contract subject to immediate suspension upon consecutive delivery failures exceeding 15% of agreed SLA.",
    createdAt: "2025-01-05",
    updatedAt: "2025-05-01",
  },
  {
    id: "fc-006",
    contractNumber: "FC-2024-00055",
    title: "Packaging Materials & Supplies",
    supplierName: "PackRight Industries",
    supplierId: "sup-006",
    status: "terminated",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    totalValue: 95000,
    consumedValue: 31200,
    currency: "USD",
    lineItems: [
      {
        id: "li-011",
        productId: "prod-011",
        productName: "Corrugated Shipping Box (Medium)",
        sku: "PRI-BOX-CRG-M",
        unit: "unit",
        committedQuantity: 10000,
        fulfilledQuantity: 3200,
        pricingTiers: [
          { id: "pt-041", minQuantity: 1, maxQuantity: 499, unitPrice: 3.20, discount: 0 },
          { id: "pt-042", minQuantity: 500, maxQuantity: 2499, unitPrice: 2.75, discount: 14.1 },
          { id: "pt-043", minQuantity: 2500, maxQuantity: 9999, unitPrice: 2.35, discount: 26.6 },
          { id: "pt-044", minQuantity: 10000, maxQuantity: 99999, unitPrice: 2.00, discount: 37.5 },
        ],
        currentPrice: 2.75,
      },
    ],
    callOffOrders: [
      {
        id: "co-010",
        contractId: "fc-006",
        orderNumber: "CO-2024-0890",
        createdAt: "2024-07-15",
        status: "fulfilled",
        lineItems: [
          { productName: "Corrugated Shipping Box (Medium)", quantity: 3200, unitPrice: 2.75, total: 8800 },
        ],
        totalAmount: 8800,
      },
    ],
    performanceMetrics: [
      { metric: "On-Time Delivery", target: 95, actual: 62.0, unit: "%", status: "breached" },
      { metric: "Quality Score", target: 97, actual: 88.5, unit: "%", status: "breached" },
      { metric: "Fill Rate", target: 90, actual: 55, unit: "%", status: "breached" },
      { metric: "Response Time", target: 24, actual: 72, unit: "hours", status: "breached" },
    ],
    autoRenewal: false,
    penaltyClause: "Terminated due to persistent SLA breaches per clause 8.3 of the master agreement.",
    createdAt: "2024-04-20",
    updatedAt: "2025-01-15",
  },
];

const MOCK_DEMAND_POOLS: DemandPoolType[] = [
  {
    id: "dp-001",
    productCategory: "Office Paper & Stationery",
    totalDemand: 45000,
    participatingBuyers: 12,
    currentBestPrice: 4.20,
    nextTierQuantity: 50000,
    nextTierPrice: 3.85,
    expiresAt: "2025-08-15T23:59:59Z",
  },
  {
    id: "dp-002",
    productCategory: "Industrial Bearings & Seals",
    totalDemand: 8200,
    participatingBuyers: 7,
    currentBestPrice: 42.50,
    nextTierQuantity: 10000,
    nextTierPrice: 38.00,
    expiresAt: "2025-07-31T23:59:59Z",
  },
  {
    id: "dp-003",
    productCategory: "IT Networking Equipment",
    totalDemand: 1500,
    participatingBuyers: 9,
    currentBestPrice: 215.00,
    nextTierQuantity: 2000,
    nextTierPrice: 195.00,
    expiresAt: "2025-09-01T23:59:59Z",
  },
  {
    id: "dp-004",
    productCategory: "PPE & Safety Equipment",
    totalDemand: 25000,
    participatingBuyers: 18,
    currentBestPrice: 10.50,
    nextTierQuantity: 30000,
    nextTierPrice: 9.00,
    expiresAt: "2025-07-20T23:59:59Z",
  },
  {
    id: "dp-005",
    productCategory: "Cleaning & Janitorial Supplies",
    totalDemand: 3800,
    participatingBuyers: 5,
    currentBestPrice: 56.00,
    nextTierQuantity: 5000,
    nextTierPrice: 48.50,
    expiresAt: "2025-10-01T23:59:59Z",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function _useContracts() {
  const loading = ref(false);
  const _contracts = shallowRef<FrameworkContractType[]>([]);
  const _demandPools = shallowRef<DemandPoolType[]>([]);

  const contracts = computed(() => _contracts.value);
  const demandPools = computed(() => _demandPools.value);

  const activeContracts = computed(() => _contracts.value.filter((c) => c.status === "active"));

  const totalCommittedValue = computed(() =>
    _contracts.value.reduce((sum, c) => sum + c.totalValue, 0),
  );

  const avgFulfillmentRate = computed(() => {
    const contractsWithItems = _contracts.value.filter((c) => c.lineItems.length > 0);
    if (contractsWithItems.length === 0) {
      return 0;
    }
    const totalRate = contractsWithItems.reduce((sum, contract) => {
      const committed = contract.lineItems.reduce((s, li) => s + li.committedQuantity, 0);
      const fulfilled = contract.lineItems.reduce((s, li) => s + li.fulfilledQuantity, 0);
      return sum + (committed > 0 ? (fulfilled / committed) * 100 : 0);
    }, 0);
    return Math.round(totalRate / contractsWithItems.length);
  });

  const expiringSoonCount = computed(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return _contracts.value.filter((c) => {
      if (c.status !== "active") {
        return false;
      }
      const endDate = new Date(c.endDate);
      return endDate <= thirtyDaysFromNow && endDate >= now;
    }).length;
  });

  async function fetchContracts(): Promise<void> {
    loading.value = true;

    try {
      await delay(400);
      _contracts.value = [...MOCK_CONTRACTS];
    } catch (e) {
      Logger.error(`${useContracts.name}.${fetchContracts.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchDemandPools(): Promise<void> {
    loading.value = true;

    try {
      await delay(300);
      _demandPools.value = [...MOCK_DEMAND_POOLS];
    } catch (e) {
      Logger.error(`${useContracts.name}.${fetchDemandPools.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function createCallOffOrder(
    contractId: string,
    items: { productName: string; quantity: number; unitPrice: number; total: number }[],
  ): Promise<CallOffOrderType> {
    loading.value = true;

    try {
      await delay(400);

      const contract = _contracts.value.find((c) => c.id === contractId);
      if (!contract) {
        throw new Error(`Contract ${contractId} not found`);
      }

      const newOrder: CallOffOrderType = {
        id: `co-${Date.now()}`,
        contractId,
        orderNumber: `CO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        createdAt: new Date().toISOString().split("T")[0],
        status: "pending",
        lineItems: items,
        totalAmount: items.reduce((sum, item) => sum + item.total, 0),
      };

      const updatedContract = {
        ...contract,
        callOffOrders: [...contract.callOffOrders, newOrder],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      _contracts.value = _contracts.value.map((c) => (c.id === contractId ? updatedContract : c));

      return newOrder;
    } catch (e) {
      Logger.error(`${useContracts.name}.${createCallOffOrder.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function joinDemandPool(poolId: string): Promise<void> {
    loading.value = true;

    try {
      await delay(300);

      const pool = _demandPools.value.find((p) => p.id === poolId);
      if (!pool) {
        throw new Error(`Demand pool ${poolId} not found`);
      }

      _demandPools.value = _demandPools.value.map((p) =>
        p.id === poolId
          ? { ...p, participatingBuyers: p.participatingBuyers + 1 }
          : p,
      );
    } catch (e) {
      Logger.error(`${useContracts.name}.${joinDemandPool.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading: readonly(loading),
    contracts,
    demandPools,
    activeContracts,
    totalCommittedValue,
    avgFulfillmentRate,
    expiringSoonCount,
    fetchContracts,
    fetchDemandPools,
    createCallOffOrder,
    joinDemandPool,
  };
}

export const useContracts = createGlobalState(_useContracts);
