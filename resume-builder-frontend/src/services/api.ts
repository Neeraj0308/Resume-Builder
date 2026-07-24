const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function requestJson<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export async function getJson<T>(path: string): Promise<T> {
  return requestJson<T>(path, { method: "GET" });
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  return requestJson<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function putJson<T>(path: string, body: unknown): Promise<T> {
  return requestJson<T>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteJson<T>(path: string): Promise<T> {
  return requestJson<T>(path, { method: "DELETE" });
}

export { API_BASE_URL };
