import firebase from 'firebase/app';
import 'firebase/auth';

import diarysData from '../../helpers/diarysData';

import util from '../../helpers/util';

const deleteDiary = (e) => {
  const diaryId = e.target.id;
  diarysData.deleteDiary(diaryId)
    .then(() => initDiary(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addEvents = () => {
  const deleteButtons = document.getElementsByClassName('delete-diary');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteDiary);
  }
};

const diaryStringBuilder = (diarys) => {
  let domString = '';
  diarys.forEach((diary) => {
    domString += `<h2 class="card-header"> ${diary.date}</h2>`;
    domString += '<div class="card-body">';
    domString += '<blockquote class="blockquote mb-0">';
    domString += `<p>${diary.title}</p>`;
    domString += `<div class="btn btn-danger delete-diary" id=${diary.id}>Delete</div>`;
    domString += `<footer class="blockquote-footer">${diary.entry}</footer>`;
    domString += '</blockquote>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-diarys', domString);
  addEvents();
};

const initDiary = () => {
  document.getElementById('diarys').classList.remove('hide');
  document.getElementById('home').classList.add('hide');
  document.getElementById('events').classList.add('hide');
  const { uid } = firebase.auth().currentUser;
  diarysData.getDiarysByUid(uid).then((diarys) => {
    diaryStringBuilder(diarys);
  })
    .catch(err => console.error('no diarys', err));
};

export default { initDiary, deleteDiary };
