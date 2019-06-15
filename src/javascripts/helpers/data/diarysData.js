import axios from 'axios';

import apiKeys from '../apiKeys.json';

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

const addDiary = diaryObject => axios.post(`${firebaseUrl}/diarys.json`, diaryObject);

const deleteDiary = diaryId => axios.delete(`${firebaseUrl}/diary/${diaryId}.json`);

export default { getDiarysByUid, deleteDiary, addDiary };
