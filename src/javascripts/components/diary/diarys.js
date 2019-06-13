import firebase from 'firebase/app';
import 'firebase/auth';

import diarysData from '../../helpers/diarysData';

import util from '../../helpers/util';

const createNewDiary = (e) => {
  e.preventDefault();
  const newDiary = {
    date: document.getElementById('diarys').value,
    entry: document.getElementById('entry').value,
    title: document.getElementById('title').value,
    uid: firebase.auth().currentUser.uid,
  };

  diarysData.addNewDiary(newDiary)
    .then(() => {
      document.getElementById('name').value = '';
      document.getElementById('entry').value = '';
      document.getElementById('diarys').classList.remove('hide');
      document.getElementById('new-diary').classList.add('hide');
      initDiary(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new diary for you', err));
};

const newDiaryButton = () => {
  document.getElementById('diarys').classList.add('hide');
  document.getElementById('create-diary').classList.remove('hide');
  document.getElementById('my-diarys').addEventListener('click', createNewDiary);
};

const deleteDiary = (e) => {
  console.error('test');
  const diaryId = e.target.id;
  diarysData.deleteDiary(diaryId)
    .then(() => initDiary(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addEvents = () => {
  document.getElementById('add-diary-button').addEventListener('click', newDiaryButton);
  const deleteButtons = document.getElementsByClassName('delete-diary');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteDiary);
  }
};

const diaryStringBuilder = (diarys) => {
  let domString = '';
  domString += '<h2>Diarys</h2>';
  domString += '<button id="add-diary-button" class="btn btn-link">Add Diary</button>';
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
