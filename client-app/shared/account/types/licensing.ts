export type LicenseStatusType = "active" | "expired" | "pending" | "revoked" | "expiring_soon";

export type LicenseType = {
  id: string;
  name: string;
  licenseNumber: string;
  type: string; // e.g. "Business License", "Import Permit", "Health Certificate"
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  status: LicenseStatusType;
  documentUrl?: string;
  notes?: string;
  verifiedAt?: string;
  verifiedBy?: string;
};

export type ComplianceCheckType = {
  id: string;
  name: string;
  category: string; // e.g. "Trade", "Health & Safety", "Environmental"
  status: "passed" | "failed" | "pending" | "not_applicable";
  lastChecked?: string;
  nextDue?: string;
  description?: string;
  requiredLicenseTypes?: string[];
};

export type EvidenceDocumentType = {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  licenseId?: string;
  category: string;
  status: "uploaded" | "verified" | "rejected";
};

export type ComplianceSummaryType = {
  totalChecks: number;
  passed: number;
  failed: number;
  pending: number;
  overallScore: number; // 0-100
  activeLicenses: number;
  expiringLicenses: number;
  expiredLicenses: number;
};
