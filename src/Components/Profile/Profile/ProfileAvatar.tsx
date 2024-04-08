import Avatar from '@mui/material/Avatar';
import styles from './ProfileInfo.module.scss';
import {Image, ImageBackdrop, ImageButton, ImageMarked, ImageSrc} from '../../Common/ImageButton/ImageButton';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {IProfile} from '../../../types/types';
import {useAppDispatch} from '../../../hook/hooks';

type IProfileAvatar = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean,
    setEditMode: Dispatch<SetStateAction<boolean>>
}

const ProfileAvatar: React.FC<IProfileAvatar> = (props, context) => {

    const [file, setFile] = useState<File | string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setFile(props.profile.avatar.data);
    }, [dispatch])

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(files?.length) {
            setFile(files[0]);
        }
    };

    const image = file
        ? typeof file === 'string'
            ? `data:image/jpeg;base64,${file}`
            : URL.createObjectURL(file)
        : '';

    return (
        <>
            {!props.editMode && <Avatar variant='rounded'
                                        className={styles.avatar}
                                        src={image}
                                        alt={props.profile.firstName}/>}

            {props.editMode && <div>
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

            {props.isOwner &&
                <Button className={styles.button}
                        variant='outlined' onClick={() => props.setEditMode(!props.editMode)}>
                    {props.editMode ? 'Сохранить' : 'Редактировать'}
                </Button>
            }
        </>
    )
}

export default ProfileAvatar;
