import loadable from '@loadable/component';
import React from 'react';
import {HashRouter, Link, Redirect, Route, Switch} from 'react-router-dom';
import './styles/css/antd.css';
import {Login} from './Components/Login/Login';
import store from './redux/redux-store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {withSuspense} from './Components/HOC/withSuspense';
import {QueryParamProvider} from 'use-query-params';
import {Layout, Menu} from 'antd';
import HeaderComponent from './Components/Header/HeaderComponent';
import {getAuthId, getIsAuth} from './redux/auth-selectors';
import {authUser} from './redux/auth-reducer';

const {Content, Sider} = Layout;

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

const AppMain: React.FC = () => {

    const isAuth = useSelector(getIsAuth);
    const userId = useSelector(getAuthId);

    const dispatch = useDispatch();

    if(!isAuth && window.localStorage.getItem('token')) {
        dispatch(authUser());
    }

    return (
        <Layout>
            {!isAuth
                ? <>
                    <Route path='/login' component={Login}/>
                    <Redirect to='/login'/>
                </>
                : <>
                    <Route path='/:id' component={Main}/>
                    <Redirect to={`/${userId}`}/>
                </>}
        </Layout>
    )
};

const Main: React.FC = () => {
    const userId = useSelector(getAuthId);
    return <>
        <HeaderComponent/>
        <Content style={{padding: '0 50px'}}>
            <Layout>
                <Sider className='site-layout-background' width={200}>
                    <Menu
                        mode="inline"
                        style={{height: '100%'}}>
                        <Menu.Item key="1"> <Link to={`/${userId}`}>Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/friends'>Friends</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/dialogs'>Messages</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/music'>Music</Link></Menu.Item>
                        {/*<Menu.Item key="5"><Link to='/news'>News</Link></Menu.Item>*/}
                        {/*<Menu.Item key="6"><Link to='/notifications'>Notifications</Link></Menu.Item>*/}
                        <Menu.Item key="5"><Link to='/users'>All Users</Link></Menu.Item>
                        {/*<Menu.Item key="6"><Link to='/settings'>Settings</Link></Menu.Item>*/}
                    </Menu>
                </Sider>
                <Content className='site-layout-background' style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={`/${userId}`}/>}/>
                        <Route path='/:id?' render={() => <SuspendedProfile/>}/>

                        <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                        <Route path='/news' render={() => <SuspendedNews/>}/>
                        <Route path='/settings' render={() => <SuspendedSettings/>}/>
                        <Route path='/music' render={() => <SuspendedMusic/>}/>
                        <Route path='/video' render={() => <SuspendedVideo/>}/>
                        <Route path='/notifications' render={() => <SuspendedNotifications/>}/>
                        <Route path='/users' render={() => <SuspendedUsers/>}/>
                    </Switch>
                </Content>
            </Layout>
        </Content>
    </>
}

export default App;
