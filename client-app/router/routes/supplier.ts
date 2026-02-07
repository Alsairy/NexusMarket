import type { RouteRecordRaw } from "vue-router";

const SupplierRegister = () => import("@/pages/supplier/register.vue");
const SupplierOnboarding = () => import("@/pages/supplier/onboarding.vue");

export const supplierRoutes: RouteRecordRaw[] = [
  {
    path: "/supplier/register",
    name: "SupplierRegister",
    component: SupplierRegister,
    meta: { public: true },
  },
  {
    path: "/supplier/onboarding",
    name: "SupplierOnboarding",
    component: SupplierOnboarding,
    meta: { requiresAuth: true },
  },
];
