// 예시 문제 기반 퀴즈 데이터
const quizData = [
  {
    question: '1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?',
    choices: [
      '곰, 솜 - 자음',
      '종, 공 - 자음',
      '돌, 돈 - 모음',
      '산, 선 - 모음',
      '밥, 법 - 모음'
    ],
    answer: 5
  },
  {
    question: '2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?',
    choices: [
      '음운의 종류에는 자음과 모음이 있다.',
      '말의 뜻을 구별해 주는 소리의 단위이다.',
      '모음은 공기가 그대로 흘러나오는 소리이다.',
      '자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.',
      '음운에 따라 소리 낼 때의 느낌이 달라질 수 있다.'
    ],
    answer: 4
  },
  {
    question: '3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?',
    choices: [
      '음운',
      '음절',
      '단어',
      '문장',
      '형태소'
    ],
    answer: 1
  },
  {
    question: '4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?',
    choices: [
      '솔',
      '달',
      '덕',
      '돈',
      '독'
    ],
    answer: 3
  },
  {
    question: '5. 음운에 대한 설명으로 알맞지 않은 것은?',
    choices: [
      '단어의 음운을 바꾸어 쓰면 의미가 달라진다.',
      '우리말의 음운은 자음과 모음으로 이루어진다.',
      '자음은 공기가 방해를 받으며 나오는 소리이다.',
      '말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.',
      '모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다.'
    ],
    answer: 5
  }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const scoreBox = document.getElementById('score-box');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

function loadQuiz() {
  const quiz = quizData[currentQuiz];
  questionEl.textContent = quiz.question;
  choicesEl.innerHTML = '';
  resultEl.textContent = '';
  quiz.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.id = 'choice' + idx;
    input.value = idx + 1;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = choice;
    li.appendChild(input);
    li.appendChild(label);
    choicesEl.appendChild(li);
  });
}

function getSelected() {
  const radios = document.getElementsByName('choice');
  for (let radio of radios) {
    if (radio.checked) return parseInt(radio.value);
  }
  return null;
}

submitBtn.onclick = function() {
  const selected = getSelected();
  if (!selected) {
    resultEl.textContent = '보기를 선택하세요!';
    return;
  }
  if (selected === quizData[currentQuiz].answer) {
    score++;
    resultEl.textContent = '정답입니다!';
    resultEl.style.color = '#0984e3';
  } else {
    resultEl.textContent = '오답입니다!';
    resultEl.style.color = '#d63031';
  }
  submitBtn.disabled = true;
  setTimeout(() => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
      submitBtn.disabled = false;
    } else {
      showScore();
    }
  }, 1200);
};

function showScore() {
  document.getElementById('quiz-box').style.display = 'none';
  scoreBox.style.display = 'block';
  scoreEl.textContent = `총 점수: ${score} / ${quizData.length}`;
}

restartBtn.onclick = function() {
  currentQuiz = 0;
  score = 0;
  scoreBox.style.display = 'none';
  document.getElementById('quiz-box').style.display = 'block';
  loadQuiz();
  submitBtn.disabled = false;
};

// 첫 문제 로드
window.onload = loadQuiz;
