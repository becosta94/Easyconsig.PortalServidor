
import { apiRequest } from "./apiService";
import { saveToken } from "./authStorageService";

export async function login(cpf: string, senha: string, codigoCidade: string, matricula: string) {

  const data = await apiRequest("/Auth/login", "POST", {cpf, senha, codigoCidade, matricula});
  const token = data.token;
    if (token) {
        await saveToken(token);
        return token;
    }    
}
