import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = document.getElementById('auth');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const homeDiv = document.getElementById('home');
const newsNavbar = document.getElementById('navbar-button-news');
const diaryButton = document.getElementById('navbar-button-diary');
const eventsDiv = document.getElementById('navbar-button-events');
const diaryDiv = document.getElementById('diarys');


const checkLogInStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      homeDiv.classList.remove('hide');
      newsNavbar.classList.remove('hide');
      diaryButton.classList.remove('hide');
      eventsDiv.classList.remove('hide');
    } else {
      authDiv.classList.remove('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      homeDiv.classList.add('hide');
      newsNavbar.classList.add('hide');
      diaryButton.classList.add('hide');
      eventsDiv.classList.add('hide');
      diaryDiv.classList.add('hide');
    }
  });
};

export default { checkLogInStatus };
