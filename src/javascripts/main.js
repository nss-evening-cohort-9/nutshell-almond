import firebase from 'firebase/app';

import auth from './components/auth/auth';

import MyNavbar from './components/auth/MyNavbar/MyNavbar';

import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';
import 'bootstrap';

document.getElementById('diary').addEventListener('click', () => {
  console.error('diary was clicked');
});
document.getElementById('events').addEventListener('click', () => {
  console.error('events was clicked');
});
document.getElementById('news').addEventListener('click', () => {
  console.error('news was clicked');
});

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  authData.checkLogInStatus();
  auth.domStringBuilder();
};

init();
