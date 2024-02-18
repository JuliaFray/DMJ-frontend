import loadable from '@loadable/component';
import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './styles/css/antd.css';
import {Login} from './Components/Login/Login';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import HeaderComponent from './Components/Header/HeaderComponent';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './styles/theme';
import {Container} from '@mui/material';
import {AddPost} from './Components/Posts/AddPost/AddPost';
import {FullPost} from './Components/Posts/FullPost';
import {useAppDispatch} from './hook/hooks';
import {checkAuth} from './redux/auth/auth-thunks';
import {Registration} from './Components/Registration/Registration';

const Profile = loadable(() => import('./Components/Profile/ProfilePage'));
const PostPage = loadable(() => import('./Components/Posts/PostPage'));
const Users = loadable(() => import('./Components/Users/UsersPage'));


const App: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Main/>
            </ThemeProvider>
        </Provider>
    </HashRouter>
};

const Main: React.FC = () => {

    const dispatch = useAppDispatch();

    if(window.localStorage.getItem('token')) {
        dispatch(checkAuth({}));
    }

    return <>
        <HeaderComponent/>
        <Container fixed style={{height: "93vh", marginTop: 20}}>
            <Routes>
                <Route path='/' element={<PostPage/>}/>
                <Route path='/posts' element={<PostPage/>}/>
                <Route path='/posts/:id' element={<FullPost/>}/>
                <Route path='/posts/:id/edit' element={<AddPost/>}/>
                <Route path='/add-post' element={<AddPost/>}/>

                <Route path='/users/:id' element={<Profile/>}/>
                <Route path='/users' element={<Users/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>

                {/*<Route path='/dialogs' element={<SuspendedDialogs/>}/>*/}
                {/*<Route path='/news' element={<SuspendedNews/>}/>*/}
                {/*<Route path='/settings' element={<SuspendedSettings/>}/>*/}
                {/*<Route path='/music' element={<SuspendedMusic/>}/>*/}
                {/*<Route path='/video' element={<SuspendedVideo/>}/>*/}
                {/*<Route path='/notifications' element={<SuspendedNotifications/>}/>*/}

            </Routes>
        </Container>
    </>
}

export default App;
