import firebase from 'firebase/app';
import 'firebase/auth';
import newsData from '../helpers/data/newsData';
import util from '../helpers/util';

const newsStringBuilder = (news) => {
  let domString = '';
  news.forEach((newz) => {
    domString += `<h4 class="card-header"> ${newz.title}</h4>`;
    domString += '<div class="card-body">';
    domString += '<div class="col-6"</div>';
    domString += `<h6 class="card-header"><a href=${newz.articleUrl}>${newz.title}</a></h6>`;
    domString += '<div class="card-body">';
    // domString += `<div class="btn btn-danger delete-button" id=${newz.uid}>delete</div>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-news', domString);
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

export default { initNews };
