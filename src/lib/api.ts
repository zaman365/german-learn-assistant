"use client";
export async function api<T>(path: string, input?: unknown): Promise<T> {
  const response = await fetch(`/api/learning/${path}`, {
    method: input === undefined ? "GET" : "POST",
    headers:
      input === undefined ? undefined : { "Content-Type": "application/json" },
    body: input === undefined ? undefined : JSON.stringify(input),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "The request failed. Please try again.");
  return data as T;
}
