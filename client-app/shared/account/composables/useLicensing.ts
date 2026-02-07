import { createGlobalState } from "@vueuse/core";
import { computed, readonly, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type { ComplianceCheckType, ComplianceSummaryType, EvidenceDocumentType, LicenseType } from "@/shared/account";

const MOCK_LICENSES: LicenseType[] = [
  {
    id: "lic-001",
    name: "General Business License",
    licenseNumber: "BL-2024-78432",
    type: "Business License",
    issuingAuthority: "City of Commerce Department",
    issueDate: "2024-01-15",
    expiryDate: "2026-01-15",
    status: "active",
    documentUrl: "/documents/business-license-2024.pdf",
    verifiedAt: "2024-01-20",
    verifiedBy: "Compliance Officer",
    notes: "Annual renewal required. Covers all general trade activities.",
  },
  {
    id: "lic-002",
    name: "Import Permit - Electronics",
    licenseNumber: "IP-2024-11298",
    type: "Import Permit",
    issuingAuthority: "Federal Trade Commission",
    issueDate: "2024-03-01",
    expiryDate: "2025-03-01",
    status: "expired",
    documentUrl: "/documents/import-permit-electronics.pdf",
    verifiedAt: "2024-03-05",
    verifiedBy: "Trade Compliance Team",
    notes: "Covers consumer electronics imports from approved regions.",
  },
  {
    id: "lic-003",
    name: "Health & Safety Certificate",
    licenseNumber: "HSC-2024-44521",
    type: "Health Certificate",
    issuingAuthority: "National Health Authority",
    issueDate: "2024-06-10",
    expiryDate: "2025-06-10",
    status: "expiring_soon",
    documentUrl: "/documents/health-safety-cert.pdf",
    verifiedAt: "2024-06-15",
    verifiedBy: "Health Inspector",
    notes: "Warehouse and distribution center compliance certificate.",
  },
  {
    id: "lic-004",
    name: "Environmental Compliance Permit",
    licenseNumber: "ECP-2024-33109",
    type: "Environmental Compliance",
    issuingAuthority: "Environmental Protection Agency",
    issueDate: "2024-04-20",
    expiryDate: "2026-04-20",
    status: "active",
    documentUrl: "/documents/env-compliance.pdf",
    verifiedAt: "2024-04-25",
    verifiedBy: "EPA Auditor",
    notes: "Covers waste disposal and emission standards for all facilities.",
  },
  {
    id: "lic-005",
    name: "Fire Safety Certificate",
    licenseNumber: "FSC-2024-55781",
    type: "Fire Safety",
    issuingAuthority: "Fire Marshal Office",
    issueDate: "2024-02-28",
    expiryDate: "2026-02-28",
    status: "active",
    verifiedAt: "2024-03-02",
    verifiedBy: "Fire Inspector",
    notes: "Annual inspection passed. Sprinkler and alarm systems compliant.",
  },
  {
    id: "lic-006",
    name: "Trade Registration Certificate",
    licenseNumber: "TRC-2024-90012",
    type: "Trade Registration",
    issuingAuthority: "Chamber of Commerce",
    issueDate: "2024-07-01",
    expiryDate: "2025-12-31",
    status: "pending",
    notes: "Renewal application submitted. Awaiting verification.",
  },
];

const MOCK_COMPLIANCE_CHECKS: ComplianceCheckType[] = [
  {
    id: "chk-001",
    name: "Business Registration Validity",
    category: "Trade",
    status: "passed",
    lastChecked: "2025-01-10",
    nextDue: "2025-07-10",
    description: "Verify that the business registration is current and valid in all operating jurisdictions.",
    requiredLicenseTypes: ["Business License", "Trade Registration"],
  },
  {
    id: "chk-002",
    name: "Import/Export Documentation",
    category: "Trade",
    status: "failed",
    lastChecked: "2025-01-15",
    nextDue: "2025-02-15",
    description: "Ensure all import permits are current for active product categories.",
    requiredLicenseTypes: ["Import Permit"],
  },
  {
    id: "chk-003",
    name: "Warehouse Safety Standards",
    category: "Health & Safety",
    status: "passed",
    lastChecked: "2025-01-05",
    nextDue: "2025-04-05",
    description: "Quarterly inspection of warehouse safety protocols and equipment.",
    requiredLicenseTypes: ["Health Certificate", "Fire Safety"],
  },
  {
    id: "chk-004",
    name: "Employee Safety Training",
    category: "Health & Safety",
    status: "passed",
    lastChecked: "2024-12-20",
    nextDue: "2025-06-20",
    description: "Verify all employees have completed mandatory safety training programs.",
  },
  {
    id: "chk-005",
    name: "Waste Disposal Compliance",
    category: "Environmental",
    status: "passed",
    lastChecked: "2025-01-08",
    nextDue: "2025-04-08",
    description: "Audit waste disposal methods and ensure compliance with environmental regulations.",
    requiredLicenseTypes: ["Environmental Compliance"],
  },
  {
    id: "chk-006",
    name: "Emissions Monitoring",
    category: "Environmental",
    status: "pending",
    lastChecked: "2024-10-15",
    nextDue: "2025-01-15",
    description: "Annual emissions monitoring and reporting for all operational facilities.",
    requiredLicenseTypes: ["Environmental Compliance"],
  },
  {
    id: "chk-007",
    name: "Data Protection Compliance",
    category: "Legal",
    status: "passed",
    lastChecked: "2025-01-12",
    nextDue: "2025-07-12",
    description: "GDPR and data protection regulation compliance audit.",
  },
  {
    id: "chk-008",
    name: "Anti-Money Laundering (AML)",
    category: "Legal",
    status: "passed",
    lastChecked: "2024-11-30",
    nextDue: "2025-05-30",
    description: "AML procedures and due diligence verification for all B2B transactions.",
  },
  {
    id: "chk-009",
    name: "Product Labeling Standards",
    category: "Trade",
    status: "passed",
    lastChecked: "2025-01-03",
    nextDue: "2025-07-03",
    description: "Verify product labeling meets regulatory requirements for all markets.",
  },
  {
    id: "chk-010",
    name: "Fire Safety Inspection",
    category: "Health & Safety",
    status: "not_applicable",
    description: "Remote-only operations exemption applied.",
    requiredLicenseTypes: ["Fire Safety"],
  },
];

const MOCK_DOCUMENTS: EvidenceDocumentType[] = [
  {
    id: "doc-001",
    name: "Business License 2024",
    fileName: "business-license-2024.pdf",
    fileSize: 245760,
    mimeType: "application/pdf",
    uploadedAt: "2024-01-20",
    uploadedBy: "John Smith",
    licenseId: "lic-001",
    category: "License",
    status: "verified",
  },
  {
    id: "doc-002",
    name: "Import Permit - Electronics",
    fileName: "import-permit-electronics.pdf",
    fileSize: 189440,
    mimeType: "application/pdf",
    uploadedAt: "2024-03-05",
    uploadedBy: "Jane Doe",
    licenseId: "lic-002",
    category: "Permit",
    status: "rejected",
  },
  {
    id: "doc-003",
    name: "Warehouse Safety Report Q4",
    fileName: "safety-report-q4-2024.pdf",
    fileSize: 512000,
    mimeType: "application/pdf",
    uploadedAt: "2025-01-05",
    uploadedBy: "Mike Wilson",
    category: "Report",
    status: "verified",
  },
  {
    id: "doc-004",
    name: "Environmental Audit Certificate",
    fileName: "env-audit-cert-2024.pdf",
    fileSize: 327680,
    mimeType: "application/pdf",
    uploadedAt: "2024-04-25",
    uploadedBy: "Sarah Johnson",
    licenseId: "lic-004",
    category: "Certificate",
    status: "verified",
  },
  {
    id: "doc-005",
    name: "Trade Registration Renewal",
    fileName: "trade-reg-renewal-2025.pdf",
    fileSize: 143360,
    mimeType: "application/pdf",
    uploadedAt: "2025-01-18",
    uploadedBy: "John Smith",
    licenseId: "lic-006",
    category: "Application",
    status: "uploaded",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function _useLicensing() {
  const loading = ref(false);
  const _licenses = shallowRef<LicenseType[]>([]);
  const _complianceChecks = shallowRef<ComplianceCheckType[]>([]);
  const _documents = shallowRef<EvidenceDocumentType[]>([]);

  const licenses = computed(() => _licenses.value);
  const complianceChecks = computed(() => _complianceChecks.value);
  const documents = computed(() => _documents.value);

  const complianceSummary = computed<ComplianceSummaryType>(() => {
    const checks = _complianceChecks.value;
    const lics = _licenses.value;

    const totalChecks = checks.filter((c) => c.status !== "not_applicable").length;
    const passed = checks.filter((c) => c.status === "passed").length;
    const failed = checks.filter((c) => c.status === "failed").length;
    const pending = checks.filter((c) => c.status === "pending").length;
    const overallScore = totalChecks > 0 ? Math.round((passed / totalChecks) * 100) : 0;

    const activeLicenses = lics.filter((l) => l.status === "active").length;
    const expiringLicenses = lics.filter((l) => l.status === "expiring_soon").length;
    const expiredLicenses = lics.filter((l) => l.status === "expired").length;

    return {
      totalChecks,
      passed,
      failed,
      pending,
      overallScore,
      activeLicenses,
      expiringLicenses,
      expiredLicenses,
    };
  });

  async function fetchLicenses(): Promise<void> {
    loading.value = true;

    try {
      await delay(300);
      _licenses.value = [...MOCK_LICENSES];
      _documents.value = [...MOCK_DOCUMENTS];
    } catch (e) {
      Logger.error(`${useLicensing.name}.${fetchLicenses.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchComplianceChecks(): Promise<void> {
    loading.value = true;

    try {
      await delay(300);
      _complianceChecks.value = [...MOCK_COMPLIANCE_CHECKS];
    } catch (e) {
      Logger.error(`${useLicensing.name}.${fetchComplianceChecks.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function uploadDocument(file: File, category: string, licenseId?: string): Promise<void> {
    loading.value = true;

    try {
      await delay(300);

      const newDoc: EvidenceDocumentType = {
        id: `doc-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString().split("T")[0],
        uploadedBy: "Current User",
        licenseId,
        category,
        status: "uploaded",
      };

      _documents.value = [..._documents.value, newDoc];
    } catch (e) {
      Logger.error(`${useLicensing.name}.${uploadDocument.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function removeLicense(id: string): Promise<void> {
    loading.value = true;

    try {
      await delay(300);
      _licenses.value = _licenses.value.filter((l) => l.id !== id);
      _documents.value = _documents.value.filter((d) => d.licenseId !== id);
    } catch (e) {
      Logger.error(`${useLicensing.name}.${removeLicense.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading: readonly(loading),
    licenses,
    complianceChecks,
    complianceSummary,
    documents,
    fetchLicenses,
    fetchComplianceChecks,
    uploadDocument,
    removeLicense,
  };
}

export const useLicensing = createGlobalState(_useLicensing);
