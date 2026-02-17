export async function exportResponses(sessionId: string): Promise<Blob> {
    // For now, we'll create a client-side export from localStorage
    // In the future, this could call the backend API: GET /api/responses/${sessionId}

    const responses: any[] = [];

    // Collect all responses from localStorage for this session
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`response_${sessionId}_`)) {
            try {
                const value = localStorage.getItem(key);
                if (value) {
                    responses.push(JSON.parse(value));
                }
            } catch (e) {
                console.error(`Error parsing response for key ${key}:`, e);
            }
        }
    }

    // Create JSON blob
    const jsonData = JSON.stringify({
        sessionId,
        exportedAt: new Date().toISOString(),
        responses
    }, null, 2);

    return new Blob([jsonData], { type: 'application/json' });
}

export function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
