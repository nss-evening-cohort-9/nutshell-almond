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

const addNews = (e) => {
  e.preventDefault();
  const newNews = {
    title: document.getElementById('news-title').value,
    articleUrl: document.getElementById('articleUrl').value,
    uid: firebase.auth().currentUser.uid,
  };
  newsData.addNews(newNews)
    .then(() => {
      document.getElementById('news-title').value = '';
      document.getElementById('articleUrl').value = '';
      initNews(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new event for you', err));
};

const addAllNews = () => {
  const deleteButton = document.getElementsByClassName('delete-news');
  for (let i = 0; i < deleteButton.length; i += 1) {
    deleteButton[i].addEventListener('click', deleteNewsEvent);
  }
  document.getElementById('save-news').addEventListener('click', addNews);
};

const addNewsDomStringBuilder = () => {
  let domString = '';
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="Title">Title</label>';
  domString += '<input type="newsTitle" class="form-control" id="news-title" placeholder="Enter news title">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="articleUrl">articleUrl</label>';
  domString += '<input type="text" class="form-control" id="articleUrl" placeholder="articleUrl">';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-primary mb-2" id="save-news">Create News</button>';
  domString += '</form>';
  util.printToDom('create-news', domString);
};

const newsStringBuilder = (news) => {
  let domString = '';
  news.forEach((newz) => {
    domString += '<div class="card text-center">';
    domString += '<h3 class="headTitle">My News</h3>';
    domString += '<div class="card-body">';
    domString += `<h6 class="card-header"><a href=${newz.articleUrl}>${newz.title}</a></h6>`;
    domString += `<div class="btn btn-danger delete-news" id=${newz.id}>delete</div>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('my-news', domString);
  addAllNews();
};

const initNews = () => {
  addNewsDomStringBuilder();

  const { uid } = firebase.auth().currentUser;
  newsData.getNewsByUid(uid)
    .then((news) => {
      newsStringBuilder(news);
    })
    .catch(err => console.error('could not get news', err));

  document.getElementById('home').classList.add('hide');
  document.getElementById('news').classList.remove('hide');
  document.getElementById('events').classList.add('hide');
  document.getElementById('diarys').classList.add('hide');
};

export default { initNews };
