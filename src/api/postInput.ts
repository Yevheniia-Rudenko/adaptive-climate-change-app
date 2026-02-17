export type PostInputRequest = {
  input: string;
  module_id: string;
  section_id: string;
  timestamp?: string;
  session_id?: string;  // Optional: links all responses in a module session
};

export type PostInputResponse = {
  success: boolean;
};

function getApiBaseUrl(): string {
  const env = (import.meta as any).env as { VITE_API_BASE_URL?: string; DEV?: boolean } | undefined;
  const baseUrl = env?.VITE_API_BASE_URL;
  if (baseUrl !== undefined) return baseUrl.replace(/\/$/, '');
  if (env?.DEV) return '';
  return 'https://adaptive-climate-change-backend.up.railway.app';
}

export async function postInput(request: PostInputRequest): Promise<PostInputResponse> {
  const apiBaseUrl = getApiBaseUrl();
  const url = apiBaseUrl ? `${apiBaseUrl}/api/input/post/` : '/api/input/post/';

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(
      `POST ${url} failed before reaching the server: ${message}. `
    );
  }

  if (!response.ok) {
    let detail: unknown;
    try {
      detail = await response.json();
    } catch {
      detail = await response.text().catch(() => '');
    }
    const message = typeof detail === 'string' && detail ? detail : JSON.stringify(detail);
    throw new Error(`POST ${url} failed (${response.status}): ${message}`);
  }

  const data = (await response.json()) as PostInputResponse;
  return data;
}
