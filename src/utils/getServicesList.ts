import type { Service } from "../components/Services";

export async function getServicesList(): Promise<string[]> {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) return [];
    const data: Service[] = await res.json();
    return data.map(s => s.name || s.title || "").filter(Boolean);
  } catch {
    return [];
  }
}
