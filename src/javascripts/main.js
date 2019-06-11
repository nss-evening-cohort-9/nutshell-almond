import firebase from 'firebase/app';

import auth from './components/auth/auth';

import MyNavbar from './components/MyNavbar/MyNavbar';

import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';
import news from './components/news';

import '../styles/main.scss';
import 'bootstrap';

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
  document.getElementById('news-button').addEventListener('click', news.initNews);
};

init();
