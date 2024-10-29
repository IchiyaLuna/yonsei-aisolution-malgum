import { API_URL } from '@/api/config';

export async function fetchData(
  method: 'GET' | 'POST',
  endpoint: string,
  headers?: HeadersInit | undefined,
  body?: BodyInit | null
) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  });

  return res.json();
}
