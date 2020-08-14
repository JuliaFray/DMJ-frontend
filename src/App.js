import loadable from '@loadable/component';
import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './Components/Common/Preloader/Preloader';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import Nav from './Components/Navbar/Navbar';
import { initializeApp } from './redux/APP-reducer';
import store from './redux/redux-store';

const ProfileContainer = loadable(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = loadable(() => import('./Components/Dialogs/DialogsContainer'));
const Music = loadable(() => import('./Components/Music/Music'));
const News = loadable(() => import('./Components/News/News'));
const Video = loadable(() => import('./Components/Video/Video'));
const Notifications = loadable(() => import('./Components/Notifications/Notifications'));
const Settings = loadable(() => import('./Components/Settings/Settings'));
const AllUsersContainer = loadable(() => import('./Components/AllUsers/AllUsersContainer'));

class AppMain extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />
    // }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />

        <div className='app-wrapper-content'>
          <Suspense fallback={<div> <Preloader /> </div>}>
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/video' render={() => <Video />} />
            <Route path='/notifications' render={() => <Notifications />} />
            <Route path='/users' render={() => <AllUsersContainer />} />
          </Suspense>

          <Route path='/login' render={() => <Login />} />
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(AppMain);

const App = () => {
  return <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
};

export default App;