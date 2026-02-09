import { createGlobalState } from "@vueuse/core";
import { ref, shallowRef, readonly, computed } from "vue";
import { Logger } from "@/core/utilities";
import type {
  TenantConfigType,
  TenantBrandingType,
  EligibilityRuleType,
  DomainPlaybookType,
} from "../types";

function _buildMockTenants(): TenantConfigType[] {
  return [
    {
      id: "tenant-001",
      name: "MedSupply Hub",
      slug: "medsupply-hub",
      status: "active",
      domain: "healthcare",
      branding: {
        logoUrl: "/logos/medsupply.svg",
        faviconUrl: "/favicons/medsupply.ico",
        primaryColor: "#0E7490",
        secondaryColor: "#155E75",
        accentColor: "#22D3EE",
        fontFamily: "Inter",
      },
      domainConfig: {
        primaryDomain: "medsupply-hub.nexusmarket.com",
        customDomains: ["procurement.medsupply.com", "orders.medsupply.com"],
        sslEnabled: true,
        sslExpiresAt: "2027-03-15T00:00:00Z",
      },
      taxonomy: {
        id: "tax-med-001",
        name: "Healthcare Supplies",
        categories: ["Surgical Instruments", "Diagnostics", "PPE", "Pharmaceuticals", "Lab Equipment", "Patient Care"],
        customAttributes: [
          { key: "fda_class", label: "FDA Device Class", type: "select", required: true },
          { key: "sterile", label: "Sterile Product", type: "boolean", required: true },
          { key: "shelf_life_days", label: "Shelf Life (Days)", type: "number", required: false },
          { key: "lot_number", label: "Lot Number", type: "text", required: true },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-med-001",
          name: "Medical License Required",
          description: "Buyers must hold a valid medical facility license",
          ruleType: "license_required",
          condition: "buyer.licenses.includes('medical_facility')",
          action: "block",
          enabled: true,
          appliesTo: "buyers",
        },
        {
          id: "rule-med-002",
          name: "FDA Registration",
          description: "Sellers must have FDA establishment registration",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('fda_registered')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
        {
          id: "rule-med-003",
          name: "Minimum Seller Rating",
          description: "Sellers must maintain a 4.0+ average rating",
          ruleType: "minimum_rating",
          condition: "seller.rating >= 4.0",
          action: "flag_review",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      notificationTemplates: [
        {
          id: "tpl-med-001",
          name: "Order Confirmation",
          channel: "email",
          subject: "Order {{orderNumber}} Confirmed",
          templateBody: "Dear {{buyerName}}, your order {{orderNumber}} has been confirmed...",
          variables: ["buyerName", "orderNumber", "totalAmount", "estimatedDelivery"],
          enabled: true,
        },
        {
          id: "tpl-med-002",
          name: "License Expiry Warning",
          channel: "in_app",
          subject: "License Expiring Soon",
          templateBody: "Your {{licenseType}} license expires on {{expiryDate}}...",
          variables: ["licenseType", "expiryDate", "renewalUrl"],
          enabled: true,
        },
      ],
      analyticsConfig: {
        sharedAnalytics: true,
        customDashboard: true,
        exportEnabled: true,
        retentionDays: 365,
      },
      userCount: 1247,
      productCount: 8432,
      monthlyGmv: 2150000,
      currency: "USD",
      createdAt: "2024-06-15T10:00:00Z",
      updatedAt: "2026-02-05T14:30:00Z",
    },
    {
      id: "tenant-002",
      name: "BuildMart",
      slug: "buildmart",
      status: "active",
      domain: "construction",
      branding: {
        logoUrl: "/logos/buildmart.svg",
        faviconUrl: "/favicons/buildmart.ico",
        primaryColor: "#D97706",
        secondaryColor: "#92400E",
        accentColor: "#FCD34D",
        fontFamily: "Roboto",
      },
      domainConfig: {
        primaryDomain: "buildmart.nexusmarket.com",
        customDomains: ["shop.buildmart.com"],
        sslEnabled: true,
        sslExpiresAt: "2027-01-20T00:00:00Z",
      },
      taxonomy: {
        id: "tax-con-001",
        name: "Construction Materials",
        categories: ["Lumber", "Concrete", "Steel", "Electrical", "Plumbing", "HVAC", "Safety Equipment"],
        customAttributes: [
          { key: "grade", label: "Material Grade", type: "select", required: true },
          { key: "load_capacity", label: "Load Capacity (kg)", type: "number", required: false },
          { key: "fire_rating", label: "Fire Rating", type: "text", required: false },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-con-001",
          name: "Contractor License",
          description: "Buyers must hold a valid contractor license",
          ruleType: "license_required",
          condition: "buyer.licenses.includes('contractor')",
          action: "block",
          enabled: true,
          appliesTo: "buyers",
        },
        {
          id: "rule-con-002",
          name: "Region Restriction",
          description: "Only serve continental US regions",
          ruleType: "region_restricted",
          condition: "buyer.region in ['US-CONT']",
          action: "block",
          enabled: false,
          appliesTo: "both",
        },
      ],
      notificationTemplates: [
        {
          id: "tpl-con-001",
          name: "Delivery Scheduled",
          channel: "sms",
          subject: "Delivery Update",
          templateBody: "BuildMart: Order {{orderNumber}} delivery scheduled for {{deliveryDate}}.",
          variables: ["orderNumber", "deliveryDate", "siteAddress"],
          enabled: true,
        },
      ],
      analyticsConfig: {
        sharedAnalytics: true,
        customDashboard: false,
        exportEnabled: true,
        retentionDays: 180,
      },
      userCount: 856,
      productCount: 12540,
      monthlyGmv: 1830000,
      currency: "USD",
      createdAt: "2024-09-01T08:00:00Z",
      updatedAt: "2026-02-03T11:15:00Z",
    },
    {
      id: "tenant-003",
      name: "FreshTrade",
      slug: "freshtrade",
      status: "active",
      domain: "food_beverage",
      branding: {
        logoUrl: "/logos/freshtrade.svg",
        faviconUrl: "/favicons/freshtrade.ico",
        primaryColor: "#059669",
        secondaryColor: "#065F46",
        accentColor: "#34D399",
        fontFamily: "Nunito",
      },
      domainConfig: {
        primaryDomain: "freshtrade.nexusmarket.com",
        customDomains: ["wholesale.freshtrade.co", "b2b.freshtrade.co"],
        sslEnabled: true,
        sslExpiresAt: "2026-11-30T00:00:00Z",
      },
      taxonomy: {
        id: "tax-fb-001",
        name: "Food & Beverage",
        categories: ["Fresh Produce", "Dairy", "Meat & Seafood", "Beverages", "Dry Goods", "Frozen", "Bakery"],
        customAttributes: [
          { key: "organic", label: "Organic Certified", type: "boolean", required: true },
          { key: "allergens", label: "Allergen Info", type: "text", required: true },
          { key: "storage_temp", label: "Storage Temperature (C)", type: "number", required: true },
          { key: "expiry_days", label: "Days Until Expiry", type: "number", required: true },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-fb-001",
          name: "Food Safety Certification",
          description: "Sellers must hold HACCP or equivalent food safety certification",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('haccp')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
        {
          id: "rule-fb-002",
          name: "Cold Chain Compliance",
          description: "Sellers of perishables must demonstrate cold chain capability",
          ruleType: "custom",
          condition: "seller.capabilities.includes('cold_chain')",
          action: "flag_review",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      notificationTemplates: [
        {
          id: "tpl-fb-001",
          name: "Expiry Alert",
          channel: "push",
          subject: "Product Expiry Warning",
          templateBody: "{{productName}} in order {{orderNumber}} expires on {{expiryDate}}.",
          variables: ["productName", "orderNumber", "expiryDate"],
          enabled: true,
        },
        {
          id: "tpl-fb-002",
          name: "Quality Report",
          channel: "email",
          subject: "Weekly Quality Report - {{weekDate}}",
          templateBody: "Dear {{userName}}, here is your weekly quality summary...",
          variables: ["userName", "weekDate", "passRate", "issueCount"],
          enabled: true,
        },
      ],
      analyticsConfig: {
        sharedAnalytics: true,
        customDashboard: true,
        exportEnabled: true,
        retentionDays: 730,
      },
      userCount: 634,
      productCount: 5280,
      monthlyGmv: 1540000,
      currency: "USD",
      createdAt: "2025-01-10T12:00:00Z",
      updatedAt: "2026-02-07T09:45:00Z",
    },
    {
      id: "tenant-004",
      name: "TechProcure",
      slug: "techprocure",
      status: "pending",
      domain: "technology",
      branding: {
        logoUrl: "/logos/techprocure.svg",
        faviconUrl: "/favicons/techprocure.ico",
        primaryColor: "#7C3AED",
        secondaryColor: "#5B21B6",
        accentColor: "#A78BFA",
        fontFamily: "Source Sans Pro",
      },
      domainConfig: {
        primaryDomain: "techprocure.nexusmarket.com",
        customDomains: [],
        sslEnabled: true,
      },
      taxonomy: {
        id: "tax-tech-001",
        name: "Technology Products",
        categories: ["Hardware", "Software Licenses", "Networking", "Cloud Services", "Security", "Peripherals"],
        customAttributes: [
          { key: "warranty_months", label: "Warranty (Months)", type: "number", required: true },
          { key: "eol_date", label: "End of Life Date", type: "text", required: false },
          { key: "energy_star", label: "Energy Star Certified", type: "boolean", required: false },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-tech-001",
          name: "Authorized Reseller",
          description: "Sellers must be authorized resellers for listed brands",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('authorized_reseller')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      notificationTemplates: [
        {
          id: "tpl-tech-001",
          name: "License Renewal",
          channel: "email",
          subject: "Software License Renewal - {{productName}}",
          templateBody: "Your license for {{productName}} expires on {{expiryDate}}...",
          variables: ["productName", "expiryDate", "renewalPrice"],
          enabled: true,
        },
      ],
      analyticsConfig: {
        sharedAnalytics: false,
        customDashboard: false,
        exportEnabled: false,
        retentionDays: 90,
      },
      userCount: 0,
      productCount: 0,
      monthlyGmv: 0,
      currency: "USD",
      createdAt: "2026-01-28T16:00:00Z",
      updatedAt: "2026-02-01T10:00:00Z",
    },
    {
      id: "tenant-005",
      name: "AgriConnect",
      slug: "agriconnect",
      status: "active",
      domain: "agriculture",
      branding: {
        logoUrl: "/logos/agriconnect.svg",
        faviconUrl: "/favicons/agriconnect.ico",
        primaryColor: "#15803D",
        secondaryColor: "#14532D",
        accentColor: "#86EFAC",
        fontFamily: "Poppins",
      },
      domainConfig: {
        primaryDomain: "agriconnect.nexusmarket.com",
        customDomains: ["market.agriconnect.io"],
        sslEnabled: true,
        sslExpiresAt: "2027-06-01T00:00:00Z",
      },
      taxonomy: {
        id: "tax-agri-001",
        name: "Agricultural Products",
        categories: ["Seeds", "Fertilizers", "Equipment", "Pesticides", "Irrigation", "Livestock Feed"],
        customAttributes: [
          { key: "crop_type", label: "Crop Type", type: "select", required: true },
          { key: "organic_cert", label: "Organic Certification", type: "boolean", required: true },
          { key: "season", label: "Growing Season", type: "text", required: false },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-agri-001",
          name: "Agricultural License",
          description: "Sellers must hold a valid agricultural dealer license",
          ruleType: "license_required",
          condition: "seller.licenses.includes('agri_dealer')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
        {
          id: "rule-agri-002",
          name: "Pesticide Handling Cert",
          description: "Sellers of pesticides must have handling certification",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('pesticide_handler')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      notificationTemplates: [
        {
          id: "tpl-agri-001",
          name: "Seasonal Alert",
          channel: "push",
          subject: "Seasonal Product Update",
          templateBody: "New {{season}} products are now available in {{category}}.",
          variables: ["season", "category", "productCount"],
          enabled: true,
        },
      ],
      analyticsConfig: {
        sharedAnalytics: true,
        customDashboard: false,
        exportEnabled: true,
        retentionDays: 365,
      },
      userCount: 412,
      productCount: 3150,
      monthlyGmv: 980000,
      currency: "USD",
      createdAt: "2025-04-20T14:00:00Z",
      updatedAt: "2026-02-06T08:20:00Z",
    },
    {
      id: "tenant-006",
      name: "EnergyDirect",
      slug: "energydirect",
      status: "suspended",
      domain: "energy",
      branding: {
        logoUrl: "/logos/energydirect.svg",
        faviconUrl: "/favicons/energydirect.ico",
        primaryColor: "#DC2626",
        secondaryColor: "#991B1B",
        accentColor: "#FCA5A5",
        fontFamily: "Open Sans",
      },
      domainConfig: {
        primaryDomain: "energydirect.nexusmarket.com",
        customDomains: [],
        sslEnabled: true,
        sslExpiresAt: "2026-08-15T00:00:00Z",
      },
      taxonomy: {
        id: "tax-energy-001",
        name: "Energy Products",
        categories: ["Solar Panels", "Batteries", "Transformers", "Cabling", "Safety Gear", "Monitoring"],
        customAttributes: [
          { key: "voltage_rating", label: "Voltage Rating (V)", type: "number", required: true },
          { key: "efficiency", label: "Efficiency Rating", type: "text", required: false },
          { key: "hazmat", label: "Hazardous Material", type: "boolean", required: true },
        ],
      },
      eligibilityRules: [
        {
          id: "rule-en-001",
          name: "Hazmat Permit",
          description: "Sellers of hazardous materials must have valid permits",
          ruleType: "license_required",
          condition: "seller.licenses.includes('hazmat')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      notificationTemplates: [],
      analyticsConfig: {
        sharedAnalytics: false,
        customDashboard: false,
        exportEnabled: false,
        retentionDays: 90,
      },
      userCount: 78,
      productCount: 920,
      monthlyGmv: 0,
      currency: "USD",
      createdAt: "2025-07-01T09:00:00Z",
      updatedAt: "2026-01-15T17:00:00Z",
    },
  ];
}

function _buildMockPlaybooks(): DomainPlaybookType[] {
  return [
    {
      id: "playbook-healthcare",
      domain: "healthcare",
      name: "Healthcare & Medical Supplies",
      description: "Pre-configured marketplace template for medical devices, pharmaceuticals, and healthcare consumables with FDA compliance workflows built in.",
      defaultTaxonomy: {
        id: "tax-pb-med",
        name: "Healthcare Default",
        categories: ["Surgical", "Diagnostics", "PPE", "Pharmaceuticals", "Lab Equipment"],
        customAttributes: [
          { key: "fda_class", label: "FDA Device Class", type: "select", required: true },
          { key: "sterile", label: "Sterile Product", type: "boolean", required: true },
        ],
      },
      defaultRules: [
        {
          id: "pb-rule-med-001",
          name: "Medical License Required",
          description: "Buyers must hold a valid medical facility license",
          ruleType: "license_required",
          condition: "buyer.licenses.includes('medical_facility')",
          action: "block",
          enabled: true,
          appliesTo: "buyers",
        },
        {
          id: "pb-rule-med-002",
          name: "FDA Registration",
          description: "Sellers must have FDA establishment registration",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('fda_registered')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      defaultTemplates: [
        {
          id: "pb-tpl-med-001",
          name: "Order Confirmation",
          channel: "email",
          subject: "Order {{orderNumber}} Confirmed",
          templateBody: "Dear {{buyerName}}, your order has been confirmed...",
          variables: ["buyerName", "orderNumber", "totalAmount"],
          enabled: true,
        },
      ],
      recommendedModules: ["License Verification", "Cold Chain Tracking", "Recall Management", "Compliance Reporting"],
      sectorSpecificFields: [
        { key: "fda_class", label: "FDA Device Class", description: "FDA classification for medical devices" },
        { key: "ndc_code", label: "NDC Code", description: "National Drug Code for pharmaceuticals" },
        { key: "gtin", label: "GTIN/UDI", description: "Global Trade Item Number or Unique Device Identifier" },
      ],
    },
    {
      id: "playbook-construction",
      domain: "construction",
      name: "Construction & Building Materials",
      description: "Marketplace template optimized for construction materials, tools, and heavy equipment with contractor verification and job-site delivery workflows.",
      defaultTaxonomy: {
        id: "tax-pb-con",
        name: "Construction Default",
        categories: ["Lumber", "Concrete", "Steel", "Electrical", "Plumbing", "Tools"],
        customAttributes: [
          { key: "grade", label: "Material Grade", type: "select", required: true },
          { key: "load_capacity", label: "Load Capacity (kg)", type: "number", required: false },
        ],
      },
      defaultRules: [
        {
          id: "pb-rule-con-001",
          name: "Contractor License",
          description: "Buyers must hold a valid contractor license",
          ruleType: "license_required",
          condition: "buyer.licenses.includes('contractor')",
          action: "block",
          enabled: true,
          appliesTo: "buyers",
        },
      ],
      defaultTemplates: [
        {
          id: "pb-tpl-con-001",
          name: "Delivery Scheduled",
          channel: "sms",
          subject: "Delivery Update",
          templateBody: "Order {{orderNumber}} delivery scheduled for {{deliveryDate}}.",
          variables: ["orderNumber", "deliveryDate", "siteAddress"],
          enabled: true,
        },
      ],
      recommendedModules: ["Job Site Management", "Bulk Ordering", "Equipment Rental", "Safety Compliance"],
      sectorSpecificFields: [
        { key: "astm_standard", label: "ASTM Standard", description: "Applicable ASTM material standard" },
        { key: "fire_rating", label: "Fire Rating", description: "Fire resistance classification" },
        { key: "leed_points", label: "LEED Points", description: "Sustainability credits for green building" },
      ],
    },
    {
      id: "playbook-food",
      domain: "food_beverage",
      name: "Food & Beverage Wholesale",
      description: "Marketplace template for food distributors and wholesale buyers with cold chain management, allergen tracking, and expiry date workflows.",
      defaultTaxonomy: {
        id: "tax-pb-fb",
        name: "Food & Beverage Default",
        categories: ["Fresh Produce", "Dairy", "Meat & Seafood", "Beverages", "Dry Goods", "Frozen"],
        customAttributes: [
          { key: "organic", label: "Organic Certified", type: "boolean", required: true },
          { key: "allergens", label: "Allergen Info", type: "text", required: true },
          { key: "storage_temp", label: "Storage Temperature (C)", type: "number", required: true },
        ],
      },
      defaultRules: [
        {
          id: "pb-rule-fb-001",
          name: "Food Safety Certification",
          description: "Sellers must hold HACCP or equivalent food safety certification",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('haccp')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      defaultTemplates: [
        {
          id: "pb-tpl-fb-001",
          name: "Expiry Alert",
          channel: "push",
          subject: "Product Expiry Warning",
          templateBody: "{{productName}} expires on {{expiryDate}}.",
          variables: ["productName", "expiryDate"],
          enabled: true,
        },
      ],
      recommendedModules: ["Cold Chain Tracking", "Allergen Management", "Expiry Monitoring", "Quality Inspection"],
      sectorSpecificFields: [
        { key: "haccp_plan", label: "HACCP Plan ID", description: "Hazard Analysis Critical Control Point plan reference" },
        { key: "origin_country", label: "Country of Origin", description: "Food product origin for traceability" },
        { key: "batch_code", label: "Batch Code", description: "Production batch identifier" },
      ],
    },
    {
      id: "playbook-technology",
      domain: "technology",
      name: "IT & Technology Procurement",
      description: "Marketplace template for enterprise IT procurement with software license management, warranty tracking, and authorized reseller verification.",
      defaultTaxonomy: {
        id: "tax-pb-tech",
        name: "Technology Default",
        categories: ["Hardware", "Software", "Networking", "Cloud Services", "Security"],
        customAttributes: [
          { key: "warranty_months", label: "Warranty (Months)", type: "number", required: true },
          { key: "energy_star", label: "Energy Star Certified", type: "boolean", required: false },
        ],
      },
      defaultRules: [
        {
          id: "pb-rule-tech-001",
          name: "Authorized Reseller",
          description: "Sellers must be authorized resellers for listed brands",
          ruleType: "certification_required",
          condition: "seller.certifications.includes('authorized_reseller')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      defaultTemplates: [
        {
          id: "pb-tpl-tech-001",
          name: "License Renewal",
          channel: "email",
          subject: "Software License Renewal - {{productName}}",
          templateBody: "Your license for {{productName}} expires on {{expiryDate}}.",
          variables: ["productName", "expiryDate", "renewalPrice"],
          enabled: true,
        },
      ],
      recommendedModules: ["License Management", "Asset Tracking", "Warranty Management", "Vendor Portal"],
      sectorSpecificFields: [
        { key: "sku_manufacturer", label: "Manufacturer SKU", description: "Original manufacturer part number" },
        { key: "eol_date", label: "End-of-Life Date", description: "Product end of support/life date" },
        { key: "compatibility", label: "Compatibility", description: "System compatibility requirements" },
      ],
    },
    {
      id: "playbook-agriculture",
      domain: "agriculture",
      name: "Agriculture & Farming Supplies",
      description: "Marketplace template for agricultural inputs, equipment, and produce with seasonal planning, organic certification tracking, and farm-to-market workflows.",
      defaultTaxonomy: {
        id: "tax-pb-agri",
        name: "Agriculture Default",
        categories: ["Seeds", "Fertilizers", "Equipment", "Pesticides", "Irrigation", "Feed"],
        customAttributes: [
          { key: "crop_type", label: "Crop Type", type: "select", required: true },
          { key: "organic_cert", label: "Organic Certification", type: "boolean", required: true },
        ],
      },
      defaultRules: [
        {
          id: "pb-rule-agri-001",
          name: "Agricultural License",
          description: "Sellers must hold a valid agricultural dealer license",
          ruleType: "license_required",
          condition: "seller.licenses.includes('agri_dealer')",
          action: "block",
          enabled: true,
          appliesTo: "sellers",
        },
      ],
      defaultTemplates: [
        {
          id: "pb-tpl-agri-001",
          name: "Seasonal Alert",
          channel: "push",
          subject: "Seasonal Product Update",
          templateBody: "New {{season}} products available in {{category}}.",
          variables: ["season", "category", "productCount"],
          enabled: true,
        },
      ],
      recommendedModules: ["Seasonal Planning", "Soil Analysis Integration", "Weather Alerts", "Organic Verification"],
      sectorSpecificFields: [
        { key: "usda_zone", label: "USDA Zone", description: "Plant hardiness zone compatibility" },
        { key: "application_rate", label: "Application Rate", description: "Recommended application rate per acre" },
        { key: "harvest_window", label: "Harvest Window", description: "Optimal harvest timeframe" },
      ],
    },
  ];
}

export const useTenantConfig = createGlobalState(() => {
  const loading = ref(false);
  const tenants = shallowRef<TenantConfigType[]>([]);
  const playbooks = shallowRef<DomainPlaybookType[]>([]);
  const selectedTenant = ref<TenantConfigType | null>(null);

  const totalTenants = computed(() => tenants.value.length);
  const activeTenants = computed(() => tenants.value.filter((t) => t.status === "active").length);
  const totalUsers = computed(() => tenants.value.reduce((sum, t) => sum + t.userCount, 0));
  const platformGmv = computed(() => tenants.value.reduce((sum, t) => sum + t.monthlyGmv, 0));

  async function fetchTenants(): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      tenants.value = _buildMockTenants();
    } catch (err) {
      Logger.error("useTenantConfig.fetchTenants", err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchPlaybooks(): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      playbooks.value = _buildMockPlaybooks();
    } catch (err) {
      Logger.error("useTenantConfig.fetchPlaybooks", err);
    } finally {
      loading.value = false;
    }
  }

  function selectTenant(id: string): void {
    const tenant = tenants.value.find((t) => t.id === id);
    selectedTenant.value = tenant ?? null;
  }

  async function updateTenantBranding(id: string, branding: TenantBrandingType): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updated = tenants.value.map((t) =>
        t.id === id ? { ...t, branding, updatedAt: new Date().toISOString() } : t,
      );
      tenants.value = updated;
      if (selectedTenant.value?.id === id) {
        selectedTenant.value = { ...selectedTenant.value, branding, updatedAt: new Date().toISOString() };
      }
    } catch (err) {
      Logger.error("useTenantConfig.updateTenantBranding", err);
    } finally {
      loading.value = false;
    }
  }

  async function addEligibilityRule(tenantId: string, rule: EligibilityRuleType): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updated = tenants.value.map((t) => {
        if (t.id !== tenantId) {
          return t;
        }
        return {
          ...t,
          eligibilityRules: [...t.eligibilityRules, rule],
          updatedAt: new Date().toISOString(),
        };
      });
      tenants.value = updated;
      if (selectedTenant.value?.id === tenantId) {
        selectedTenant.value = updated.find((t) => t.id === tenantId) ?? null;
      }
    } catch (err) {
      Logger.error("useTenantConfig.addEligibilityRule", err);
    } finally {
      loading.value = false;
    }
  }

  async function toggleRule(tenantId: string, ruleId: string): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updated = tenants.value.map((t) => {
        if (t.id !== tenantId) {
          return t;
        }
        return {
          ...t,
          eligibilityRules: t.eligibilityRules.map((r) =>
            r.id === ruleId ? { ...r, enabled: !r.enabled } : r,
          ),
          updatedAt: new Date().toISOString(),
        };
      });
      tenants.value = updated;
      if (selectedTenant.value?.id === tenantId) {
        selectedTenant.value = updated.find((t) => t.id === tenantId) ?? null;
      }
    } catch (err) {
      Logger.error("useTenantConfig.toggleRule", err);
    } finally {
      loading.value = false;
    }
  }

  async function createTenantFromPlaybook(playbookId: string, name: string): Promise<void> {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const playbook = playbooks.value.find((p) => p.id === playbookId);
      if (!playbook) {
        return;
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newTenant: TenantConfigType = {
        id: `tenant-${Date.now()}`,
        name,
        slug,
        status: "pending",
        domain: playbook.domain,
        branding: {
          logoUrl: "",
          faviconUrl: "",
          primaryColor: "#3B82F6",
          secondaryColor: "#1E40AF",
          accentColor: "#93C5FD",
          fontFamily: "Inter",
        },
        domainConfig: {
          primaryDomain: `${slug}.nexusmarket.com`,
          customDomains: [],
          sslEnabled: true,
        },
        taxonomy: { ...playbook.defaultTaxonomy, id: `tax-${Date.now()}` },
        eligibilityRules: playbook.defaultRules.map((r) => ({ ...r, id: `rule-${Date.now()}-${r.id}` })),
        notificationTemplates: playbook.defaultTemplates.map((t) => ({ ...t, id: `tpl-${Date.now()}-${t.id}` })),
        analyticsConfig: {
          sharedAnalytics: false,
          customDashboard: false,
          exportEnabled: false,
          retentionDays: 90,
        },
        userCount: 0,
        productCount: 0,
        monthlyGmv: 0,
        currency: "USD",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      tenants.value = [...tenants.value, newTenant];
    } catch (err) {
      Logger.error("useTenantConfig.createTenantFromPlaybook", err);
    } finally {
      loading.value = false;
    }
  }

  // Auto-fetch on first use
  void fetchTenants();
  void fetchPlaybooks();

  return {
    loading: readonly(loading),
    tenants,
    playbooks,
    selectedTenant,
    totalTenants,
    activeTenants,
    totalUsers,
    platformGmv,
    fetchTenants,
    fetchPlaybooks,
    selectTenant,
    updateTenantBranding,
    addEligibilityRule,
    toggleRule,
    createTenantFromPlaybook,
  };
});
