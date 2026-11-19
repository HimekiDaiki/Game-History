// Menu responsivo
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
}

// Linha do tempo interativa da página inicial
const timelineData = {
  "1958": ["Experimentos ganham vida", "Experiências como Tennis for Two demonstraram que uma tela também poderia ser um espaço de interação e diversão."],
  "1972": ["Os consoles chegam às casas", "O Magnavox Odyssey foi lançado e Pong ajudou a popularizar os jogos eletrônicos nos fliperamas."],
  "1985": ["Uma nova geração", "O NES ajudou a fortalecer o mercado de consoles e personagens como Mario conquistaram jogadores."],
  "1994": ["A revolução 3D", "O PlayStation marcou a chegada de uma nova fase, com jogos em CD e experiências tridimensionais."],
  "2000": ["Conexão e mundos maiores", "A geração do PlayStation 2 ampliou as experiências multimídia e os jogos passaram a explorar cada vez mais a conexão online."],
  "2020": ["A era da imersão", "Consoles atuais, jogos em nuvem e realidade virtual continuam expandindo as possibilidades."]
};
const timeButtons = document.querySelectorAll(".time-point");
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    timeButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const [title, text] = timelineData[button.dataset.era];
    document.querySelector("#detail-year").textContent = button.dataset.era === "2020" ? "2020+" : button.dataset.era;
    document.querySelector("#detail-title").textContent = title;
    document.querySelector("#detail-text").textContent = text;
  });
});

// Quiz de conhecimentos gerais
const questions = [
  { q: "Qual console doméstico foi lançado pela Atari em 1977?", a: ["Atari 2600", "PlayStation", "Nintendo 64"], correct: 0, explain: "Isso mesmo! O Atari 2600 ajudou a popularizar os consoles com cartuchos." },
  { q: "Qual empresa lançou o PlayStation original?", a: ["Nintendo", "Sony", "Sega"], correct: 1, explain: "Correto! O primeiro PlayStation foi lançado no Japão em 1994." },
  { q: "Qual tecnologia ganhou destaque na geração do PlayStation e Nintendo 64?", a: ["Gráficos 3D", "Cartuchos de áudio", "Tela sensível ao toque"], correct: 0, explain: "Muito bem! Os gráficos tridimensionais mudaram a forma de explorar os jogos." }
];
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-question");
if (questionEl && answersEl && nextButton) {
  let current = 0, score = 0;
  function showQuestion() {
    const item = questions[current];
    document.querySelector("#quiz-progress-label").textContent = `PERGUNTA ${current + 1} DE ${questions.length}`;
    document.querySelector("#progress-fill").style.width = `${((current + 1) / questions.length) * 100}%`;
    questionEl.textContent = item.q;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextButton.hidden = true;
    item.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.textContent = answer;
      button.addEventListener("click", () => selectAnswer(index));
      answersEl.appendChild(button);
    });
  }
  function selectAnswer(index) {
    const item = questions[current];
    const buttons = [...answersEl.querySelectorAll("button")];
    buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === item.correct) button.classList.add("correct");
      if (i === index && index !== item.correct) button.classList.add("wrong");
    });
    if (index === item.correct) score++;
    feedbackEl.textContent = (index === item.correct ? "Resposta correta! " : "Não foi dessa vez. ") + item.explain;
    nextButton.hidden = false;
    nextButton.textContent = current === questions.length - 1 ? "Ver resultado" : "Próxima pergunta →";
  }
  nextButton.addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      showQuestion();
    } else {
      questionEl.textContent = "Quiz concluído!";
      answersEl.innerHTML = "";
      feedbackEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
      nextButton.hidden = true;
      document.querySelector("#quiz-progress-label").textContent = "FINALIZADO";
      document.querySelector("#progress-fill").style.width = "100%";
    }
  });
  showQuestion();
}
