const configuredBaseUrl = (import.meta.env.VITE_API_URL || "").trim();
const isLocalhostUrl = /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(
  configuredBaseUrl,
);

export const API_BASE_URL = import.meta.env.DEV
  ? configuredBaseUrl || "http://localhost:3000"
  : configuredBaseUrl && !isLocalhostUrl
    ? configuredBaseUrl
    : "";
