import firebase from 'firebase/app';
import 'firebase/auth';

import diarysData from '../../helpers/data/diarysData';

import util from '../../helpers/util';

const deleteDiaryEvent = (e) => {
  const diaryId = e.target.id;
  diarysData.deleteDiary(diaryId)
    .then(() => initDiary(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addDiary = (e) => {
  e.preventDefault();
  const newDiary = {
    // entry: document.getElementById('entry').value,
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    uid: firebase.auth().currentUser.uid,
  };
  diarysData.addDiary(newDiary)
    .then(() => {
      // document.getElementById('entry').value = '';
      document.getElementById('title').value = '';
      document.getElementById('date').value = '';
      initDiary(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new event for you', err));
};

const addAllDiarys = () => {
  const deleteButtons = document.getElementsByClassName('delete-diary');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteDiaryEvent);
  }
  document.getElementById('save-diary').addEventListener('click', addDiary);
};

const addDiaryDomStringBuilder = () => {
  let domString = '';
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="diary-name">diary Name</label>';
  domString += '<input type="diaryName" class="form-control" id="diary-title" placeholder="Enter diary name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="diary-date">Date</label>';
  domString += '<input type="text" class="form-control" id="diary-date" placeholder="Enter diary date">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="diary-description">Description</label>';
  domString += '<textarea class="form-control" id="dairy-entry" rows="3"></textarea>';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-primary mb-2" id="save-diary">Create diary</button>';
  domString += '</form>';
  util.printToDom('create-diary', domString);
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
  addAllDiarys();
};

const initDiary = () => {
  addDiaryDomStringBuilder();
  document.getElementById('diarys').classList.remove('hide');
  document.getElementById('home').classList.add('hide');
  document.getElementById('events').classList.add('hide');
  document.getElementById('news').classList.add('hide');
  const { uid } = firebase.auth().currentUser;
  diarysData.getDiarysByUid(uid)
    .then((diarys) => {
      diaryStringBuilder(diarys);
    })
    .catch(err => console.error('no diarys', err));
};

export default { initDiary };
