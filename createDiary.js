// npm run serve, http://localhost:8080/
'use strict';
const dateInput = document.getElementById('date');
const questionGoodInput = document.getElementById('question-good');
const questionTomorrowInput = document.getElementById('question-tomorrow');
const createDiaryButton = document.getElementById('createDiary');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
 * 指定した子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        // 子要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

createDiaryButton.onclick = () => {
    const date = dateInput.value;
    const questionGood = questionGoodInput.value;
    const questionTomorrow = questionTomorrowInput.value;
    // 日付が空の時は処理を終了する
    if ((date.length === 0) || (questionGood.length === 0) || (questionTomorrow.length === 0)) {
        return;
}

    // 診断結果表示エリアの作成
   removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = createDiary(date, questionGood, questionTomorrow);
    paragraph .innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('日記つくるさん') + '&ref_src=twsrc%5Etfw';

        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';

        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #日記つくるさん';

        tweetDivided.appendChild(anchor);

        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        tweetDivided.appendChild(script);
};

const answer = '記録してくれてありがとう！\n{date}に起きたよかったことは{questionGood}。\n明日やりたいことは{questionTomorrow}。\n明日もいいことがありますように！';

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} date 日付
 * @param {string} questionGood 質問_よかったこと
 * @param {string} questionTommorow 質問_明日したいこと
 * @return {string} 診断結果
 */
function createDiary(date, questionGood, questionTomorrow) {

    let result = answer;

    result = result.replaceAll('{date}', date);
    result = result.replaceAll('{questionGood}', questionGood);
    result = result.replaceAll('{questionTomorrow}', questionTomorrow);

    return result;
}

dateInput.onkeydown = event => {
    if (event.key === 'Enter') {
      createDiaryButton.onclick()
    }
  };
  
// テストコード
/*
console.assert(
    createDiary('太郎') ===
    '太郎の日記が完成しました！');
*/