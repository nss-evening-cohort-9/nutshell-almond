import Axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNewsByUid = uid => new Promise((resolve, reject) => {
  Axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const newsResults = results.data;
      const news = [];
      Object.keys(newsResults).forEach((newsId) => {
        newsResults[newsId].id = newsId;
        news.push(newsResults[newsId]);
      });
      resolve(news[0]);
    })
    .catch(err => reject(err));
});


export default { getNewsByUid };
