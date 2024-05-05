export type TUser = {
    id: number
    email: string
    name: string
    password: string
    image: string
}

export type TUserResponse = {
    token: string
}