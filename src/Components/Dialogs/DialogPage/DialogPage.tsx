import React, {useEffect} from 'react';
import PageLayout from '../../Common/PageLayout/PageLayout';
import DialogMain from './DialogMain';
import DialogFriends from './DialogFriends';
import {compose} from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import {useAppDispatch} from '../../../hook/hooks';
import {getAllDialogs} from '../../../redux/dialog/dialog-thunks';
import DialogItems from './DialogItems';


const DialogPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDialogs({query: ''}))
    }, []);

    return (
        <PageLayout isMainPage
                    leftChildren={<DialogItems/>}
                    mainChildren={<DialogMain/>}
                   />
    )
};
// rightChildren={<DialogFriends/>}
export default compose<React.ComponentType>(withAuthRedirect)(DialogPage);
