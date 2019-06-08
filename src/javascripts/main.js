import '../styles/main.scss';
import 'bootstrap';

import events from './components/events';

// document.getElementById('diary').addEventListener('click', () => {
//   console.error('diary was clicked');
// });
// document.getElementById('events').addEventListener('click', () => {
//   console.error('events was clicked');
// });
// document.getElementById('news').addEventListener('click', () => {
//   console.error('news was clicked');
// });

const init = () => {
  events.initEvents();
};

init();
