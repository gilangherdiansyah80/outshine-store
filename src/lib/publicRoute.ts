import type { PublicRoute } from "@/lib/auth-adapter/auth-guard";

export const PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/outshine/home",
    method: "includes",
  },
  {
    path: "/outshine/welcome",
    method: "includes",
  },
  {
    path: "/outshine/login",
    method: "includes",
  },
  {
    path: "/outshine/register",
    method: "includes",
  },
  {
    path: "/outshine/products",
    method: "includes",
  },
  {
    path: "/outshine/product/",
    method: "includes",
  },
  {
    path: "/outshine/about-us",
    method: "includes",
  },
  {
    path: new RegExp("^/seller/[^/]+/profile"),
    method: "regex",
  },
];
