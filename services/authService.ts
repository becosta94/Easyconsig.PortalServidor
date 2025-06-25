import { apiRequest } from "./apiService";
import { saveToken } from "./authStorageService";



export async function login(email: string, password: string) {
  const data = await apiRequest("/User/authenticate", "POST", { email, password });
  const token = data.result;
    if (token) {
        await saveToken(token);
        return token;
    }    
}
