import loadable from '@loadable/component';
import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Login} from './Components/Login/Login';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import HeaderComponent from './Components/Header/HeaderComponent';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './styles/theme';
import {Container} from '@mui/material';
import AddPost from './Components/Posts/AddPost/AddPost';
import {useAppDispatch} from './hook/hooks';
import {checkAuth} from './redux/auth/auth-thunks';
import {Registration} from './Components/Registration/Registration';
import styles from './App.module.scss';
import WS from './Components/Common/WebSocketContext';

const ProfilePage = loadable(() => import('./Components/Profile/ProfilePage/ProfilePage'));
const PostsPage = loadable(() => import('./Components/Posts/PostPage/PostPage'));
const FullPostPage = loadable(() => import('./Components/Posts/FullPost'));
const UsersPage = loadable(() => import('./Components/Users/UsersPage/UsersPage'));
const DialogPage = loadable(() => import('./Components/Dialogs/DialogPage/DialogPage'));


const App: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Main/>
                </ThemeProvider>
            </Provider>
        </HashRouter>

    );
};

const Main: React.FC = () => {
    const dispatch = useAppDispatch();

    if(window.localStorage.getItem('token')) {
        dispatch(checkAuth({}));
    }

    return (
        <WS>
            <Container className={styles.app} maxWidth={false}>
                <HeaderComponent/>
                <Container fixed className={styles.main} maxWidth={'xl'}>
                    <Routes>
                        <Route path='/' element={<PostsPage/>}/>
                        <Route path='/posts' element={<PostsPage/>}/>
                        <Route path='/posts/:id' element={<FullPostPage/>}/>
                        <Route path='/posts/:id/edit' element={<AddPost/>}/>
                        <Route path='/add-post' element={<AddPost/>}/>

                        <Route path='/users/:id' element={<ProfilePage/>}/>
                        <Route path='/users' element={<UsersPage/>}/>

                        <Route path='/dialogs' element={<DialogPage/>}/>

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>

                    </Routes>
                </Container>
            </Container>
        </WS>
    )
}

export default App;
