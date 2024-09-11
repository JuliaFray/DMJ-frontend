import React, {useEffect} from 'react';
import {compose} from 'redux';
import {useAppDispatch} from '../../../hook/hooks';
import {getAllDialogs} from '../../../redux/dialog/dialog-thunks';
import PageLayout from '../../Common/PageLayout/PageLayout';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import DialogMain from './DialogMain';


const DialogPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDialogs({query: ''}))
    }, []);

    return (
        <PageLayout isMainPage mainChildren={<DialogMain/>} mainSx={{height: '100%'}}/>
    )
};
export default compose<React.ComponentType>(withAuthRedirect)(DialogPage);
