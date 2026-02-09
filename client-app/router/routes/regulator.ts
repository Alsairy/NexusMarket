import type { RouteRecordRaw } from "vue-router";

const RegulatorDashboard = () => import("@/pages/regulator/dashboard.vue");
const RegulatorCompliance = () => import("@/pages/regulator/compliance.vue");
const RegulatorSuppliers = () => import("@/pages/regulator/suppliers.vue");

export const regulatorRoutes: RouteRecordRaw[] = [
  {
    path: "/regulator/dashboard",
    name: "RegulatorDashboard",
    component: RegulatorDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/regulator/compliance",
    name: "RegulatorCompliance",
    component: RegulatorCompliance,
    meta: { requiresAuth: true },
  },
  {
    path: "/regulator/suppliers",
    name: "RegulatorSuppliers",
    component: RegulatorSuppliers,
    meta: { requiresAuth: true },
  },
];
