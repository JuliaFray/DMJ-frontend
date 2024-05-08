import React from 'react';
import {useAppDispatch} from '../../../hook/hooks';
import PageLayout from '../../Common/PageLayout/PageLayout';
import DialogMain from './DialogMain';
import DialogFriends from './DialogFriends';


const DialogPage: React.FC = () => {

    // const dialogs = useSelector(getDialogs);
    // const messages = useSelector(getMessages);

    const dispatch = useAppDispatch();

    // const onSendMsg = (values: FormDataType) => {
    //     dispatch(actions.sendMsg(values.message))
    // };

    return (
        <PageLayout isMainPage mainChildren={<DialogMain/>} leftChildren={<DialogFriends/>}/>

    )
};

export default DialogPage;
