export interface RegisterRequestProps {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface LoginRequestProps {
    email: string,
    password: string
}

export interface UserState {
    id: number,
    password: string,
    email: string,
}