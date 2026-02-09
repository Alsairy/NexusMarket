import { createGlobalState } from "@vueuse/core";
import { computed, readonly, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type { Ref, ComputedRef } from "vue";
import type {
  BusinessInfoType,
  LicenseVerificationType,
  OnboardingStepId,
  SupplierApplicationType,
  SupplierDocumentType,
} from "../types";

const STEP_DEFINITIONS: { id: OnboardingStepId; text: string }[] = [
  { id: "business_info", text: "Business Information" },
  { id: "documents", text: "Documents" },
  { id: "license_verification", text: "License Verification" },
  { id: "review", text: "Review & Submit" },
];

const DEFAULT_DOCUMENTS: SupplierDocumentType[] = [
  {
    id: "doc-1",
    name: "Business Registration Certificate",
    fileName: "",
    fileSize: 0,
    category: "registration",
    required: true,
    uploaded: false,
    status: "pending",
  },
  {
    id: "doc-2",
    name: "Tax Registration Document",
    fileName: "",
    fileSize: 0,
    category: "financial",
    required: true,
    uploaded: false,
    status: "pending",
  },
  {
    id: "doc-3",
    name: "Trade License",
    fileName: "",
    fileSize: 0,
    category: "license",
    required: true,
    uploaded: false,
    status: "pending",
  },
  {
    id: "doc-4",
    name: "Bank Statement",
    fileName: "",
    fileSize: 0,
    category: "financial",
    required: true,
    uploaded: false,
    status: "pending",
  },
  {
    id: "doc-5",
    name: "Product Catalog",
    fileName: "",
    fileSize: 0,
    category: "other",
    required: false,
    uploaded: false,
    status: "pending",
  },
  {
    id: "doc-6",
    name: "Quality Certifications",
    fileName: "",
    fileSize: 0,
    category: "certificate",
    required: false,
    uploaded: false,
    status: "pending",
  },
];

function createDefaultApplication(): SupplierApplicationType {
  return {
    id: crypto.randomUUID(),
    status: "draft",
    currentStep: "business_info",
    businessInfo: {
      companyName: "",
      registrationNumber: "",
      taxId: "",
      industry: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      description: "",
      employeeCount: "",
      annualRevenue: "",
    },
    documents: DEFAULT_DOCUMENTS.map((doc) => ({ ...doc })),
    licenses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function _useSupplierOnboarding() {
  const loading = ref(false);
  const _application = shallowRef<SupplierApplicationType>(createDefaultApplication());
  const currentStepIndex = ref(0);

  const application: ComputedRef<SupplierApplicationType> = computed(() => _application.value);

  const steps = computed(() =>
    STEP_DEFINITIONS.map((step, index) => ({
      ...step,
      completed: isStepCompleted(step.id, index),
    })),
  );

  const currentStepId = computed<OnboardingStepId>(() => STEP_DEFINITIONS[currentStepIndex.value].id);

  function isBusinessInfoValid(): boolean {
    const info = _application.value.businessInfo;
    return !!(
      info.companyName.trim() &&
      info.registrationNumber.trim() &&
      info.taxId.trim() &&
      info.industry.trim() &&
      info.country.trim() &&
      info.city.trim() &&
      info.address.trim() &&
      info.postalCode.trim() &&
      info.contactName.trim() &&
      info.contactEmail.trim() &&
      info.contactPhone.trim()
    );
  }

  function isDocumentsValid(): boolean {
    const requiredDocs = _application.value.documents.filter((doc) => doc.required);
    return requiredDocs.every((doc) => doc.uploaded);
  }

  function isLicenseVerificationValid(): boolean {
    return _application.value.licenses.length > 0;
  }

  function isStepCompleted(stepId: OnboardingStepId, _index: number): boolean {
    switch (stepId) {
      case "business_info":
        return isBusinessInfoValid();
      case "documents":
        return isDocumentsValid();
      case "license_verification":
        return isLicenseVerificationValid();
      case "review":
        return _application.value.status === "submitted";
      default:
        return false;
    }
  }

  const canProceed: ComputedRef<boolean> = computed(() => {
    switch (currentStepId.value) {
      case "business_info":
        return isBusinessInfoValid();
      case "documents":
        return isDocumentsValid();
      case "license_verification":
        return isLicenseVerificationValid();
      case "review":
        return isBusinessInfoValid() && isDocumentsValid() && isLicenseVerificationValid();
      default:
        return false;
    }
  });

  function updateBusinessInfo(data: Partial<BusinessInfoType>): void {
    _application.value = {
      ..._application.value,
      businessInfo: {
        ..._application.value.businessInfo,
        ...data,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async function uploadDocument(file: File, category: string): Promise<void> {
    try {
      loading.value = true;

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const docs = _application.value.documents.map((doc) => {
        if (doc.category === category && !doc.uploaded) {
          return {
            ...doc,
            fileName: file.name,
            fileSize: file.size,
            uploaded: true,
            status: "pending" as const,
          };
        }
        return doc;
      });

      // If no matching slot was found by category, update by first unuploaded required doc of that category
      // or just mark the first matching category
      _application.value = {
        ..._application.value,
        documents: docs,
        updatedAt: new Date().toISOString(),
      };
    } catch (e) {
      Logger.error(`useSupplierOnboarding.uploadDocument`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function uploadDocumentById(docId: string, file: File): void {
    const docs = _application.value.documents.map((doc) => {
      if (doc.id === docId) {
        return {
          ...doc,
          fileName: file.name,
          fileSize: file.size,
          uploaded: true,
          status: "pending" as const,
        };
      }
      return doc;
    });

    _application.value = {
      ..._application.value,
      documents: docs,
      updatedAt: new Date().toISOString(),
    };
  }

  function removeDocument(docId: string): void {
    const docs = _application.value.documents.map((doc) => {
      if (doc.id === docId) {
        return {
          ...doc,
          fileName: "",
          fileSize: 0,
          uploaded: false,
          status: "pending" as const,
        };
      }
      return doc;
    });

    _application.value = {
      ..._application.value,
      documents: docs,
      updatedAt: new Date().toISOString(),
    };
  }

  function addLicense(license: Omit<LicenseVerificationType, "id" | "verified" | "verificationStatus">): void {
    const newLicense: LicenseVerificationType = {
      ...license,
      id: crypto.randomUUID(),
      verified: false,
      verificationStatus: "pending",
    };

    _application.value = {
      ..._application.value,
      licenses: [..._application.value.licenses, newLicense],
      updatedAt: new Date().toISOString(),
    };
  }

  function removeLicense(licenseId: string): void {
    _application.value = {
      ..._application.value,
      licenses: _application.value.licenses.filter((l) => l.id !== licenseId),
      updatedAt: new Date().toISOString(),
    };
  }

  function goToNextStep(): void {
    if (currentStepIndex.value < STEP_DEFINITIONS.length - 1) {
      currentStepIndex.value++;
    }
  }

  function goToPreviousStep(): void {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--;
    }
  }

  function goToStep(index: number): void {
    if (index >= 0 && index < STEP_DEFINITIONS.length) {
      currentStepIndex.value = index;
    }
  }

  async function submitApplication(): Promise<void> {
    try {
      loading.value = true;

      // Simulate API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      _application.value = {
        ..._application.value,
        status: "submitted",
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (e) {
      Logger.error(`useSupplierOnboarding.submitApplication`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchApplication(): Promise<void> {
    try {
      loading.value = true;

      // Simulate API fetch delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, this would fetch from the API.
      // For demo purposes, we keep the current state.
    } catch (e) {
      Logger.error(`useSupplierOnboarding.fetchApplication`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading: readonly(loading) as Readonly<Ref<boolean>>,
    application,
    currentStepIndex,
    currentStepId,
    steps,
    canProceed,
    updateBusinessInfo,
    uploadDocument,
    uploadDocumentById,
    removeDocument,
    addLicense,
    removeLicense,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitApplication,
    fetchApplication,
  };
}

export const useSupplierOnboarding = createGlobalState(_useSupplierOnboarding);
