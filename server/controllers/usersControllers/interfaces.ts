export interface IUserInfo {
    id: number,
    usersRegistration_id: number,
    photo?: Express.Multer.File | undefined,
    house?: number,
    admin?: boolean
}