export type EscrowStatusType = "pending" | "funded" | "in_progress" | "released" | "disputed" | "refunded";
export type MilestoneStatusType = "pending" | "in_progress" | "completed" | "approved" | "disputed";
export type PaymentMethodType = "bank_transfer" | "credit_card" | "escrow" | "bnpl" | "invoice_factoring";

export type EscrowTransactionType = {
  id: string;
  orderId: string;
  orderNumber: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  currency: string;
  status: EscrowStatusType;
  createdAt: string;
  fundedAt?: string;
  releasedAt?: string;
  releaseCondition: string;
  disputeReason?: string;
};

export type MilestoneType = {
  id: string;
  name: string;
  description: string;
  amount: number;
  percentage: number;
  status: MilestoneStatusType;
  dueDate: string;
  completedAt?: string;
  approvedAt?: string;
  evidence?: string;
};

export type MilestonePaymentPlanType = {
  id: string;
  contractId: string;
  contractTitle: string;
  totalAmount: number;
  currency: string;
  milestones: MilestoneType[];
  releasedAmount: number;
  pendingAmount: number;
};

export type InvoiceFactoringType = {
  id: string;
  invoiceNumber: string;
  invoiceAmount: number;
  factoredAmount: number;
  advanceRate: number; // percentage
  fee: number;
  currency: string;
  status: "submitted" | "approved" | "funded" | "settled" | "rejected";
  submittedAt: string;
  settledAt?: string;
  dueDate: string;
  buyerName: string;
};

export type BnplPlanType = {
  id: string;
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  installments: number;
  installmentAmount: number;
  interestRate: number;
  status: "active" | "completed" | "defaulted" | "cancelled";
  nextPaymentDate: string;
  paidInstallments: number;
  remainingBalance: number;
};

export type PaymentOverviewType = {
  totalEscrow: number;
  totalMilestone: number;
  totalFactored: number;
  totalBnpl: number;
  pendingReleases: number;
  disputedTransactions: number;
};
