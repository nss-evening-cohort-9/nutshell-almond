import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import googleImage from './googlebutton.png';

const logMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};
const domStringBuilder = () => {
  let domString = '<button id="google-auth" class="btn btn-danger">';
  domString += `<img src=${googleImage} />`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', logMeIn);
};

export default { domStringBuilder };
