import diarysData from '../helpers/diarysData';

import util from '../helpers/util';


const diaryStringBuilder = () => {
  diarysData.getDiarysByUid().then((diarys) => {
    let domString = '';
    diarys.forEach((diary) => {
      domString += `<h2 class="card-header">${diary.name} - ${diary.date}</h2>`;
      domString += '<div class="card-body">';
      domString += `<div class="btn btn-danger delete-button" id=${diary.uid}>Delete</div>`;
      domString += '<blockquote class="blockquote mb-0">';
      domString += `<p>${diary.description}</p>`;
      domString += `<footer class="blockquote-footer">${diary.name}</footer>`;
      domString += '</blockquote>';
      domString += '</div>';
      domString += '</div>';
    });
    util.printToDom('my-diarys', domString);
  //  need to do addDiarys(); here
  })
    .catch(err => console.error('no events', err));
};

const initDiary = () => {
  diarysData.getDiarysByUid();
  // displayDiarys();
  diaryStringBuilder();
};

export default { initDiary };
