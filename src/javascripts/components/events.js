import firebase from 'firebase/app';

import eventsData from '../helpers/Data/eventsData';
import '../../styles/events.scss';

import util from '../helpers/util';

const deleteEventsEvent = (e) => {
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => (firebase.auth().currentUser.uid))
    .catch(err => console.error('no-deletion', err));
};

const addDelete = () => {
  const buttonDelete = document.getElementsByClassName('delete-button');
  for (let i = 0; i < buttonDelete.length; i += 1) {
    buttonDelete[i].addEventListener('click', deleteEventsEvent);
  }
};

const displayEvents = () => {
  let domString = '';

  domString += '<div class="card">';
  domString += '<h2 class="card-header">Title</h2>';
  domString += '<div class="card-body">';
  domString += '<div class="btn btn-danger delete-button">Delete</div>';
  domString += '<blockquote class="blockquote mb-0">';
  domString += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>';
  domString += '<footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>';
  domString += '</blockquote>';
  domString += '</div>';
  domString += '</div>';
  util.printToDom('my-events', domString);
  addDelete();
};

const addEventsDomStringBuilder = () => {
  let domString = '';

  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="exampleFormControlInput1">Email address</label>';
  domString += '<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="exampleFormControlTextarea1">Example textarea</label>';
  domString += '<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>';
  domString += '<div class="btn btn-danger delete-button">Delete</div>';
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
