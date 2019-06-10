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
      console.error(uid);
      console.error(events);
      resolve(events);
    })
    .catch(err => reject(err));
});

const addNewEvents = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);
const deleteEvents = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json}`);
const updateEvents = eventId => axios.put(`${firebaseUrl}/events/${eventId}.json}`);

export default {
  getEventsByUid,
  addNewEvents,
  deleteEvents,
  updateEvents,
};
