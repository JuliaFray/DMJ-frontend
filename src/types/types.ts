export type ILoginData = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string | null
}

export type IFilter = {
    term: string,
    friend: boolean | null
}

export type INotifications = {
    from: string,
    fromId: string,
    msg: string,
    type: string
}


