export type RfqStatusType = "draft" | "published" | "evaluating" | "awarded" | "closed" | "cancelled";
export type BidStatusType = "submitted" | "under_review" | "shortlisted" | "accepted" | "rejected" | "withdrawn";

export type RfqLineItemType = {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  unit: string;
  specifications?: string;
  targetPrice?: number;
};

export type RfqRequirementType = {
  id: string;
  category: "technical" | "commercial" | "compliance" | "delivery";
  description: string;
  mandatory: boolean;
  weight: number; // 0-100 for scoring
};

export type RfqType = {
  id: string;
  referenceNumber: string;
  title: string;
  description: string;
  status: RfqStatusType;
  createdBy: string;
  createdAt: string;
  deadline: string;
  closedAt?: string;
  lineItems: RfqLineItemType[];
  requirements: RfqRequirementType[];
  invitedSuppliers: number;
  receivedBids: number;
  awardedTo?: string;
  totalBudget?: number;
  currency: string;
  sector: string;
};

export type BidType = {
  id: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  status: BidStatusType;
  submittedAt: string;
  totalAmount: number;
  currency: string;
  deliveryDays: number;
  lineItemPrices: { lineItemId: string; unitPrice: number; totalPrice: number }[];
  technicalScore?: number;
  commercialScore?: number;
  complianceScore?: number;
  overallScore?: number;
  notes?: string;
  attachments: number;
};

export type EvaluationCriterionType = {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
};

export type AwardRecommendationType = {
  bidId: string;
  supplierName: string;
  totalScore: number;
  totalAmount: number;
  rank: number;
  recommended: boolean;
  reasoning: string;
};
