export interface IProfile {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IUserInfo {
  house?: number,
  admin?: boolean,
  photo?: Blob | string | null,
}