export function getApiBaseUrl(): string {
  const env = (import.meta as any).env as { VITE_API_BASE_URL?: string; DEV?: boolean } | undefined;
  const baseUrl = env?.VITE_API_BASE_URL;
  if (baseUrl !== undefined) return baseUrl.replace(/\/$/, '');
  if (env?.DEV) return '';
  return 'https://adaptive-climate-change-backend.up.railway.app';
}

