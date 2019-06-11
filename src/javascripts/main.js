import firebase from 'firebase/app';

import auth from './components/auth/auth';

import MyNavbar from './components/MyNavbar/MyNavbar';

import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';
import 'bootstrap';

<<<<<<< HEAD
import events from './components/events';

// document.getElementById('diary').addEventListener('click', () => {
//   console.error('diary was clicked');
// });
// document.getElementById('events').addEventListener('click', () => {
//   console.error('events was clicked');
// });
// document.getElementById('news').addEventListener('click', () => {
//   console.error('news was clicked');
// });

const init = () => {
  events.initEvents();
=======
const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  authData.checkLogInStatus();
  auth.domStringBuilder();

  document.getElementById('diary').addEventListener('click', () => {
    console.error('diary was clicked');
  });
  document.getElementById('events').addEventListener('click', () => {
    console.error('events was clicked');
  });
  document.getElementById('news').addEventListener('click', () => {
    console.error('news was clicked');
  });
>>>>>>> master
};

init();
