import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "userToken";
const FLAG_ACEITE = "flagAceite";
const CIDADE_ESQUECI_SENHA = "cidadeEsqueciSenha"
const MATRICULA_ESQUECI_SENHA = "matriculaEsqueciSenha"
const CPF_ESQUECI_SENHA = "cpfEsqueciSenha"
const TOKEN_ESQUECI_SENHA = "tokenEsqueciSenha"
const EMAIL_ESQUECI_SENHA = "emailEsqueciSenha"

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveFlagAceite = async (flagAceite: string) => {
  await AsyncStorage.setItem(FLAG_ACEITE, flagAceite);
};

export const saveCidadeEsqueciSenha = async (cidadeEsqueciSenha: string) => {
  await AsyncStorage.setItem(CIDADE_ESQUECI_SENHA, cidadeEsqueciSenha);
};

export const saveMatriculaEsqueciSenha = async (matriculaEsqueciSenha: string) => {
  await AsyncStorage.setItem(MATRICULA_ESQUECI_SENHA, matriculaEsqueciSenha);
};

export const saveCpfEsqueciSenha = async (cpfEsqueciSenha: string) => {
  await AsyncStorage.setItem(CPF_ESQUECI_SENHA, cpfEsqueciSenha);
};

export const saveTokenEsqueciSenha = async (tokenEsqueciSenha: string) => {
  await AsyncStorage.setItem(TOKEN_ESQUECI_SENHA, tokenEsqueciSenha);
};

export const saveEmailEsqueciSenha = async (emailEsqueciSenha: string) => {
  await AsyncStorage.setItem(EMAIL_ESQUECI_SENHA, emailEsqueciSenha);
};


export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getFlagAceite = async () => {
  return await AsyncStorage.getItem(FLAG_ACEITE);
};

export const getCidadeEsqueciSenha = async () => {
  return await AsyncStorage.getItem(CIDADE_ESQUECI_SENHA);
};

export const getMatriculaEsqueciSenha = async () => {
  return await AsyncStorage.getItem(MATRICULA_ESQUECI_SENHA);
};

export const getCpfEsqueciSenha = async () => {
  return await AsyncStorage.getItem(CPF_ESQUECI_SENHA);
};

export const getTokenEsqueciSenha = async () => {
  return await AsyncStorage.getItem(TOKEN_ESQUECI_SENHA);
};

export const getEmailEsqueciSenha = async () => {
  return await AsyncStorage.getItem(EMAIL_ESQUECI_SENHA);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const removeFlagAceite = async () => {
  await AsyncStorage.removeItem(FLAG_ACEITE);
};



