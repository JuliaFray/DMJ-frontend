import React, {useEffect} from 'react';
import {compose} from 'redux';
import {useAppDispatch} from 'shared/hook/hooks';
import {withAuthRedirect} from 'shared/lib/react';
import {getAllDialogs} from 'shared/model/dialog/dialog-thunks';
import CommonLayoutUi from 'pages/layouts/common-layout.ui';
import DialogMain from './DialogMain';


const DialogPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDialogs({query: ''}))
    }, []);

    return (
        <CommonLayoutUi isMainPage mainChildren={<DialogMain/>} mainSx={{height: '100%'}}/>
    )
};
export default compose<React.ComponentType>(withAuthRedirect)(DialogPage);
