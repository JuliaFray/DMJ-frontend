export type PostType = {
    id: string,
    text: string,
    title: string,
    tags: string[],
    like?: number,
    dislike?: number,
    viewsCount?: number,
    imageUrl?: string
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

export type FilterType = {
    term: string,
    friend: boolean | null
}

