import { LanguageName } from "../screens/LoginScreen/ChooseLanguage/type.ts";

// chọn ngôn ngữ
export const setAppLang = (language: string): void => {
  localStorage.setItem("ApplicationLanguage", language);
};
export const clearAppLang = (): void => {
  localStorage.removeItem("ApplicationLanguage");
};
export const getAppLang = (): LanguageName | null => {
  return localStorage.getItem("ApplicationLanguage") as LanguageName;
};

// chọn kho

export const setWareHouse = (name: string): void => {
  localStorage.setItem("WareHouse", name);
};
export const clearWareHouse = (): void => {
  localStorage.removeItem("WareHouse");
};
export const getWareHouse = (): any | null => {
  return localStorage.getItem("WareHouse") as any;
};

// chọn nhà máy

export const setFactory = (name: string): void => {
  localStorage.setItem("Factory", name);
};
export const clearFactory = (): void => {
  localStorage.removeItem("Factory");
};
export const getFactory = (): any | null => {
  return localStorage.getItem("Factory") as any;
};


// chọn kho kế toán

export const setWareHouseAcount = (name: string): void => {
  localStorage.setItem("WareHouseAcount", name);
};
export const clearWareHouseAcount = (): void => {
  localStorage.removeItem("WareHouseAcount");
};
export const getWareHouseAcount = (): any | null => {
  return localStorage.getItem("WareHouseAcount") as any;
};
