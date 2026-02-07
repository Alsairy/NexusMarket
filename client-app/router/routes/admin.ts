import type { RouteRecordRaw } from "vue-router";

const AdminTenants = () => import("@/pages/admin/tenants.vue");
const AdminTenantDetail = () => import("@/pages/admin/tenant-detail.vue");
const AdminPlaybooks = () => import("@/pages/admin/playbooks.vue");

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin/tenants",
    name: "AdminTenants",
    component: AdminTenants,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/tenants/:tenantId",
    name: "AdminTenantDetail",
    component: AdminTenantDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/playbooks",
    name: "AdminPlaybooks",
    component: AdminPlaybooks,
    meta: { requiresAuth: true },
  },
];
