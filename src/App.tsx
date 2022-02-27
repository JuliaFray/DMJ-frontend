import loadable from '@loadable/component';
import React, {useEffect} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Components/Navbar/Navbar';
import {Login} from './Components/Login/Login';
import store from './redux/redux-store';
import {Provider, useDispatch} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {withSuspense} from './Components/HOC/withSuspense';
import Header from './Components/Header/Header';
import { QueryParamProvider } from 'use-query-params';

const Profile = loadable(() => import('./Components/Profile/ProfilePage'));
const Dialogs = loadable(() => import('./Components/Dialogs/DialogsPage'));
const Music = loadable(() => import('./Components/Music/Music'));
const News = loadable(() => import('./Components/News/News'));
const Video = loadable(() => import('./Components/Video/Video'));
const Notifications = loadable(() => import('./Components/Notifications/Notifications'));
const Settings = loadable(() => import('./Components/Settings/Settings'));
const Users = loadable(() => import('./Components/Users/UsersPage'));

const SuspendedDialogs = withSuspense(Dialogs);
const SuspendedProfile = withSuspense(Profile);
const SuspendedNews = withSuspense(News);
const SuspendedSettings = withSuspense(Settings);
const SuspendedMusic = withSuspense(Music);
const SuspendedVideo = withSuspense(Video);
const SuspendedNotifications = withSuspense(Notifications);
const SuspendedUsers = withSuspense(Users);

const AppMain: React.FC = () => {

    // const initialized = useSelector((state: AppStateType) => state.app.initialized);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeApp())
    }, []);

    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                    <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>

                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                    <Route path='/news' render={() => <SuspendedNews/>}/>
                    <Route path='/settings' render={() => <SuspendedSettings/>}/>
                    <Route path='/music' render={() => <SuspendedMusic/>}/>
                    <Route path='/video' render={() => <SuspendedVideo/>}/>
                    <Route path='/notifications' render={() => <SuspendedNotifications/>}/>
                    <Route path='/users' render={() => <SuspendedUsers/>}/>
                </Switch>
                <Route path='/login' render={() => <Login/>}/></div>
        </div>
    )
};

const App: React.FC = () => {
    return <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <AppMain/>
                </QueryParamProvider>
            </Provider>
        </React.StrictMode>
    </HashRouter>
};

export default App;
