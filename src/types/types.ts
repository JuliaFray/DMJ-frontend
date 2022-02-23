export type PostType = {
    id: number,
    message: string,
    like: number,
    dislike: number
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
    small: string | null,
    large: string | null
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotoType,
    aboutMe?: string,
}

export type UserType = {
    id: number,
    name: string,
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

