import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../../helpers/data/eventsData';

import util from '../../helpers/util';

const deleteEventsEvent = (e) => {
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => {
      initEvents(); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('not deleted', err));
};


const addEvents = (e) => {
  e.preventDefault();
  const newEvent = {
    location: document.getElementById('event-location').value,
    description: document.getElementById('event-description').value,
    uid: firebase.auth().currentUser.uid,
    name: document.getElementById('event-name').value,
    date: document.getElementById('event-date').value,
  };
  eventsData.addEvent(newEvent)
    .then(() => {
      document.getElementById('event-location').value = '';
      document.getElementById('event-description').value = '';
      document.getElementById('event-name').value = '';
      document.getElementById('event-date').value = '';
      initEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new events posted', err));
};

const addAllEvents = () => {
  const deleteButton = document.getElementsByClassName('delete-events');
  for (let i = 0; i < deleteButton.length; i += 1) {
    deleteButton[i].addEventListener('click', deleteEventsEvent);
  }
  document.getElementById('save-event').addEventListener('click', addEvents);
};

const addEventsDomStringBuilder = () => {
  let domString = '';

  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="event-name">Event Name</label>';
  domString += '<input type="eventName" class="form-control" id="event-name" placeholder="Enter event name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="event-location">Location</label>';
  domString += '<input type="location" class="form-control" id="event-location" placeholder="Enter event location">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="event-date">Date</label>';
  domString += '<input type="text" class="form-control" id="event-date" placeholder="Enter event date">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="event-description">Description</label>';
  domString += '<textarea class="form-control" id="event-description" rows="3"></textarea>';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-primary mb-2" id="save-event">Create Event</button>';
  domString += '</form>';
  util.printToDom('create-events', domString);
};

const displayEvents = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += '<div class="card text-center">';
    domString += '<h3 class="headTitle">My Events</h3>';
    domString += `<h3 class="card-header">${event.name} - ${event.date}</h3>`;
    domString += '<div class="card-body">';
    domString += `<button class="btn btn-danger delete-events" id=${event.id}>Delete</button>`;
    // domString += `<button class="btn btn-success edit-events" id=${event.uid}>Edit</button>`;
    domString += '<blockquote class="blockquote mb-0">';
    domString += `<p>${event.description}</p>`;
    domString += `<footer class="blockquote-footer">${event.name}</footer>`;
    domString += '</blockquote>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-events', domString);
  addAllEvents();
};

const initEvents = () => {
  addEventsDomStringBuilder();

  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then((events) => {
      displayEvents(events);
    })
    .catch(err => console.error('no events', err));

  document.getElementById('home').classList.add('hide');
  document.getElementById('diarys').classList.add('hide');
  document.getElementById('events').classList.remove('hide');
};

export default { initEvents };
