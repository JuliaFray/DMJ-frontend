import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import styles from './ProfileInfo.module.scss';
import {Image, ImageBackdrop, ImageButton, ImageMarked, ImageSrc} from '../../Common/ImageButton/ImageButton';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {IProfile} from '../../../types/types';

type IProfileAvatar = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean,
    setEditMode: (isChanged: boolean) => void,
    file: File | string | null,
    setFile: Dispatch<SetStateAction<File | string | null>>
}

const ProfileAvatar: React.FC<IProfileAvatar> = (props, context) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.setFile(props.profile?.avatar?.data);
    }, [])

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(files?.length) {
            props.setFile(files[0]);
        }
    };

    const image = props.file
        ? typeof props.file === 'string'
            ? `data:image/jpeg;base64,${props.file}`
            : URL.createObjectURL(props.file)
        : '';

    return (
        <>
            {!props.editMode && <Avatar variant='rounded'
                                        className={styles.avatar}
                                        src={image}
                                        alt={props.profile.firstName}/>}

            {props.editMode && <div className={styles.avatar}>
                <input ref={inputRef} type='file' onChange={handleChangeFile} hidden/>
                <ImageButton focusRipple key={props.profile.firstName} onClick={() => inputRef.current?.click()}>

                    <Image>
                        <ImageSrc style={{backgroundImage: `url(${image})`}}/>
                        <ImageBackdrop className='MuiImageBackdrop-root'/>

                        <Typography
                            component='span'
                            variant='subtitle1'
                            color='inherit'
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}>
                            Загрузить
                            <ImageMarked className='MuiImageMarked-root'/>
                        </Typography>
                    </Image>
                </ImageButton>
            </div>}

            <div className={styles.btnBlock}>
                {props.editMode &&
                    <Button className={styles.button}
                            variant='outlined' onClick={() => props.setEditMode(false)}>
                        Отмена
                    </Button>
                }
                {props.isOwner &&
                    <Button className={styles.button}
                            variant='outlined' onClick={() => props.setEditMode(true)}>
                        {props.editMode ? 'Сохранить' : 'Редактировать'}
                    </Button>
                }
            </div>


        </>
    )
}

export default ProfileAvatar;
