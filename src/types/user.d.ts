export interface registerUser{
    username: string,
    email: string,
    password: string
}

export interface userLogin{
    email: string,
    password: string
}

export interface userToken{
    id: number,
    username: string,
    email: string,
    role?: string
}

export interface userUpdate{
    username: string
}