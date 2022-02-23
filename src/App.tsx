import loadable from '@loadable/component';
import React, {ComponentType} from 'react';
import {HashRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import Nav from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import store, {AppStateType} from './redux/redux-store';
import {compose} from 'redux';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {withSuspense} from './Components/HOC/withSuspense';

const ProfileContainer = loadable(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = loadable(() => import('./Components/Dialogs/DialogsContainer'));
const Music = loadable(() => import('./Components/Music/Music'));
const News = loadable(() => import('./Components/News/News'));
const Video = loadable(() => import('./Components/Video/Video'));
const Notifications = loadable(() => import('./Components/Notifications/Notifications'));
const Settings = loadable(() => import('./Components/Settings/Settings'));
const AllUsersContainer = loadable(() => import('./Components/AllUsers/AllUsersContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedNews = withSuspense(News);
const SuspendedSettings = withSuspense(Settings);
const SuspendedMusic = withSuspense(Music);
const SuspendedVideo = withSuspense(Video);
const SuspendedNotifications = withSuspense(Notifications);
const SuspendedUsers = withSuspense(AllUsersContainer);

class AppMain extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors(e: Event): void {
        alert('Some error occurred')
    };

    componentWillUnmount(): void {
        window.removeEventListener('UnhandledRejection', this.catchAllUnhandledErrors)
    }

    componentDidMount(): void {
        this.props.initializeApp();
        window.addEventListener('UnhandledRejection', this.catchAllUnhandledErrors)
    }

    render() {
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
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
                        {/*<Route path='*' render={() => <div>404 NOT FOUND</div>}/>*/}
                    </Switch>
                    <Route path='/login' render={() => <Login/>}/></div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

const AppContainer = compose<ComponentType>(
    connect(
        mapStateToProps, {initializeApp}),
    withRouter
)(AppMain);

const App: React.FC = () => {
    return <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </React.StrictMode>
    </HashRouter>
};

export default App;
