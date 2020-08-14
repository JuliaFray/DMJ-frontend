import React from 'react';
import StyleSheet from './Description.module.css';
import Preloader from './../../Common/Preloader/Preloader';
// import ProfileStatus from './../ProfileStatus/ProfileStatus';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';


function Avatar(props) {
  // debugger
  if (!props.profile) {
    return <Preloader />
  }
  let contacts = Object.entries(props.profile.contacts);

  // let contactForm = contacts.map(c => <div> {c[0] + ': ' + c[1]} </div>)
  let contactForm = contacts.map(c => c[1] && <a className={StyleSheet.contact} href={'https://' + c[1]}> {c[0]} </a>);

  return (
    <div className={StyleSheet.avatar}>
      <div className={StyleSheet.avatarImg}>
        <img src={props.profile.photos.large != null ? props.profile.photos.large : 'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png'} />
      </div>


      <div className={StyleSheet.description}>
        <div className={StyleSheet.item}>
          <div className={StyleSheet.name}>Name: </div>
          <div className={StyleSheet.key}>{props.profile.fullName}</div>
        </div>

        <div className={StyleSheet.item}>
          <div className={StyleSheet.name}>Status: </div>
          <div className={StyleSheet.key}> 
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
          </div>

        </div>



        <div className={StyleSheet.item}>
          <div className={StyleSheet.name}>Contacts: </div>
          <div className={StyleSheet.key}>{contactForm}</div>

        </div>

        <div className={StyleSheet.item}>
          <div className={StyleSheet.name}>LookingForAJob: </div>
          <div className={StyleSheet.key}>{props.profile.lookingForAJobDescription}</div>
        </div>
      </div>
    </div>
  )
}

export default Avatar;