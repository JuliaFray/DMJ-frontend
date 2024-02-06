import React, {useState} from 'react';
import Preloader from './../../Common/Preloader/Preloader';
import userPhoto from './../../../assets/avatar.jpg';
import ProfileDataForm from './ProfileDataForm';
import {ContactsType, ProfileType} from '../../../types/types';
import {Button, Col, Descriptions, Image, Row} from 'antd';
import './../../../styles/css/antd.css';
import {UploadChangeParam} from 'antd/es/upload';
import {UploadFile} from 'antd/es/upload/interface';

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    saveProfile: (profile: ProfileType) => void,
    savePhoto: (file: UploadFile) => void,
    updateUserStatus: (text: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if(!profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData);
        setEditMode(false);
    };

    // const mainPhotoSelect = (info: UploadChangeParam) => {
    //     if(info.fileList.length) {
    //         savePhoto(info.file)
    //     }
    // };

    return (
        <Row>
            <Col span={8}>
                <Row>
                    <Image width={200} style={{borderRadius: '50%'}} src={profile.photos?.large != null ? profile.photos.large : userPhoto}/>
                </Row>
                <Row>
                    {/*{isOwner && <Upload onChange={mainPhotoSelect}><Button type={'primary'} icon={<UploadOutlined/>}>Click to Upload</Button></Upload>}*/}
                </Row>
            </Col>
            <Col span={16}>
                {editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}/>}

            </Col>
        </Row>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return (
        <div>
            <Descriptions title={props.profile.fullName}>
                <Descriptions.Item label="Ищу работу">{props?.profile?.lookingForAJob ? 'да' : 'нет'}</Descriptions.Item>
                <Descriptions.Item label="Мои навыки">{props?.profile?.lookingForAJobDescription}</Descriptions.Item>
                <Descriptions.Item label="Обо мне">
                    {props?.profile?.aboutMe}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Контакты">
                {props?.profile?.contacts && Object.keys(props?.profile?.contacts).map(key => {
                    return <Descriptions.Item key={key} label={key} span={2}>{props?.profile?.contacts[key as keyof ContactsType]}
                    </Descriptions.Item>
                })}
            </Descriptions>

            {props.isOwner && <div>
                <Button type="primary" onClick={props.goToEditMode}>Редактировать</Button>
            </div>}
        </div>
    )
};

export default ProfileInfo;
