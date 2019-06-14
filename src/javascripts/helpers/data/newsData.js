import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNewsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const newsResults = results.data;
      const news = [];
      Object.keys(newsResults).forEach((newsId) => {
        newsResults[newsId].id = newsId;
        news.push(newsResults[newsId]);
      });
      resolve(news);
    })
    .catch(err => reject(err));
});

const addNews = newsObject => axios.post(`${firebaseUrl}/news.json`, newsObject);

const deleteNews = newsId => axios.delete(`${firebaseUrl}/news/${newsId}.json`);

export default { getNewsByUid, deleteNews, addNews };
