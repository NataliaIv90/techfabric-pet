export interface INewPasswordForm {
  password: string;
  repeatPassword: string;
}

export interface IResetPasswordData {
  toEmail: string;
};

export interface IResponse {
  status: string;
  data?: string;
  error?: { data: string; status: string }
}

export interface ISetPasswordRequestBodyData extends INewPasswordForm {
  resetToken: string;
}

export interface ISetPasswordData {
  id: string;
  data: ISetPasswordRequestBodyData;
};
