import { SIDE_NAV, type NavItem } from "./pages";

const STORAGE_KEY = "ssam-nav-overrides-v1";
const PASS_KEY = "ssam-admin-pass-v1";
const DEFAULT_PASS = "admin123";

export type LinkOverride = { label?: string; url?: string };
// Key format: `${groupLabel}::${originalSlug}` for children, `top::${originalSlug}` for top items
export type OverridesMap = Record<string, LinkOverride>;

export function loadOverrides(): OverridesMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveOverrides(map: OverridesMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("nav-overrides-changed"));
}

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASS;
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}

export function setAdminPassword(p: string) {
  localStorage.setItem(PASS_KEY, p);
}

export function keyFor(group: string | null, slug: string) {
  return `${group ?? "top"}::${slug}`;
}

export function applyOverrides(nav: NavItem[], map: OverridesMap): NavItem[] {
  return nav.map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        children: item.children.map((c) => {
          const o = map[keyFor(item.label, c.slug!)];
          return o ? { ...c, label: o.label ?? c.label, ...(o.url ? { to: o.url, slug: undefined } : {}) } : c;
        }),
      };
    }
    if (item.slug) {
      const o = map[keyFor(null, item.slug)];
      if (o) return { ...item, label: o.label ?? item.label, ...(o.url ? { to: o.url, slug: undefined } : {}) };
    }
    return item;
  });
}

export function getSideNav(): NavItem[] {
  return applyOverrides(SIDE_NAV, loadOverrides());
}
