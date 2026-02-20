import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: BASE,
});

function buildUrl(base, path) {
  if (!path) return null;
  if (typeof path !== "string") return null;
  const trimmed = path.trim();
  if (!trimmed) return null;
  // If already absolute URL, return as-is
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Remove leading slashes from path
  const p = trimmed.replace(/^\/+/, "");
  // Ensure base has no trailing slash
  const b = (base || BASE).replace(/\/+$/, "");
  return `${b}/${p}`;
}

export { BASE, buildUrl };
export default API;
