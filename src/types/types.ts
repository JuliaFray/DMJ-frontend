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
    tags: IChipData[],
    imageId?: string,
    image?: IImage,
    author: IUser
    viewsCount: number,
    likes: number,
    dateStr: string,
    createdAt: Date,
    comments: IComment[],
    rating: number,
    userRating: number
}

export type IChipData = {
    _id: string,
    value: string
}

export type IImage = {
    _id: string,
    files_id?: string,
    data?: any,
    contentType?: string
};

export type IPostEdit = {
    _id?: string,
    title: string,
    text: string,
    imageId?: string,
    tags: string
}

export type IContact = {
    github: string,
    website: string,
    phone: string
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
    _id: string,
    userId: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    contacts: IContact,
    avatarId: string,
    avatar: IImage,
    city: string,
    age: string,
    description: string
}

export type IProfileStats = {
    [posts: string]: number,
    favorites: number,
    friends: number,
    rating: number
}

export type IUser = {
    _id: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    avatarId: string,
    avatar: IImage
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

