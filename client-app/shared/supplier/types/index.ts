export type SupplierApplicationStatusType = "draft" | "submitted" | "under_review" | "approved" | "rejected" | "requires_changes";

export type OnboardingStepId = "business_info" | "documents" | "license_verification" | "review";

export type BusinessInfoType = {
  companyName: string;
  registrationNumber: string;
  taxId: string;
  industry: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  description?: string;
  employeeCount?: string;
  annualRevenue?: string;
};

export type SupplierDocumentType = {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  category: "registration" | "license" | "certificate" | "financial" | "other";
  required: boolean;
  uploaded: boolean;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string;
};

export type LicenseVerificationType = {
  id: string;
  licenseType: string;
  licenseNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  verified: boolean;
  verificationStatus: "pending" | "verified" | "failed";
};

export type SupplierApplicationType = {
  id: string;
  status: SupplierApplicationStatusType;
  currentStep: OnboardingStepId;
  businessInfo: BusinessInfoType;
  documents: SupplierDocumentType[];
  licenses: LicenseVerificationType[];
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
};
