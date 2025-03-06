//変数の初期化
let untyped = '';
let typed = '';
let score = 0;


//必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const countUp = document.getElementById('countUp');
const timeup = document.getElementById('timeup');
const count = document.getElementById('count');

//複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

  // ランダムなテキストを表示
  //const createText = () => {};
  const createText = () => {
  //正タイプした文字列列をクリア
  typed = '';
  typedfield.textContent = typed;

  //console.log(Math.random());
  //console.log(Math.random() * textLists.length);
  //console.log(Math.floor(Math.random() * textLists.length));

  //配列のインデックス数からランダム数値を生成する
  let random = Math .floor(Math.random() * textLists.length);
  //untyped = textLists[1];

  //配列からランダムテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
//createText();

 // キー入力の判定
  const keyPress = e => {
//const keyPress = e => {
  //console.log(e.key);
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    //１００ms秒後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    },100);
    return;
  }

  //正タイプの場合
  //スコアのインクリメント
  score++;

  wrap.classList.remove('mistyped');

  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  //正タイプ数の表示
  countUp.textContent = score;

  //テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
  createText();
  }
};

// タイピングスキルのランクを判定
//const rankCheck = score => {};
const rankCheck = score => {

  //スコアの値を返す
  //return `${score}文字打てました！`;

  //テキストを格納する変数を作る
  let text = '';

  //スコアに応じて異なるメッセージを変数textに格納する
  if (score < 100 ) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200 ) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300 ){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300 ){
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
  //生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n[OK] リトライ / [キャンセル]終了`;
};

// ゲームを終了
//const gameOver = id => {};
const gameOver = id => {
  clearInterval(id);
  
  // タイムアップと表示してから確認ダイアログを表示する
  setTimeout(() => {
    untypedfield.textContent = 'タイムアップ！';
    
    // 確認ダイアログをさらにその後に表示
    setTimeout(() => {
      const result = confirm(rankCheck(score));
      if (result == true) {
        window.location.reload();
      }
    }, 10); // 0.01秒後にダイアログを表示
  }, 10); // 0.01秒後にタイムアップを表示
};

  
  //console.log('ゲーム終了!');
  const result = confirm(rankCheck(score));

  //OKボタンをクリックされたらリロードする
  if (result == true) {
    window.location.reload();
  }



// カウントダウンタイマー
//const timer = () => {};
const timer = () => {

  //タイマー部分の要素HTML要素（p要素）を取得する
  let time = count.textContent;
  
  const id = setInterval(() => { 
  
    //カウントダウンする
    time--;
    count.textContent = time;
  
    //カウントが０になったらタイマーを停止するする
    if(time <= 0) {
      //clearInterval(id);
      gameOver(id);
  
    }
  }, 1000);
};

//キーボードのイベント処理
//document.addEventListener('keypress',keyPress);

//ゲームスタート時の処理
start.addEventListener('click', () => {

  //カウントダウンタイマーを開始する
  timer();

  //ランダムなテキストを表示する
  createText();

  //「スタート」ボタンを非表示にする
  start.style.display = 'none';

  //キーボードのイベント処理
  document.addEventListener('keypress',keyPress);
  });

untypedfield.textContent = 'スタートボタンで開始';

