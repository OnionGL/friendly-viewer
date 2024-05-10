export type TUser = {
    id: number
    email: string
    name: string
    password: string
    imageId: number
}

export type TUserResponse = {
    token: string
}