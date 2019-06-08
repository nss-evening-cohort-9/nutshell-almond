import axios from 'axios';

import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((resp) => {
      const eventResults = resp.data;
      const events = [];
      Object.keys(eventResults).forEach((eventId) => {
        eventResults[eventId].id = eventId;
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

export default { getEventsByUid };
