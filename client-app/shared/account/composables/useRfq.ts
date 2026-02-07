import { createGlobalState } from "@vueuse/core";
import { computed, readonly, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type {
  RfqType,
  RfqStatusType,
  BidType,
  AwardRecommendationType,
} from "../types";

function generateMockRfqs(): RfqType[] {
  return [
    {
      id: "rfq-001",
      referenceNumber: "RFQ-2026-0001",
      title: "Industrial Hydraulic Cylinders - Q2 Supply",
      description:
        "Seeking qualified suppliers for double-acting hydraulic cylinders for our manufacturing line. Units must meet ISO 6020/2 standards with bore sizes from 40mm to 125mm.",
      status: "published",
      createdBy: "Procurement Team",
      createdAt: "2026-01-15T09:00:00Z",
      deadline: "2026-02-28T23:59:59Z",
      lineItems: [
        {
          id: "li-001",
          productName: "Hydraulic Cylinder 40mm Bore",
          description: "Double-acting, 200mm stroke",
          quantity: 50,
          unit: "pcs",
          specifications: "ISO 6020/2, 250 bar rated",
          targetPrice: 320,
        },
        {
          id: "li-002",
          productName: "Hydraulic Cylinder 80mm Bore",
          description: "Double-acting, 400mm stroke",
          quantity: 30,
          unit: "pcs",
          specifications: "ISO 6020/2, 250 bar rated",
          targetPrice: 580,
        },
        {
          id: "li-003",
          productName: "Hydraulic Cylinder 125mm Bore",
          description: "Double-acting, 600mm stroke",
          quantity: 15,
          unit: "pcs",
          specifications: "ISO 6020/2, 350 bar rated",
          targetPrice: 950,
        },
      ],
      requirements: [
        { id: "req-001", category: "technical", description: "ISO 6020/2 certification required", mandatory: true, weight: 30 },
        { id: "req-002", category: "compliance", description: "CE marking and material traceability", mandatory: true, weight: 20 },
        { id: "req-003", category: "delivery", description: "Delivery within 6 weeks from PO", mandatory: false, weight: 25 },
        { id: "req-004", category: "commercial", description: "Volume discount for orders above 50 units", mandatory: false, weight: 25 },
      ],
      invitedSuppliers: 8,
      receivedBids: 5,
      totalBudget: 47650,
      currency: "USD",
      sector: "Manufacturing",
    },
    {
      id: "rfq-002",
      referenceNumber: "RFQ-2026-0002",
      title: "PPE Safety Equipment Annual Contract",
      description:
        "Annual framework agreement for personal protective equipment including safety helmets, goggles, gloves, and high-visibility vests for 3 warehouse locations.",
      status: "evaluating",
      createdBy: "Safety Department",
      createdAt: "2026-01-10T14:30:00Z",
      deadline: "2026-02-15T23:59:59Z",
      lineItems: [
        { id: "li-004", productName: "Safety Helmets Type II", description: "ANSI Z89.1 compliant", quantity: 500, unit: "pcs", targetPrice: 18 },
        { id: "li-005", productName: "Safety Goggles", description: "Anti-fog, splash resistant", quantity: 1000, unit: "pcs", targetPrice: 12 },
        { id: "li-006", productName: "Cut-Resistant Gloves", description: "Level A4, nitrile coated", quantity: 2000, unit: "pairs", targetPrice: 8 },
        { id: "li-007", productName: "High-Visibility Vests", description: "Class 3, ANSI 107", quantity: 800, unit: "pcs", targetPrice: 14 },
      ],
      requirements: [
        { id: "req-005", category: "compliance", description: "All products must meet ANSI/OSHA standards", mandatory: true, weight: 35 },
        { id: "req-006", category: "delivery", description: "Monthly delivery schedule across 3 locations", mandatory: true, weight: 20 },
        { id: "req-007", category: "commercial", description: "Price fixed for 12 months", mandatory: true, weight: 25 },
        { id: "req-008", category: "technical", description: "Product samples required within 2 weeks", mandatory: false, weight: 20 },
      ],
      invitedSuppliers: 12,
      receivedBids: 7,
      totalBudget: 51200,
      currency: "USD",
      sector: "Safety & Compliance",
    },
    {
      id: "rfq-003",
      referenceNumber: "RFQ-2026-0003",
      title: "CNC Machine Tooling Replacement Set",
      description:
        "Replacement tooling set for Mazak Integrex CNC machines. Requires carbide inserts, end mills, and drill bits from approved manufacturers.",
      status: "awarded",
      createdBy: "Production Engineering",
      createdAt: "2025-12-01T08:00:00Z",
      deadline: "2025-12-31T23:59:59Z",
      closedAt: "2026-01-08T10:15:00Z",
      lineItems: [
        { id: "li-008", productName: "Carbide Inserts CNMG 120408", description: "Grade IC8250, coated", quantity: 200, unit: "pcs", targetPrice: 6.5 },
        { id: "li-009", productName: "Solid Carbide End Mills 12mm", description: "4-flute, AlTiN coated", quantity: 50, unit: "pcs", targetPrice: 42 },
        { id: "li-010", productName: "Carbide Drill Bits Set", description: "3mm to 20mm range", quantity: 20, unit: "sets", targetPrice: 185 },
      ],
      requirements: [
        { id: "req-009", category: "technical", description: "Compatible with Mazak Integrex tooling system", mandatory: true, weight: 40 },
        { id: "req-010", category: "commercial", description: "Warranty minimum 6 months on all tooling", mandatory: true, weight: 20 },
        { id: "req-011", category: "delivery", description: "Full order delivery within 2 weeks", mandatory: true, weight: 25 },
        { id: "req-012", category: "compliance", description: "Material safety data sheets required", mandatory: false, weight: 15 },
      ],
      invitedSuppliers: 5,
      receivedBids: 4,
      awardedTo: "Precision Tools International",
      totalBudget: 7000,
      currency: "USD",
      sector: "Tooling & Machining",
    },
    {
      id: "rfq-004",
      referenceNumber: "RFQ-2026-0004",
      title: "Warehouse Racking System Expansion",
      description:
        "Heavy-duty pallet racking for new 5000 sqm warehouse zone. Includes selective racking, wire decking, and column protectors. Installation required.",
      status: "draft",
      createdBy: "Facilities Management",
      createdAt: "2026-02-01T11:00:00Z",
      deadline: "2026-03-15T23:59:59Z",
      lineItems: [
        { id: "li-011", productName: "Selective Pallet Rack Frames", description: "4.5m height, 1.1m depth, 2500kg capacity", quantity: 80, unit: "pcs", targetPrice: 290 },
        { id: "li-012", productName: "Pallet Rack Beams 2.7m", description: "Load capacity 3000kg per pair", quantity: 320, unit: "pcs", targetPrice: 45 },
        { id: "li-013", productName: "Wire Mesh Decking", description: "1350mm x 1100mm, 1000kg UDL", quantity: 160, unit: "pcs", targetPrice: 32 },
        { id: "li-014", productName: "Column Protectors", description: "Heavy-duty, bolt-down type", quantity: 80, unit: "pcs", targetPrice: 55 },
      ],
      requirements: [
        { id: "req-013", category: "technical", description: "AS 4084 compliant racking system", mandatory: true, weight: 30 },
        { id: "req-014", category: "delivery", description: "Staged delivery and installation over 4 weeks", mandatory: true, weight: 25 },
        { id: "req-015", category: "compliance", description: "Professional engineer certification required", mandatory: true, weight: 25 },
        { id: "req-016", category: "commercial", description: "Include 10-year structural warranty", mandatory: false, weight: 20 },
      ],
      invitedSuppliers: 0,
      receivedBids: 0,
      totalBudget: 46720,
      currency: "USD",
      sector: "Warehouse & Logistics",
    },
    {
      id: "rfq-005",
      referenceNumber: "RFQ-2026-0005",
      title: "Industrial Cleaning Services - Monthly Contract",
      description:
        "Monthly deep cleaning and maintenance services for manufacturing floor, offices, and loading docks. Must include hazardous waste handling capability.",
      status: "closed",
      createdBy: "Facilities Management",
      createdAt: "2025-11-01T09:00:00Z",
      deadline: "2025-11-30T23:59:59Z",
      closedAt: "2025-12-15T16:00:00Z",
      lineItems: [
        { id: "li-015", productName: "Manufacturing Floor Cleaning", description: "15000 sqm, bi-weekly deep clean", quantity: 24, unit: "sessions", targetPrice: 2200 },
        { id: "li-016", productName: "Office Area Cleaning", description: "5000 sqm, weekly service", quantity: 52, unit: "sessions", targetPrice: 650 },
        { id: "li-017", productName: "Loading Dock Cleaning", description: "Monthly pressure wash and degreasing", quantity: 12, unit: "sessions", targetPrice: 1800 },
      ],
      requirements: [
        { id: "req-017", category: "compliance", description: "Licensed hazardous waste handler", mandatory: true, weight: 35 },
        { id: "req-018", category: "technical", description: "Industrial cleaning equipment provided by supplier", mandatory: true, weight: 25 },
        { id: "req-019", category: "commercial", description: "Fixed monthly rate with quarterly review", mandatory: false, weight: 20 },
        { id: "req-020", category: "delivery", description: "24-hour emergency cleaning response", mandatory: false, weight: 20 },
      ],
      invitedSuppliers: 6,
      receivedBids: 3,
      awardedTo: "CleanTech Industrial Services",
      totalBudget: 108400,
      currency: "USD",
      sector: "Facility Services",
    },
    {
      id: "rfq-006",
      referenceNumber: "RFQ-2026-0006",
      title: "Electrical Cable & Wiring Supply",
      description:
        "Bulk order of electrical cables and wiring for plant expansion project. Includes armored cables, control cables, and flexible conduit.",
      status: "published",
      createdBy: "Electrical Engineering",
      createdAt: "2026-01-20T10:00:00Z",
      deadline: "2026-03-01T23:59:59Z",
      lineItems: [
        { id: "li-018", productName: "Armored Power Cable 4x95mm", description: "XLPE insulated, SWA", quantity: 2000, unit: "m", targetPrice: 28 },
        { id: "li-019", productName: "Control Cable 12-core 1.5mm", description: "PVC/SWA/PVC", quantity: 5000, unit: "m", targetPrice: 8.5 },
        { id: "li-020", productName: "Flexible Conduit 25mm", description: "Galvanized steel, PVC coated", quantity: 3000, unit: "m", targetPrice: 4.2 },
        { id: "li-021", productName: "Cable Glands Kit", description: "Brass, IP68 rated, assorted sizes", quantity: 100, unit: "kits", targetPrice: 45 },
      ],
      requirements: [
        { id: "req-021", category: "technical", description: "IEC 60502 compliant cables", mandatory: true, weight: 30 },
        { id: "req-022", category: "compliance", description: "Test certificates for each cable batch", mandatory: true, weight: 25 },
        { id: "req-023", category: "delivery", description: "Delivery in 3 staged shipments", mandatory: false, weight: 20 },
        { id: "req-024", category: "commercial", description: "Payment terms NET 60", mandatory: false, weight: 25 },
      ],
      invitedSuppliers: 10,
      receivedBids: 2,
      totalBudget: 115100,
      currency: "USD",
      sector: "Electrical & Power",
    },
    {
      id: "rfq-007",
      referenceNumber: "RFQ-2026-0007",
      title: "Stainless Steel Fasteners Bulk Order",
      description:
        "Quarterly supply of A2-70 and A4-80 stainless steel fasteners for production and maintenance. Requires full traceability and material certificates.",
      status: "cancelled",
      createdBy: "Procurement Team",
      createdAt: "2026-01-05T08:30:00Z",
      deadline: "2026-01-25T23:59:59Z",
      lineItems: [
        { id: "li-022", productName: "Hex Bolts M8x40 A2-70", description: "DIN 933, full thread", quantity: 5000, unit: "pcs", targetPrice: 0.18 },
        { id: "li-023", productName: "Hex Nuts M8 A2-70", description: "DIN 934", quantity: 5000, unit: "pcs", targetPrice: 0.08 },
        { id: "li-024", productName: "Socket Head Cap Screws M10x50 A4-80", description: "DIN 912", quantity: 2000, unit: "pcs", targetPrice: 0.35 },
      ],
      requirements: [
        { id: "req-025", category: "compliance", description: "EN 10204 3.1 material certificates", mandatory: true, weight: 30 },
        { id: "req-026", category: "technical", description: "Salt spray test results per ISO 9227", mandatory: false, weight: 25 },
        { id: "req-027", category: "delivery", description: "Weekly call-off delivery schedule", mandatory: false, weight: 20 },
        { id: "req-028", category: "commercial", description: "Price adjustment clause for raw material changes", mandatory: false, weight: 25 },
      ],
      invitedSuppliers: 4,
      receivedBids: 0,
      totalBudget: 2300,
      currency: "USD",
      sector: "Fasteners & Hardware",
    },
  ];
}

function generateMockBids(): BidType[] {
  return [
    // Bids for RFQ-001 (Hydraulic Cylinders - published)
    {
      id: "bid-001",
      rfqId: "rfq-001",
      supplierId: "sup-001",
      supplierName: "HydraForce Systems Ltd",
      status: "submitted",
      submittedAt: "2026-02-01T14:20:00Z",
      totalAmount: 44250,
      currency: "USD",
      deliveryDays: 35,
      lineItemPrices: [
        { lineItemId: "li-001", unitPrice: 295, totalPrice: 14750 },
        { lineItemId: "li-002", unitPrice: 540, totalPrice: 16200 },
        { lineItemId: "li-003", unitPrice: 887, totalPrice: 13300 },
      ],
      technicalScore: 88,
      commercialScore: 82,
      complianceScore: 95,
      overallScore: 87,
      notes: "Includes extended warranty and on-site commissioning support.",
      attachments: 4,
    },
    {
      id: "bid-002",
      rfqId: "rfq-001",
      supplierId: "sup-002",
      supplierName: "Parker Fluid Power Co",
      status: "submitted",
      submittedAt: "2026-02-03T09:45:00Z",
      totalAmount: 46800,
      currency: "USD",
      deliveryDays: 28,
      lineItemPrices: [
        { lineItemId: "li-001", unitPrice: 310, totalPrice: 15500 },
        { lineItemId: "li-002", unitPrice: 570, totalPrice: 17100 },
        { lineItemId: "li-003", unitPrice: 947, totalPrice: 14200 },
      ],
      technicalScore: 94,
      commercialScore: 76,
      complianceScore: 98,
      overallScore: 89,
      notes: "Premium grade cylinders with 3-year warranty.",
      attachments: 6,
    },
    {
      id: "bid-003",
      rfqId: "rfq-001",
      supplierId: "sup-003",
      supplierName: "Oriental Motion Technologies",
      status: "submitted",
      submittedAt: "2026-02-05T16:30:00Z",
      totalAmount: 38900,
      currency: "USD",
      deliveryDays: 45,
      lineItemPrices: [
        { lineItemId: "li-001", unitPrice: 260, totalPrice: 13000 },
        { lineItemId: "li-002", unitPrice: 480, totalPrice: 14400 },
        { lineItemId: "li-003", unitPrice: 767, totalPrice: 11500 },
      ],
      technicalScore: 72,
      commercialScore: 90,
      complianceScore: 80,
      overallScore: 79,
      attachments: 3,
    },
    // Bids for RFQ-002 (PPE - evaluating)
    {
      id: "bid-004",
      rfqId: "rfq-002",
      supplierId: "sup-004",
      supplierName: "SafeGuard Industrial Supplies",
      status: "shortlisted",
      submittedAt: "2026-01-25T11:00:00Z",
      totalAmount: 48500,
      currency: "USD",
      deliveryDays: 14,
      lineItemPrices: [
        { lineItemId: "li-004", unitPrice: 16.5, totalPrice: 8250 },
        { lineItemId: "li-005", unitPrice: 10.8, totalPrice: 10800 },
        { lineItemId: "li-006", unitPrice: 7.2, totalPrice: 14400 },
        { lineItemId: "li-007", unitPrice: 12.56, totalPrice: 10050 },
      ],
      technicalScore: 90,
      commercialScore: 88,
      complianceScore: 96,
      overallScore: 91,
      notes: "Full ANSI certification. Dedicated account manager for multi-site coordination.",
      attachments: 8,
    },
    {
      id: "bid-005",
      rfqId: "rfq-002",
      supplierId: "sup-005",
      supplierName: "3M Authorized Distributor",
      status: "shortlisted",
      submittedAt: "2026-01-28T08:15:00Z",
      totalAmount: 52100,
      currency: "USD",
      deliveryDays: 10,
      lineItemPrices: [
        { lineItemId: "li-004", unitPrice: 19.0, totalPrice: 9500 },
        { lineItemId: "li-005", unitPrice: 11.5, totalPrice: 11500 },
        { lineItemId: "li-006", unitPrice: 8.3, totalPrice: 16600 },
        { lineItemId: "li-007", unitPrice: 14.5, totalPrice: 11600 },
      ],
      technicalScore: 96,
      commercialScore: 74,
      complianceScore: 99,
      overallScore: 88,
      notes: "Premium 3M branded products. Express delivery available.",
      attachments: 5,
    },
    {
      id: "bid-006",
      rfqId: "rfq-002",
      supplierId: "sup-006",
      supplierName: "WorkSafe Equipment Co",
      status: "under_review",
      submittedAt: "2026-01-30T15:45:00Z",
      totalAmount: 42800,
      currency: "USD",
      deliveryDays: 21,
      lineItemPrices: [
        { lineItemId: "li-004", unitPrice: 14.0, totalPrice: 7000 },
        { lineItemId: "li-005", unitPrice: 9.5, totalPrice: 9500 },
        { lineItemId: "li-006", unitPrice: 6.4, totalPrice: 12800 },
        { lineItemId: "li-007", unitPrice: 11.25, totalPrice: 9000 },
      ],
      technicalScore: 78,
      commercialScore: 92,
      complianceScore: 85,
      overallScore: 84,
      attachments: 3,
    },
    {
      id: "bid-007",
      rfqId: "rfq-002",
      supplierId: "sup-007",
      supplierName: "GlobalSafe PPE Distributors",
      status: "under_review",
      submittedAt: "2026-02-02T10:00:00Z",
      totalAmount: 45300,
      currency: "USD",
      deliveryDays: 18,
      lineItemPrices: [
        { lineItemId: "li-004", unitPrice: 15.0, totalPrice: 7500 },
        { lineItemId: "li-005", unitPrice: 10.2, totalPrice: 10200 },
        { lineItemId: "li-006", unitPrice: 7.0, totalPrice: 14000 },
        { lineItemId: "li-007", unitPrice: 13.25, totalPrice: 10600 },
      ],
      technicalScore: 82,
      commercialScore: 86,
      complianceScore: 90,
      overallScore: 86,
      notes: "Bulk pricing available for extended contract terms.",
      attachments: 4,
    },
    // Bids for RFQ-003 (CNC Tooling - awarded)
    {
      id: "bid-008",
      rfqId: "rfq-003",
      supplierId: "sup-008",
      supplierName: "Precision Tools International",
      status: "accepted",
      submittedAt: "2025-12-15T09:30:00Z",
      totalAmount: 6420,
      currency: "USD",
      deliveryDays: 10,
      lineItemPrices: [
        { lineItemId: "li-008", unitPrice: 5.8, totalPrice: 1160 },
        { lineItemId: "li-009", unitPrice: 38, totalPrice: 1900 },
        { lineItemId: "li-010", unitPrice: 168, totalPrice: 3360 },
      ],
      technicalScore: 95,
      commercialScore: 90,
      complianceScore: 92,
      overallScore: 93,
      notes: "Authorized Sandvik and Kennametal distributor. Express stock available.",
      attachments: 5,
    },
    {
      id: "bid-009",
      rfqId: "rfq-003",
      supplierId: "sup-009",
      supplierName: "CutTech Tooling Solutions",
      status: "rejected",
      submittedAt: "2025-12-18T14:00:00Z",
      totalAmount: 5890,
      currency: "USD",
      deliveryDays: 21,
      lineItemPrices: [
        { lineItemId: "li-008", unitPrice: 5.2, totalPrice: 1040 },
        { lineItemId: "li-009", unitPrice: 35, totalPrice: 1750 },
        { lineItemId: "li-010", unitPrice: 155, totalPrice: 3100 },
      ],
      technicalScore: 70,
      commercialScore: 94,
      complianceScore: 68,
      overallScore: 76,
      attachments: 2,
    },
    // Bids for RFQ-005 (Cleaning Services - closed)
    {
      id: "bid-010",
      rfqId: "rfq-005",
      supplierId: "sup-010",
      supplierName: "CleanTech Industrial Services",
      status: "accepted",
      submittedAt: "2025-11-18T11:00:00Z",
      totalAmount: 98500,
      currency: "USD",
      deliveryDays: 7,
      lineItemPrices: [
        { lineItemId: "li-015", unitPrice: 2050, totalPrice: 49200 },
        { lineItemId: "li-016", unitPrice: 580, totalPrice: 30160 },
        { lineItemId: "li-017", unitPrice: 1595, totalPrice: 19140 },
      ],
      technicalScore: 92,
      commercialScore: 88,
      complianceScore: 97,
      overallScore: 92,
      notes: "Licensed hazardous waste handler. 15 years industry experience.",
      attachments: 7,
    },
    // Bids for RFQ-006 (Electrical Cable - published)
    {
      id: "bid-011",
      rfqId: "rfq-006",
      supplierId: "sup-011",
      supplierName: "CableTech Power Solutions",
      status: "submitted",
      submittedAt: "2026-02-05T09:00:00Z",
      totalAmount: 108750,
      currency: "USD",
      deliveryDays: 30,
      lineItemPrices: [
        { lineItemId: "li-018", unitPrice: 26.5, totalPrice: 53000 },
        { lineItemId: "li-019", unitPrice: 7.8, totalPrice: 39000 },
        { lineItemId: "li-020", unitPrice: 3.75, totalPrice: 11250 },
        { lineItemId: "li-021", unitPrice: 55, totalPrice: 5500 },
      ],
      technicalScore: 85,
      commercialScore: 88,
      complianceScore: 90,
      overallScore: 87,
      notes: "IEC certified manufacturing. Full test reports included per reel.",
      attachments: 4,
    },
    {
      id: "bid-012",
      rfqId: "rfq-006",
      supplierId: "sup-012",
      supplierName: "Nexans Distribution Partners",
      status: "submitted",
      submittedAt: "2026-02-07T13:30:00Z",
      totalAmount: 112400,
      currency: "USD",
      deliveryDays: 21,
      lineItemPrices: [
        { lineItemId: "li-018", unitPrice: 27.5, totalPrice: 55000 },
        { lineItemId: "li-019", unitPrice: 8.2, totalPrice: 41000 },
        { lineItemId: "li-020", unitPrice: 3.9, totalPrice: 11700 },
        { lineItemId: "li-021", unitPrice: 47, totalPrice: 4700 },
      ],
      technicalScore: 92,
      commercialScore: 80,
      complianceScore: 95,
      overallScore: 88,
      notes: "Premium Nexans products. Dedicated project coordinator assigned.",
      attachments: 6,
    },
  ];
}

function _useRfq() {
  const loading = ref(false);
  const rfqs = shallowRef<RfqType[]>([]);
  const bids = shallowRef<BidType[]>([]);

  const totalRfqs = computed(() => rfqs.value.length);
  const openRfqs = computed(() => rfqs.value.filter((r) => r.status === "published" || r.status === "evaluating").length);
  const avgBidsPerRfq = computed(() => {
    const withBids = rfqs.value.filter((r) => r.receivedBids > 0);
    if (withBids.length === 0) {
      return 0;
    }
    return Math.round(withBids.reduce((sum, r) => sum + r.receivedBids, 0) / withBids.length);
  });
  const totalAwardedValue = computed(() =>
    bids.value.filter((b) => b.status === "accepted").reduce((sum, b) => sum + b.totalAmount, 0),
  );

  async function fetchRfqs(): Promise<void> {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      rfqs.value = generateMockRfqs();
      bids.value = generateMockBids();
    } catch (e) {
      Logger.error(`${useRfq.name}.${fetchRfqs.name}`, e);
    } finally {
      loading.value = false;
    }
  }

  function fetchBidsForRfq(rfqId: string): BidType[] {
    return bids.value.filter((b) => b.rfqId === rfqId);
  }

  function getRfqById(rfqId: string): RfqType | undefined {
    return rfqs.value.find((r) => r.id === rfqId);
  }

  async function createRfq(data: Partial<RfqType>): Promise<RfqType> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newRfq: RfqType = {
        id: `rfq-${Date.now()}`,
        referenceNumber: `RFQ-2026-${String(rfqs.value.length + 1).padStart(4, "0")}`,
        title: data.title ?? "",
        description: data.description ?? "",
        status: "draft",
        createdBy: "Current User",
        createdAt: new Date().toISOString(),
        deadline: data.deadline ?? "",
        lineItems: data.lineItems ?? [],
        requirements: data.requirements ?? [],
        invitedSuppliers: 0,
        receivedBids: 0,
        totalBudget: data.totalBudget,
        currency: data.currency ?? "USD",
        sector: data.sector ?? "",
      };
      rfqs.value = [newRfq, ...rfqs.value];
      return newRfq;
    } catch (e) {
      Logger.error(`${useRfq.name}.${createRfq.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function submitBid(rfqId: string, data: Partial<BidType>): Promise<BidType> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newBid: BidType = {
        id: `bid-${Date.now()}`,
        rfqId,
        supplierId: data.supplierId ?? "",
        supplierName: data.supplierName ?? "",
        status: "submitted",
        submittedAt: new Date().toISOString(),
        totalAmount: data.totalAmount ?? 0,
        currency: data.currency ?? "USD",
        deliveryDays: data.deliveryDays ?? 0,
        lineItemPrices: data.lineItemPrices ?? [],
        attachments: data.attachments ?? 0,
      };
      bids.value = [...bids.value, newBid];

      // Update RFQ received bids count
      const rfq = rfqs.value.find((r) => r.id === rfqId);
      if (rfq) {
        rfq.receivedBids += 1;
        rfqs.value = [...rfqs.value];
      }

      return newBid;
    } catch (e) {
      Logger.error(`${useRfq.name}.${submitBid.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function evaluateBids(rfqId: string): Promise<AwardRecommendationType[]> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const rfqBids = bids.value.filter((b) => b.rfqId === rfqId);
      const scored = rfqBids
        .filter((b) => b.overallScore !== undefined)
        .sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0));

      const recommendations: AwardRecommendationType[] = scored.map((bid, index) => ({
        bidId: bid.id,
        supplierName: bid.supplierName,
        totalScore: bid.overallScore ?? 0,
        totalAmount: bid.totalAmount,
        rank: index + 1,
        recommended: index === 0,
        reasoning:
          index === 0
            ? "pages.account.rfq.evaluation.highest_score_reasoning"
            : "pages.account.rfq.evaluation.not_recommended_reasoning",
      }));

      // Update RFQ status to evaluating
      const rfq = rfqs.value.find((r) => r.id === rfqId);
      if (rfq && rfq.status === "published") {
        rfq.status = "evaluating";
        rfqs.value = [...rfqs.value];
      }

      return recommendations;
    } catch (e) {
      Logger.error(`${useRfq.name}.${evaluateBids.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function awardRfq(rfqId: string, bidId: string): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const winningBid = bids.value.find((b) => b.id === bidId);
      if (!winningBid) {
        return;
      }

      // Update the winning bid status
      const updatedBids = bids.value.map((b) => {
        if (b.id === bidId) {
          return { ...b, status: "accepted" as const };
        }
        if (b.rfqId === rfqId && b.id !== bidId) {
          return { ...b, status: "rejected" as const };
        }
        return b;
      });
      bids.value = updatedBids;

      // Update RFQ status
      const updatedRfqs = rfqs.value.map((r) => {
        if (r.id === rfqId) {
          return { ...r, status: "awarded" as const, awardedTo: winningBid.supplierName, closedAt: new Date().toISOString() };
        }
        return r;
      });
      rfqs.value = updatedRfqs;
    } catch (e) {
      Logger.error(`${useRfq.name}.${awardRfq.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Auto-fetch on init
  fetchRfqs();

  return {
    loading: readonly(loading),
    rfqs: readonly(rfqs),
    bids: readonly(bids),
    totalRfqs,
    openRfqs,
    avgBidsPerRfq,
    totalAwardedValue,
    fetchRfqs,
    fetchBidsForRfq,
    getRfqById,
    createRfq,
    submitBid,
    evaluateBids,
    awardRfq,
  };
}

export const useRfq = createGlobalState(_useRfq);
