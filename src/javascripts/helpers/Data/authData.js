import firebase from 'firebase/app';
import 'firebase/auth';
import Diary from '../../components/diary';
import News from '../../components/news';
import Events from '../../components/events';

const authDiv = document.getElemetById('auth');
const newsDiv = document.getElementById('news');
const newsNavbar = document.getElementById('navbar-button-News');
const authNavaBar = document.getElementById('navbar-button-auth');
const diaryDiv = document.getElementById('navbar-button-diary');
const diaryNavBar = document.getElementById('navbar-button-diary');
const eventsDiv = document.getElementById('navbar-button-events');
const eventsNavBar = document.getElementById('navbar-button-events');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classLists.add('hide');
      newsDiv.classList.remove('hide');
      newsNavbar.classList.remove('hide');
      diaryDiv.classList.remove('hide');
      diaryNavbar.classList.remove('hide');
      eventsDiv.classList.remove('hide');
      eventsNavbar.classList.remove('hide');
      authNavaBar.classList.remove('hide');
    } else {
      authDiv.classList.remove('hide');
      newsDiv.classList.add('hide');
      newsNavbar.classList.add('hide');
      diaryDiv.classList.add('hide');
      diaryNavbar.classList.add('hide');
      eventsDiv.classList.add('hide');
      eventsNavbar.classList.add('hide');
      authNavBar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
