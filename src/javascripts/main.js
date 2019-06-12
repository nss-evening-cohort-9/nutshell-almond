import firebase from 'firebase/app';

import auth from './components/auth/auth';

import MyNavbar from './components/MyNavbar/MyNavbar';

import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';
import news from './components/news/news';

import 'bootstrap';
import diarys from './components/diary/diarys';
import events from './components/events/events';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  authData.checkLogInStatus();
  auth.domStringBuilder();

  document.getElementById('diary').addEventListener('click', diarys.initDiary);
  document.getElementById('events-button').addEventListener('click', events.initEvents);
  document.getElementById('news-button').addEventListener('click', news.initNews);
};

init();
