import React, {useState} from 'react';
import Preloader from './../../Common/Preloader/Preloader';
import {IContact, IProfile} from '../../../types/types';
import {UploadFile} from 'antd/es/upload/interface';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {Box, Container, Divider, Tab, Tabs, Typography} from '@mui/material';
import styles from '../ProfileInfo/ProfileInfo.module.scss';
import {BASE_URL} from '../../../api/api';
import Avatar from '@mui/material/Avatar';

type PropsType = {
    profile: IProfile | null,
    isOwner: boolean,
    saveProfile: (profile: IProfile) => void,
    savePhoto: (file: UploadFile) => void,
}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if(!profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: IProfile) => {
        saveProfile(formData);
        setEditMode(false);
    };

    // const mainPhotoSelect = (info: UploadChangeParam) => {
    //     if(info.fileList.length) {
    //         savePhoto(info.file)
    //     }
    // };


    const avatarSrc = !!profile.avatarUrl ? profile.avatarUrl.includes('http')
        ? profile.avatarUrl : `${BASE_URL}${profile.avatarUrl}` : NO_AVATAR;


    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (<>
            <Container className={styles.mainBlock}>
                <Avatar className={styles.avatar} src={avatarSrc}
                        alt={!!profile.avatarUrl ? 'Uploaded' : ''}/>
            </Container>

            <Divider/>

            <Container maxWidth="sm">
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="О себе"/>
                    <Tab label="Избранные посты"/>
                    <Tab label="Третья вкладка"/>
                </Tabs>

                <TabPanel value={value} index={0}>
                    <ProfileData profile={profile}
                                 isOwner={isOwner}
                                 goToEditMode={() => {
                                     setEditMode(true)
                                 }}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Container>
        </>

    )
};

type ProfileDataPropsType = {
    profile: IProfile,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return (
        <div>
            <div>
                {`${props.profile.firstName} ${props.profile.secondName} ${props.profile.lastName ? props.profile.lastName : ''}`}
            </div>

            <div>
                Контакты
                {props?.profile?.contacts && Object.keys(props?.profile?.contacts).map(key => {
                    return <div key={key}>{props?.profile?.contacts[key as keyof IContact]}

                        {key}</div>
                })}
            </div>

            {/*{props.isOwner && <div>*/}
            {/*    <Button type="primary" onClick={props.goToEditMode}>Редактировать</Button>*/}
            {/*</div>}*/}
        </div>
    )
};

export default ProfileInfo;
