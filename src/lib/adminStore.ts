// Admin accounts: phone + password, max 10. Stored in localStorage.
const KEY = "ssam-admins-v1";
export const MAX_ADMINS = 10;

export type Admin = { id: string; phone: string; password: string; name?: string };

const DEFAULTS: Admin[] = [
  { id: "root", phone: "0000000000", password: "admin123", name: "Super Admin" },
];

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function loadAdmins(): Admin[] {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return DEFAULTS;
    return arr;
  } catch {
    return DEFAULTS;
  }
}

export function saveAdmins(list: Admin[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("admins-changed"));
}

export function verifyLogin(phone: string, password: string): Admin | null {
  const list = loadAdmins();
  return list.find((a) => a.phone.trim() === phone.trim() && a.password === password) || null;
}

export function addAdmin(a: Omit<Admin, "id">): { ok: boolean; error?: string } {
  const list = loadAdmins();
  if (list.length >= MAX_ADMINS) return { ok: false, error: `Maximum ${MAX_ADMINS} admins allowed.` };
  if (!/^\d{7,15}$/.test(a.phone.trim())) return { ok: false, error: "Phone must be 7–15 digits." };
  if (a.password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
  if (list.some((x) => x.phone.trim() === a.phone.trim())) return { ok: false, error: "Phone already exists." };
  saveAdmins([...list, { ...a, id: newId() }]);
  return { ok: true };
}

export function updateAdmin(id: string, patch: Partial<Omit<Admin, "id">>): { ok: boolean; error?: string } {
  const list = loadAdmins();
  if (patch.phone && !/^\d{7,15}$/.test(patch.phone.trim())) return { ok: false, error: "Phone must be 7–15 digits." };
  if (patch.password !== undefined && patch.password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
  if (patch.phone && list.some((x) => x.id !== id && x.phone.trim() === patch.phone!.trim()))
    return { ok: false, error: "Phone already exists." };
  saveAdmins(list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  return { ok: true };
}

export function removeAdmin(id: string): { ok: boolean; error?: string } {
  const list = loadAdmins();
  if (list.length <= 1) return { ok: false, error: "Cannot delete the last admin." };
  saveAdmins(list.filter((a) => a.id !== id));
  return { ok: true };
}
