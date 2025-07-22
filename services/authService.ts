
import { apiRequest } from "./apiService";
import { saveToken, saveFlagAceite } from "./authStorageService";

export async function login(cpf: string, senha: string, codigoCidade: string, matricula: string) {
  try {
    const data = await apiRequest("/Auth/login", "POST", { cpf, senha, codigoCidade, matricula });
    if (data.status === 401)
      return data;
    const flagAceiteContrato = data.servidor.flAcessoPortalServidorPorCpf;
    if (flagAceiteContrato) {
      await saveFlagAceite(flagAceiteContrato)
    }
    const token = data.token;
    if (token) {
      await saveToken(token);
      return token;
    };
  }
  catch (error: any) {
    return error;
  }
}
