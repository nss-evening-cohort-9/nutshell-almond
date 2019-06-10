/* eslint-disable no-trailing-spaces */
import util from '../helpers/util';
import newsData from '../helpers/data/newsData';
 
const newsStringBuilder = (uid) => {
  newsData.getNewsByUid(uid).then((news) => {
    let domString = `<h1>${news.title}</h1>`;
    domString += `<input type="${news.articleUrl}"/>`;
    util.printToDom('news', domString);
  }).catch(err => console.error('could not get news', err));
};

const initNews = () => {
  newsStringBuilder();
};

initNews();

export default { newsStringBuilder };
