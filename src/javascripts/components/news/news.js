import firebase from 'firebase/app';
import 'firebase/auth';
import newsData from '../../helpers/data/newsData';
import util from '../../helpers/util';

const deleteNewsEvent = (e) => {
  const newsId = e.target.id;
  newsData.deleteNews(newsId)
    .then(() => initNews(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define

    .catch(err => console.error('no delete for you', err));
};
const eventNews = () => {
  const deleteButtons = document.getElementsByClassName('delete-news');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteNewsEvent);
  }
};
const newsStringBuilder = (news) => {
  let domString = '';
  news.forEach((newz) => {
    domString += '<div class="card-body">';
    domString += '<div class="col-6"</div>';
    domString += '<div class="card-body">';
    domString += `<h6 class="card-header"><a href=${newz.articleUrl}>${newz.title}</a></h6>`;
    domString += `<div class="btn btn-danger delete-news" id=${newz.id}>delete</div>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-news', domString);
  eventNews();
};

const initNews = () => {
  document.getElementById('home').classList.add('hide');
  document.getElementById('news').classList.remove('hide');
  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid).then((news) => {
    newsStringBuilder(news);
  })
    .catch(err => console.error('could not get news', err));
};

export default { initNews, eventNews };
