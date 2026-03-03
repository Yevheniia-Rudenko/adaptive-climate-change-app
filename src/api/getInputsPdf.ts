import { getApiBaseUrl } from './apiBaseUrl';

export async function downloadInputsPdf(sessionId: string): Promise<void> {
  // Get base URL from environment variables
  const apiBaseUrl = getApiBaseUrl();
  // Construct URL with session ID parameter
  const url = apiBaseUrl
    ? `${apiBaseUrl}/api/inputs/pdf?session_id=${encodeURIComponent(sessionId)}`
    : `/api/inputs/pdf?session_id=${encodeURIComponent(sessionId)}`;

  let response: Response;
  try {
    // Send GET request to download PDF
    response = await fetch(url, { method: 'GET' });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`GET ${url} failed before reaching the server: ${message}. `);
  }

  if (!response.ok) {
    let detail: unknown;
    try {
      // Parse JSON response body if available
      detail = await response.json();
    } catch {
      // Parse text response body if JSON parsing fails
      detail = await response.text().catch(() => '');
    }
    const message = typeof detail === 'string' && detail ? detail : JSON.stringify(detail);
    throw new Error(`GET ${url} failed (${response.status}): ${message}`);
  }
  // Parse PDF blob from response
  const blob = await response.blob();
  // Use the session ID variable to name the file
  const filename = `${sessionId}_responses.pdf`;

  // Create a temporary object URL for the blob
  const objectUrl = URL.createObjectURL(blob);
  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  // Programmatically click the link to start the download
  link.click();
  // Remove the link element from the document
  link.remove();
  // Revoke the object URL to free up resources
  URL.revokeObjectURL(objectUrl);
}

