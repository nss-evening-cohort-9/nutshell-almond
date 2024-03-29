import axios from 'axios';

import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventResults = results.data;
      const events = [];
      Object.keys(eventResults).forEach((eventId) => {
        eventResults[eventId].id = eventId;
        events.push(eventResults[eventId]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);
const addEvent = newEvent => axios.post(`${firebaseUrl}/events.json`, newEvent);


export default { getEventsByUid, deleteEvent, addEvent };
