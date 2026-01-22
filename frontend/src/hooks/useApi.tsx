'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function useApi() {
  const { getToken } = useAuth();

  const fetcher = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = await getToken();
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    [getToken]
  );

  return { fetcher };
}
