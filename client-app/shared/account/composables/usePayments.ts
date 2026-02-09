import { createGlobalState } from "@vueuse/core";
import { computed, ref, shallowRef } from "vue";
import { Logger } from "@/core/utilities";
import type {
  EscrowTransactionType,
  MilestonePaymentPlanType,
  InvoiceFactoringType,
  BnplPlanType,
  PaymentOverviewType,
} from "@/shared/account";

function generateEscrowTransactions(): EscrowTransactionType[] {
  return [
    {
      id: "esc-001",
      orderId: "ord-2840",
      orderNumber: "PO-2840",
      buyerName: "Apex Manufacturing Co.",
      sellerName: "Global Steel Supply",
      amount: 125000,
      currency: "USD",
      status: "funded",
      createdAt: "2026-01-15T10:30:00Z",
      fundedAt: "2026-01-16T09:00:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_delivery_confirmation",
    },
    {
      id: "esc-002",
      orderId: "ord-2856",
      orderNumber: "PO-2856",
      buyerName: "TechBuild Industries",
      sellerName: "Precision Parts Ltd.",
      amount: 78500,
      currency: "USD",
      status: "in_progress",
      createdAt: "2026-01-20T14:15:00Z",
      fundedAt: "2026-01-21T08:45:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_quality_inspection",
    },
    {
      id: "esc-003",
      orderId: "ord-2791",
      orderNumber: "PO-2791",
      buyerName: "Harbor Logistics Group",
      sellerName: "Industrial Coatings Inc.",
      amount: 245000,
      currency: "USD",
      status: "released",
      createdAt: "2025-12-10T11:00:00Z",
      fundedAt: "2025-12-11T10:00:00Z",
      releasedAt: "2026-01-08T16:30:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_milestone_completion",
    },
    {
      id: "esc-004",
      orderId: "ord-2901",
      orderNumber: "PO-2901",
      buyerName: "Summit Engineering",
      sellerName: "RawMat Distributors",
      amount: 52000,
      currency: "USD",
      status: "disputed",
      createdAt: "2026-01-25T09:20:00Z",
      fundedAt: "2026-01-26T08:00:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_delivery_confirmation",
      disputeReason: "pages.account.payments.escrow.dispute_quality_mismatch",
    },
    {
      id: "esc-005",
      orderId: "ord-2920",
      orderNumber: "PO-2920",
      buyerName: "Meridian Construction",
      sellerName: "BulkChem Supplies",
      amount: 189000,
      currency: "USD",
      status: "pending",
      createdAt: "2026-02-01T13:45:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_installation_complete",
    },
    {
      id: "esc-006",
      orderId: "ord-2750",
      orderNumber: "PO-2750",
      buyerName: "NorthWest Fabricators",
      sellerName: "ElectroParts Wholesale",
      amount: 34500,
      currency: "USD",
      status: "refunded",
      createdAt: "2025-11-28T08:10:00Z",
      fundedAt: "2025-11-29T09:00:00Z",
      releaseCondition: "pages.account.payments.escrow.condition_delivery_confirmation",
      disputeReason: "pages.account.payments.escrow.dispute_order_cancelled",
    },
  ];
}

function generateMilestonePlans(): MilestonePaymentPlanType[] {
  return [
    {
      id: "mp-001",
      contractId: "ctr-4410",
      contractTitle: "pages.account.payments.milestones.contract_warehouse_automation",
      totalAmount: 480000,
      currency: "USD",
      releasedAmount: 192000,
      pendingAmount: 288000,
      milestones: [
        {
          id: "ms-001-1",
          name: "pages.account.payments.milestones.milestone_design_approval",
          description: "pages.account.payments.milestones.milestone_design_approval_desc",
          amount: 48000,
          percentage: 10,
          status: "approved",
          dueDate: "2025-11-15T00:00:00Z",
          completedAt: "2025-11-12T00:00:00Z",
          approvedAt: "2025-11-14T00:00:00Z",
        },
        {
          id: "ms-001-2",
          name: "pages.account.payments.milestones.milestone_equipment_procurement",
          description: "pages.account.payments.milestones.milestone_equipment_procurement_desc",
          amount: 144000,
          percentage: 30,
          status: "approved",
          dueDate: "2025-12-20T00:00:00Z",
          completedAt: "2025-12-18T00:00:00Z",
          approvedAt: "2025-12-19T00:00:00Z",
        },
        {
          id: "ms-001-3",
          name: "pages.account.payments.milestones.milestone_installation",
          description: "pages.account.payments.milestones.milestone_installation_desc",
          amount: 144000,
          percentage: 30,
          status: "in_progress",
          dueDate: "2026-02-28T00:00:00Z",
        },
        {
          id: "ms-001-4",
          name: "pages.account.payments.milestones.milestone_testing_commissioning",
          description: "pages.account.payments.milestones.milestone_testing_commissioning_desc",
          amount: 96000,
          percentage: 20,
          status: "pending",
          dueDate: "2026-03-30T00:00:00Z",
        },
        {
          id: "ms-001-5",
          name: "pages.account.payments.milestones.milestone_final_acceptance",
          description: "pages.account.payments.milestones.milestone_final_acceptance_desc",
          amount: 48000,
          percentage: 10,
          status: "pending",
          dueDate: "2026-04-15T00:00:00Z",
        },
      ],
    },
    {
      id: "mp-002",
      contractId: "ctr-4425",
      contractTitle: "pages.account.payments.milestones.contract_fleet_upgrade",
      totalAmount: 320000,
      currency: "USD",
      releasedAmount: 96000,
      pendingAmount: 224000,
      milestones: [
        {
          id: "ms-002-1",
          name: "pages.account.payments.milestones.milestone_initial_deposit",
          description: "pages.account.payments.milestones.milestone_initial_deposit_desc",
          amount: 96000,
          percentage: 30,
          status: "approved",
          dueDate: "2026-01-10T00:00:00Z",
          completedAt: "2026-01-08T00:00:00Z",
          approvedAt: "2026-01-09T00:00:00Z",
        },
        {
          id: "ms-002-2",
          name: "pages.account.payments.milestones.milestone_first_batch_delivery",
          description: "pages.account.payments.milestones.milestone_first_batch_delivery_desc",
          amount: 128000,
          percentage: 40,
          status: "in_progress",
          dueDate: "2026-02-20T00:00:00Z",
        },
        {
          id: "ms-002-3",
          name: "pages.account.payments.milestones.milestone_final_delivery_training",
          description: "pages.account.payments.milestones.milestone_final_delivery_training_desc",
          amount: 96000,
          percentage: 30,
          status: "pending",
          dueDate: "2026-03-15T00:00:00Z",
        },
      ],
    },
    {
      id: "mp-003",
      contractId: "ctr-4438",
      contractTitle: "pages.account.payments.milestones.contract_hvac_overhaul",
      totalAmount: 175000,
      currency: "USD",
      releasedAmount: 175000,
      pendingAmount: 0,
      milestones: [
        {
          id: "ms-003-1",
          name: "pages.account.payments.milestones.milestone_site_assessment",
          description: "pages.account.payments.milestones.milestone_site_assessment_desc",
          amount: 17500,
          percentage: 10,
          status: "approved",
          dueDate: "2025-10-15T00:00:00Z",
          completedAt: "2025-10-14T00:00:00Z",
          approvedAt: "2025-10-15T00:00:00Z",
        },
        {
          id: "ms-003-2",
          name: "pages.account.payments.milestones.milestone_equipment_delivery",
          description: "pages.account.payments.milestones.milestone_equipment_delivery_desc",
          amount: 87500,
          percentage: 50,
          status: "approved",
          dueDate: "2025-11-30T00:00:00Z",
          completedAt: "2025-11-28T00:00:00Z",
          approvedAt: "2025-11-30T00:00:00Z",
        },
        {
          id: "ms-003-3",
          name: "pages.account.payments.milestones.milestone_installation_complete",
          description: "pages.account.payments.milestones.milestone_installation_complete_desc",
          amount: 52500,
          percentage: 30,
          status: "approved",
          dueDate: "2026-01-10T00:00:00Z",
          completedAt: "2026-01-09T00:00:00Z",
          approvedAt: "2026-01-10T00:00:00Z",
        },
        {
          id: "ms-003-4",
          name: "pages.account.payments.milestones.milestone_warranty_sign_off",
          description: "pages.account.payments.milestones.milestone_warranty_sign_off_desc",
          amount: 17500,
          percentage: 10,
          status: "approved",
          dueDate: "2026-01-31T00:00:00Z",
          completedAt: "2026-01-30T00:00:00Z",
          approvedAt: "2026-01-31T00:00:00Z",
        },
      ],
    },
    {
      id: "mp-004",
      contractId: "ctr-4452",
      contractTitle: "pages.account.payments.milestones.contract_it_infrastructure",
      totalAmount: 95000,
      currency: "USD",
      releasedAmount: 0,
      pendingAmount: 95000,
      milestones: [
        {
          id: "ms-004-1",
          name: "pages.account.payments.milestones.milestone_network_design",
          description: "pages.account.payments.milestones.milestone_network_design_desc",
          amount: 19000,
          percentage: 20,
          status: "in_progress",
          dueDate: "2026-02-28T00:00:00Z",
        },
        {
          id: "ms-004-2",
          name: "pages.account.payments.milestones.milestone_hardware_deployment",
          description: "pages.account.payments.milestones.milestone_hardware_deployment_desc",
          amount: 47500,
          percentage: 50,
          status: "pending",
          dueDate: "2026-03-31T00:00:00Z",
        },
        {
          id: "ms-004-3",
          name: "pages.account.payments.milestones.milestone_go_live",
          description: "pages.account.payments.milestones.milestone_go_live_desc",
          amount: 28500,
          percentage: 30,
          status: "pending",
          dueDate: "2026-04-30T00:00:00Z",
        },
      ],
    },
  ];
}

function generateFactoringRequests(): InvoiceFactoringType[] {
  return [
    {
      id: "fac-001",
      invoiceNumber: "INV-8840",
      invoiceAmount: 92000,
      factoredAmount: 82800,
      advanceRate: 90,
      fee: 2760,
      currency: "USD",
      status: "funded",
      submittedAt: "2026-01-10T09:00:00Z",
      dueDate: "2026-03-10T00:00:00Z",
      buyerName: "Apex Manufacturing Co.",
    },
    {
      id: "fac-002",
      invoiceNumber: "INV-8856",
      invoiceAmount: 156000,
      factoredAmount: 140400,
      advanceRate: 90,
      fee: 4680,
      currency: "USD",
      status: "approved",
      submittedAt: "2026-01-22T14:30:00Z",
      dueDate: "2026-04-22T00:00:00Z",
      buyerName: "Harbor Logistics Group",
    },
    {
      id: "fac-003",
      invoiceNumber: "INV-8801",
      invoiceAmount: 45000,
      factoredAmount: 38250,
      advanceRate: 85,
      fee: 1350,
      currency: "USD",
      status: "settled",
      submittedAt: "2025-12-05T11:15:00Z",
      settledAt: "2026-01-28T00:00:00Z",
      dueDate: "2026-02-05T00:00:00Z",
      buyerName: "TechBuild Industries",
    },
    {
      id: "fac-004",
      invoiceNumber: "INV-8870",
      invoiceAmount: 210000,
      factoredAmount: 189000,
      advanceRate: 90,
      fee: 6300,
      currency: "USD",
      status: "submitted",
      submittedAt: "2026-02-01T08:45:00Z",
      dueDate: "2026-05-01T00:00:00Z",
      buyerName: "Summit Engineering",
    },
    {
      id: "fac-005",
      invoiceNumber: "INV-8812",
      invoiceAmount: 18500,
      factoredAmount: 0,
      advanceRate: 0,
      fee: 0,
      currency: "USD",
      status: "rejected",
      submittedAt: "2025-12-15T16:00:00Z",
      dueDate: "2026-02-15T00:00:00Z",
      buyerName: "NorthWest Fabricators",
    },
  ];
}

function generateBnplPlans(): BnplPlanType[] {
  return [
    {
      id: "bnpl-001",
      orderId: "ord-2870",
      orderNumber: "PO-2870",
      totalAmount: 36000,
      currency: "USD",
      installments: 6,
      installmentAmount: 6180,
      interestRate: 3.0,
      status: "active",
      nextPaymentDate: "2026-02-15T00:00:00Z",
      paidInstallments: 2,
      remainingBalance: 24720,
    },
    {
      id: "bnpl-002",
      orderId: "ord-2835",
      orderNumber: "PO-2835",
      totalAmount: 84000,
      currency: "USD",
      installments: 12,
      installmentAmount: 7210,
      interestRate: 2.5,
      status: "active",
      nextPaymentDate: "2026-02-20T00:00:00Z",
      paidInstallments: 5,
      remainingBalance: 50470,
    },
    {
      id: "bnpl-003",
      orderId: "ord-2710",
      orderNumber: "PO-2710",
      totalAmount: 22000,
      currency: "USD",
      installments: 4,
      installmentAmount: 5610,
      interestRate: 2.0,
      status: "completed",
      nextPaymentDate: "2025-12-01T00:00:00Z",
      paidInstallments: 4,
      remainingBalance: 0,
    },
    {
      id: "bnpl-004",
      orderId: "ord-2915",
      orderNumber: "PO-2915",
      totalAmount: 150000,
      currency: "USD",
      installments: 12,
      installmentAmount: 12875,
      interestRate: 3.0,
      status: "active",
      nextPaymentDate: "2026-03-01T00:00:00Z",
      paidInstallments: 1,
      remainingBalance: 141625,
    },
  ];
}

function _usePayments() {
  const loading = ref(false);

  const escrowTransactions = shallowRef<EscrowTransactionType[]>(generateEscrowTransactions());
  const milestonePlans = shallowRef<MilestonePaymentPlanType[]>(generateMilestonePlans());
  const factoringRequests = shallowRef<InvoiceFactoringType[]>(generateFactoringRequests());
  const bnplPlans = shallowRef<BnplPlanType[]>(generateBnplPlans());

  const overview = computed<PaymentOverviewType>(() => {
    const escrowTotal = escrowTransactions.value
      .filter((e) => e.status === "funded" || e.status === "in_progress")
      .reduce((sum, e) => sum + e.amount, 0);

    const milestoneTotal = milestonePlans.value.reduce((sum, p) => sum + p.totalAmount, 0);

    const factoredTotal = factoringRequests.value
      .filter((f) => f.status === "funded" || f.status === "approved")
      .reduce((sum, f) => sum + f.factoredAmount, 0);

    const bnplTotal = bnplPlans.value
      .filter((b) => b.status === "active")
      .reduce((sum, b) => sum + b.remainingBalance, 0);

    const pendingReleases = escrowTransactions.value.filter(
      (e) => e.status === "funded" || e.status === "in_progress",
    ).length;

    const disputedTransactions = escrowTransactions.value.filter((e) => e.status === "disputed").length;

    return {
      totalEscrow: escrowTotal,
      totalMilestone: milestoneTotal,
      totalFactored: factoredTotal,
      totalBnpl: bnplTotal,
      pendingReleases,
      disputedTransactions,
    };
  });

  async function fetchPayments(): Promise<void> {
    try {
      loading.value = true;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      escrowTransactions.value = generateEscrowTransactions();
      milestonePlans.value = generateMilestonePlans();
      factoringRequests.value = generateFactoringRequests();
      bnplPlans.value = generateBnplPlans();
    } catch (e) {
      Logger.error(`${usePayments.name}.${fetchPayments.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function releaseEscrow(id: string): Promise<void> {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));

      escrowTransactions.value = escrowTransactions.value.map((tx) =>
        tx.id === id
          ? { ...tx, status: "released" as const, releasedAt: new Date().toISOString() }
          : tx,
      );
    } catch (e) {
      Logger.error(`${usePayments.name}.${releaseEscrow.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function approveMilestone(planId: string, milestoneId: string): Promise<void> {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));

      milestonePlans.value = milestonePlans.value.map((plan) => {
        if (plan.id !== planId) {
          return plan;
        }

        const updatedMilestones = plan.milestones.map((ms) =>
          ms.id === milestoneId
            ? { ...ms, status: "approved" as const, approvedAt: new Date().toISOString() }
            : ms,
        );

        const newReleasedAmount = updatedMilestones
          .filter((ms) => ms.status === "approved")
          .reduce((sum, ms) => sum + ms.amount, 0);

        return {
          ...plan,
          milestones: updatedMilestones,
          releasedAmount: newReleasedAmount,
          pendingAmount: plan.totalAmount - newReleasedAmount,
        };
      });
    } catch (e) {
      Logger.error(`${usePayments.name}.${approveMilestone.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function disputeEscrow(id: string, reason: string): Promise<void> {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));

      escrowTransactions.value = escrowTransactions.value.map((tx) =>
        tx.id === id ? { ...tx, status: "disputed" as const, disputeReason: reason } : tx,
      );
    } catch (e) {
      Logger.error(`${usePayments.name}.${disputeEscrow.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function submitFactoringRequest(invoiceId: string): Promise<void> {
    try {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));

      factoringRequests.value = factoringRequests.value.map((req) =>
        req.id === invoiceId ? { ...req, status: "submitted" as const } : req,
      );
    } catch (e) {
      Logger.error(`${usePayments.name}.${submitFactoringRequest.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Auto-fetch on init
  fetchPayments();

  return {
    loading,
    escrowTransactions,
    milestonePlans,
    factoringRequests,
    bnplPlans,
    overview,
    fetchPayments,
    releaseEscrow,
    approveMilestone,
    disputeEscrow,
    submitFactoringRequest,
  };
}

export const usePayments = createGlobalState(_usePayments);
