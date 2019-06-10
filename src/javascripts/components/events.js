import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../helpers/data/eventsData';
import '../../styles/events.scss';

import util from '../helpers/util';

// const createEvent = (e) => {
//   e.preventDefault();
//   const newEvent = {
//     location: document.getElementById('titleForm').value,
//     description: document.getElementById('dateForm').value,
//     date: document.getElementById('locationForm').value,
//     name: document.getElementById('descriptionForm').value,
//   };
//   eventsData.addNewEvents(newEvent)
//     .then(() => {
//       document.getElementById('titleForm').value = '';
//       document.getElementById('dateForm').value = '';
//       document.getElementById('locationForm').value = '';
//       document.getElementById('descriptionForm').value = '';
//       addEventsDomStringBuilder(); // eslint-disable-line no-use-before-define
//     })
//     .catch(err => console.error('no event added', err));
// };

const deleteEventsEvent = (e) => {
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => (firebase.auth().currentUser.uid))
    .catch(err => console.error('no-deletion', err));
};

const addEvents = () => {
  const buttonDelete = document.getElementsByClassName('delete-events');
  for (let i = 0; i < buttonDelete.length; i += 1) {
    buttonDelete[i].addEventListener('click', deleteEventsEvent);
  }
};

const displayEvents = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += '<div class="card text-center">';
    domString += '<h3 class="headTitle">My Events</h3>';
    domString += `<h3 class="card-header">${event.name} - ${event.date}</h3>`;
    domString += '<div class="card-body">';
    domString += `<div class="btn btn-danger delete-events" id=${event.uid}>Delete</div>`;
    domString += `<div class="btn btn-success edit-events" id=${event.uid}>Edit</div>`;
    domString += '<blockquote class="blockquote mb-0">';
    domString += `<p>${event.description}</p>`;
    domString += `<footer class="blockquote-footer">${event.name}</footer>`;
    domString += '</blockquote>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-events', domString);
  addEvents();
};

const addEventsDomStringBuilder = () => {
  let domString = '';

  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<h1 class="headTitle">Create an Event</h1>';
  domString += '<label for="titleFormControl"><h5>Event Title</h5></label>';
  domString += '<input type="title" class="form-control" id="titleFormControl" placeholder="Enter event name">';
  domString += '<label for="dateFormControl"><h5>Event Date</h5></label>';
  domString += '<input type="text" class="form-control" id="dateFormControl" placeholder="Enter event date">';
  domString += '<label for="locationFormControl"><h5>Location</h5></label>';
  domString += '<input type="location" class="form-control" id="locationFormControl" placeholder="Event location">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="descriptionFormControl"><h5>Description</h5></label>';
  domString += '<textarea class="form-control" id="descriptionFormControl" rows="3" placeholder="Event Description"></textarea>';
  domString += '<div class="btn btn-success create-events">Create Event</div>';
  domString += '</div>';
  domString += '</form>';
  util.printToDom('create-events', domString);
};

const initEvents = () => {
  const { uid } = firebase.auth().currentUser;
  eventsData.getEventsByUid(uid)
    .then((events) => {
      addEventsDomStringBuilder();
      displayEvents(events);
    })
    .catch(err => console.error('no events', err));

  document.getElementById('home').classList.add('hide');
};

export default { initEvents };
