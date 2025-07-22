import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "userToken";
const FLAG_ACEITE = "flagAceite";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveFlagAceite = async (flagAceite: string) => {
  await AsyncStorage.setItem(FLAG_ACEITE, flagAceite);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getFlagAceite = async () => {
  return await AsyncStorage.getItem(FLAG_ACEITE);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const removeFlagAceite = async () => {
  await AsyncStorage.removeItem(FLAG_ACEITE);
};



