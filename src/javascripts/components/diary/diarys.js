import firebase from 'firebase/app';
import 'firebase/auth';

import diarysData from '../../helpers/diarysData';

import util from '../../helpers/util';

const diaryStringBuilder = (diarys) => {
  let domString = '';
  diarys.forEach((diary) => {
    domString += `<h2 class="card-header"> ${diary.date}</h2>`;
    domString += '<div class="card-body">';
    domString += '<blockquote class="blockquote mb-0">';
    domString += `<p>${diary.title}</p>`;
    // domString += `<div class="btn btn-danger delete-button" id=${diary.uid}>Delete</div>`;
    domString += `<footer class="blockquote-footer">${diary.entry}</footer>`;
    domString += '</blockquote>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-diarys', domString);
  //  need to make addDiarys() here
};

const initDiary = () => {
  document.getElementById('diarys').classList.remove('hide');
  document.getElementById('home').classList.add('hide');
  document.getElementById('events').classList.add('hide');
  const { uid } = firebase.auth().currentUser;
  diarysData.getDiarysByUid(uid).then((diarys) => {
    diaryStringBuilder(diarys);
  })
    .catch(err => console.error('no events', err));
};

export default { initDiary };
