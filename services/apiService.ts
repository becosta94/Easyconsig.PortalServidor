import Constants from 'expo-constants';
import { getToken } from "./authStorageService";


const BASE_URL = Constants.expoConfig?.extra?.API_URL;

export async function apiRequest<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  token?: string
): Promise<T> {
  try {
    const token = await getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        data?.errors?.map((e: any) => e.message).join('\n') ||
        data?.message ||
        'Erro na requisição';

      throw new Error(errorMessage);

    }

    return data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
}
