
import firebase from 'firebase/app';

import eventsData from '../helpers/Data/eventsData';
import '../../styles/events.scss';

import util from '../helpers/util';

const deleteEventsEvent = (e) => {
  const eventId = e.target.id;
  eventsData.eventsData(eventId)
    .then(() => (firebase.auth().currentUser.uid))
    .catch(err => console.error('no-deletion', err));
};

const createEvents = () => {
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
  document.getElementsByClassName('delete-button').addEventListener('click', deleteEventsEvent);
};

const initEvents = () => {
  eventsData.getEventsByUid();
  createEvents();
};

initEvents();

export default { initEvents };
