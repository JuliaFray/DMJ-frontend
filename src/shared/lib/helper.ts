import {TImage} from 'entities/article';
import {TProfile, TUser} from 'entities/profile';
import {NO_AVATAR} from 'shared/lib/DictConstants';

export const getImage = (img: TImage | undefined, isAvatar = false) => {
    return !!img
        ? `data:image/jpeg;base64,${img.data}`
        : isAvatar
            ? NO_AVATAR
            : '';
}

export const hasImage = (arr: TImage | undefined) => {
    return !!arr?.data;
}

export const getFullName = (user: TUser | TProfile) => {
    return `${user.firstName} ${user.secondName} ${user.lastName ? user.lastName : ''}`
}

export const convertBase64ToBlob = (image: string): Blob => {
    const byteString = atob(image.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/jpeg',
    })
};
