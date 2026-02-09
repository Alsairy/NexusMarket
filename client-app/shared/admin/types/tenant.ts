export type TenantStatusType = "active" | "suspended" | "pending" | "archived";
export type DomainType = "manufacturing" | "healthcare" | "construction" | "food_beverage" | "technology" | "retail" | "energy" | "agriculture" | "custom";

export type TenantBrandingType = {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  customCss?: string;
};

export type TenantDomainConfigType = {
  primaryDomain: string;
  customDomains: string[];
  sslEnabled: boolean;
  sslExpiresAt?: string;
};

export type TenantTaxonomyType = {
  id: string;
  name: string;
  categories: string[];
  customAttributes: { key: string; label: string; type: "text" | "number" | "boolean" | "select"; required: boolean }[];
};

export type EligibilityRuleType = {
  id: string;
  name: string;
  description: string;
  ruleType: "license_required" | "certification_required" | "region_restricted" | "minimum_rating" | "custom";
  condition: string;
  action: "allow" | "block" | "flag_review";
  enabled: boolean;
  appliesTo: "buyers" | "sellers" | "both";
};

export type NotificationTemplateType = {
  id: string;
  name: string;
  channel: "email" | "sms" | "push" | "in_app";
  subject: string;
  templateBody: string;
  variables: string[];
  enabled: boolean;
};

export type TenantAnalyticsConfigType = {
  sharedAnalytics: boolean;
  customDashboard: boolean;
  exportEnabled: boolean;
  retentionDays: number;
};

export type DomainPlaybookType = {
  id: string;
  domain: DomainType;
  name: string;
  description: string;
  defaultTaxonomy: TenantTaxonomyType;
  defaultRules: EligibilityRuleType[];
  defaultTemplates: NotificationTemplateType[];
  recommendedModules: string[];
  sectorSpecificFields: { key: string; label: string; description: string }[];
};

export type TenantConfigType = {
  id: string;
  name: string;
  slug: string;
  status: TenantStatusType;
  domain: DomainType;
  branding: TenantBrandingType;
  domainConfig: TenantDomainConfigType;
  taxonomy: TenantTaxonomyType;
  eligibilityRules: EligibilityRuleType[];
  notificationTemplates: NotificationTemplateType[];
  analyticsConfig: TenantAnalyticsConfigType;
  userCount: number;
  productCount: number;
  monthlyGmv: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};
