export interface IAuth {
  token: string;
  refreshToken: string;
  expiresAt: number;
  expiresRefreshToken: number;
}

export interface ILogin {
  phone: string;
  password: string;
}

export interface IRegister {
  phone: string;
  password: string;
  OTP?: string;
  rule: string;
}

