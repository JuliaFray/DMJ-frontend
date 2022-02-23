import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, GenericFormDataKeys, Input, TextArea} from '../../Common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';
import {ProfileType} from '../../../types/types';
import {requiredField} from '../../../Utils/Validators/validator';

type PropsType = {
    profile: ProfileType
}

type FormDataKeys = GenericFormDataKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, error, handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<FormDataKeys>('FullName', 'fullName', [requiredField], Input)}
            {createField<FormDataKeys>('Looking for a job', 'lookingForAJob', [requiredField], Input, 'checkbox', 'Looking for a job')}
            {createField<FormDataKeys>('Skills', 'lookingForAJobDescription', [requiredField], TextArea)}
            {createField<FormDataKeys>('About me', 'aboutMe', [requiredField], TextArea)}
            <div>
                <br/>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div className={s.contacts}>
                    <b>{key}:</b>
                    {createField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>
            {error &&
			<div className={s.formSummaryError}>
                {error}
			</div>}
        </form>
    )
};

export default reduxForm<ProfileType, PropsType>({form: 'profile-edit'})(ProfileDataForm);
