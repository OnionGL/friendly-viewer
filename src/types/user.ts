export type TUser = {
    id: number
    email: string
    name: string
    password: string
    imageId: number
    isGuest: boolean
}

export type TUserResponse = {
    token: string
}