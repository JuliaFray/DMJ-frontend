import {IImage, IUser} from '../types/types';
import {NO_AVATAR} from './DictConstants';

export const getImage = (img: IImage | undefined, isAvatar = false) => {
    return !!img
        ? `data:image/jpeg;base64,${img.data}`
        : isAvatar
            ? NO_AVATAR
            : '';
}

export const hasImage = (arr: IImage | undefined) => {
    return !!arr?.data;
}

export const getFullName = (user: IUser) => {
    return `${user.firstName} ${user.secondName} ${user.lastName ? user.lastName : ''}`
}

export const convertBase64ToBlob = (image: string): Blob => {
    const byteString = atob(image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/jpeg',
    })
};
