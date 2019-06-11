import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../diarys';

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut();
        // window.location.reload();
      } else if (e.target.id === 'navbar-button-diary') {
        diary.initDiary();
      }
    });
  }
};

export default { navbarEvents };
