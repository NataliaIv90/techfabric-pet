export interface ILoginData {
  email: string;
  password: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface IRegister {
  email: string;
  name: string;
  surname: string;
}

export interface IRegisterData extends IRegister {
  repeatPassword: string;
  password: string;
  username: string;
}
export interface IRegisterResponse extends IRegister {
  id: string;
  userName: string;
  role: string;
}
