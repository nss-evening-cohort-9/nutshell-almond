// import firebase from 'firebase/app';

import eventsData from '../helpers/data/eventsData';
import '../../styles/events.scss';

import util from '../helpers/util';


// const deleteEventsEvent = (e) => {
//   const eventId = e.target.id;
//   eventsData.deleteEvent(eventId)
//     .then(() => (firebase.auth().currentUser.uid))
//     .catch(err => console.error('no-deletion', err));
// };

// const addDelete = () => {
//   const buttonDelete = document.getElementsByClassName('delete-button');
//   for (let i = 0; i < buttonDelete.length; i += 1) {
//     buttonDelete[i].addEventListener('click', deleteEventsEvent);
//   }
// };

const displayEvents = () => {
  eventsData.getEventsByUid().then((events) => {
    let domString = '';
    events.forEach((event) => {
      domString += '<div class="card">';
      domString += `<h2 class="card-header">${event.name} - ${event.date}</h2>`;
      domString += '<div class="card-body">';
      domString += `<div class="btn btn-danger delete-button" id=${event.uid}>Delete</div>`;
      domString += '<blockquote class="blockquote mb-0">';
      domString += `<p>${event.description}</p>`;
      domString += `<footer class="blockquote-footer">${event.name}</footer>`;
      domString += '</blockquote>';
      domString += '</div>';
      domString += '</div>';
    });
    util.printToDom('my-events', domString);
    // addDelete();
  })
    .catch(err => console.error('no events', err));
};

const addEventsDomStringBuilder = () => {
  let domString = '';

  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="titleFormControl"><h5>Event Title</h5></label>';
  domString += '<input type="title" class="form-control" id="titleFormControl" placeholder="Enter event name">';
  domString += '<label for="dateFormControl"><h5>Event Title</h5></label>';
  domString += '<input type="date" class="form-control" id="dateFormControl" placeholder="Enter event date">';
  domString += '<label for="locationFormControl"><h5>Location</h5></label>';
  domString += '<input type="location" class="form-control" id="locationFormControl" placeholder="Enter location">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="descriptionFormControl"><h5>Description</h5></label>';
  domString += '<textarea class="form-control" id="descriptionFormControl" rows="3" placeholder="Event Description"></textarea>';
  domString += '<div class="btn btn-success create-button">Create Event</div>';
  domString += '</div>';
  domString += '</form>';
  util.printToDom('create-events', domString);
};

const initEvents = () => {
  eventsData.getEventsByUid();
  displayEvents();
  addEventsDomStringBuilder();
};

initEvents();

export default { initEvents };
