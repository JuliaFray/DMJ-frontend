import loadable from '@loadable/component';
import React from 'react';
import {HashRouter, Route, Routes, useLocation} from 'react-router-dom';
import './styles/css/antd.css';
import {Login} from './Components/Login/Login';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import {QueryParamProvider} from 'use-query-params';
import HeaderComponent from './Components/Header/HeaderComponent';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';
import {ErrorBoundary} from 'react-error-boundary'
import FallBackComponent from './Components/HOC/FallBackComponent';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './styles/theme';
import {Container} from '@mui/material';
import {AddPost} from './Components/Posts/AddPost/AddPost';
import {FullPost} from './Components/Posts/FullPost';
import {BreadCrumbComponent} from './Components/Common/BreadCrumbs/BreadCrumbComponent';

const Profile = loadable(() => import('./Components/Profile/ProfilePage'));
const PostPage = loadable(() => import('./Components/Posts/PostPage'));
const Users = loadable(() => import('./Components/Users/UsersPage'));


const App: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <ErrorBoundary FallbackComponent={FallBackComponent}>
                    <ThemeProvider theme={theme}>
                        <Main/>
                    </ThemeProvider>
                </ErrorBoundary>
            </QueryParamProvider>
        </Provider>
    </HashRouter>
};

const Main: React.FC = () => {
    const location = useLocation();

    return <>
        <HeaderComponent/>
        <BreadCrumbComponent path={location.pathname.split('/')[1]}/>
        <Container maxWidth="md" style={{height: "93vh"}}>
            <Routes>
                <Route path='/posts' element={<PostPage/>}/>
                <Route path='/posts/:id' element={<FullPost/>}/>
                <Route path='/posts/:id/edit' element={<AddPost/>}/>
                <Route path='/add-post' element={<AddPost/>}/>

                <Route path='/users/:id?' element={<Profile/>}/>
                <Route path='/users' element={<Users/>}/>

                <Route path="/login" element={<Login/>}/>

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
