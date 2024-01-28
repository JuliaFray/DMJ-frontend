export type PostType = {
    _id: string,
    title: string,
    text: string,
    tags: string[],
    imageUrl: string,
    author?: UserType
    viewsCount?: number,
    likes?: number,
    dateStr: string,
}

export type PostEditType = {
    _id?: string,
    title: string,
    text: string,
    imageUrl: string,
    tags: string
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    Instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type PhotoType = {
    small: string,
    large: string
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotoType,
    aboutMe?: string,
    status: string
}

export type UserType = {
    id: string,
    fullName: string,
    photos: PhotoType,
    status: string,
    followed: boolean
}

export type SimpleNameObjType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type FilterType = {
    term: string,
    friend: boolean | null
}

