import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../events';

import util from '../../helpers/util';


const deleteEventsEvent = (e) => {
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => (firebase.auth().currentUser.uid))
    .catch(err => console.error('event not deleted', err));
};
const addDeleteBtn = () => {
  const deleteButton = document.getElementsByClassName('delete-events');
  for (let i = 0; i < deleteButton.length; i += 1) {
    deleteButton[i].addEventListener('click', deleteEventsEvent);
  }
};

console.error(addDeleteBtn);

const displayEvents = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += '<div class="card text-center">';
    domString += '<h3 class="headTitle">My Events</h3>';
    domString += `<h3 class="card-header">${event.name} - ${event.date}</h3>`;
    domString += '<div class="card-body">';
    domString += `<button class="btn btn-danger delete-events" id=${event.uid}>Delete</button>`;
    // domString += `<button class="btn btn-success edit-events" id=${event.uid}>Edit</button>`;
    domString += '<blockquote class="blockquote mb-0">';
    domString += `<p>${event.description}</p>`;
    domString += `<footer class="blockquote-footer">${event.name}</footer>`;
    domString += '</blockquote>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-events', domString);
};

const initEvents = () => {
  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then((events) => {
      displayEvents(events);
    })
    .catch(err => console.error('no events', err));

  document.getElementById('home').classList.add('hide');
};

export default { initEvents };
