import eventsData from '../helpers/Data/eventsData';

import util from '../helpers/util';

const createEvents = (event) => {
  let domString = '';

  domString += '<div class="card">';
  domString += '<div class="card-header">';
  domString += 'Quote';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<blockquote class="blockquote mb-0">';
  domString += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>';
  domString += '<footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>';
  domString += '</blockquote>';
  domString += '</div>';
  domString += '</div>';
  util.printToDom('my-events', domString);
};

const initEvents = () => {
  eventsData.getEventsByUid();
  createEvents();
};

initEvents();

export default { initEvents };
