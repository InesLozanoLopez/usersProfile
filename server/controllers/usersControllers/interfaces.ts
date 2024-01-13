export interface IUserInfo {
    id: number,
    usersRegistration_id: number,
    photo?: Blob | string | null,
    house?: number,
    admin?: boolean
}