import axios from 'axios';

import apiKeys from './apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getDiarysByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diarys.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const diaryResults = results.data;
      const diarys = [];
      Object.keys(diaryResults).forEach((diaryId) => {
        diaryResults[diaryId].id = diaryId;
        diarys.push(diaryResults[diaryId]);
      });
      resolve(diarys);
    })
    .catch(err => reject(err));
});


const addNewDiarys = myDiarys => axios.post(`${firebaseUrl}/events.json`, myDiarys);

const deleteDiary = diaryId => axios.delete(`${firebaseUrl}/diarys/${diaryId}.json`);

export default { getDiarysByUid, addNewDiarys, deleteDiary };
