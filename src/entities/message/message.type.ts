import {TProfile} from "entities/profile";

export type TMessage = {
    id: number,
    text: string,
    from: TProfile,
    createdAt: Date
}

export type TDialog = {
    isPrivate: boolean,
    users: TProfile[],
    _id: string
}

export type TDialogFriends = {
    name: string,
    avatar: string,
    status: string
}
