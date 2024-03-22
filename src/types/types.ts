export type ILoginData = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string | null
}

export type IPost = {
    _id: string,
    title: string,
    text: string,
    tags: string[],
    imageId?: string,
    image?: IImage,
    author: IUser
    viewsCount: number,
    likes: number,
    dateStr: string,
    createdAt: Date,
    comments: IComment[]
}

export type IImage = {
    _id: string,
    files_id: string,
    data: string
};

export type IPostEdit = {
    _id?: string,
    title: string,
    text: string,
    imageId: string,
    tags: string
}

export type IContact = {
    github: string,
    website: string,
    phone: string
}

export type IPhoto = {
    small: string,
    large: string
}

export type IComment = {
    text: string,
    author?: {
        firstName: string,
        secondName: string,
        lastName?: string,
    } | null
}

export type IProfile = {
    userId: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    contacts: IContact,
    avatarUrl: string
}

export type IUser = {
    _id: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    avatarUrl: string
}

export type SimpleNameObj = {
    id: number,
    name: string
}

export type IMessage = {
    id: number,
    message: string
}

export type IFilter = {
    term: string,
    friend: boolean | null
}

