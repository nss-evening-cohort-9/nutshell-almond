import firebase from 'firebase/app';
import 'firebase/auth';

import events from '../events';

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut();
      } else if (e.target.id === 'navbar-button-events') {
        events.initEvents();
      }
    });
  }
};

export default { navbarEvents };
