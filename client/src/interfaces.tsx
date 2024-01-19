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
  house: string,
  admin: boolean,
  photo: string,
  name: string,
  email: string,
}

export interface IPasswordChange {
  newPassword: string,
  newPasswordConfirmation: string
}