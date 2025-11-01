const { animate, inView, hover, stagger } = Motion;

const TIMER_DURATION = 5 * 60;

let diceValue = 8;
let timerState = "paused";
let secondsRemaining = TIMER_DURATION;
let timerInterval = null;

function rollDice() {
  diceValue = Math.floor(Math.random() * 8) + 1;
  document.getElementById("dice-value").textContent = diceValue;
  animate(
    "#dice-value",
    { rotate: [90, 0] },
    { duration: 0.4, type: "spring", bounce: 0.75 }
  );
}

function tick() {
  secondsRemaining--;
  updateTimer();
  if (secondsRemaining <= 0) {
    pressReset();
  }
  animate(
    "#timer-display",
    { color: ["#a00", "#000"] },
    { duration: 1, easing: "ease-in-out" }
  );
  animate(
    "#timer-display",
    { rotate: [-45, 15, -30, 0] },
    { duration: 0.4, type: "spring", bounce: 0.75 }
  );
  if (secondsRemaining <= 60) {
    animate(
      "body",
      { backgroundColor: ["#ffd0d0", "#fff"] },
      { duration: 1, easing: "ease-in-out" }
    );
  }
}

function updateTimer() {
  const minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  document.getElementById(
    "timer-display"
  ).textContent = `${minutes}:${seconds}`;
}

function pressPlay() {
  timerState = "playing";
  timerInterval = setInterval(tick, 1000);
  document.getElementById("pause-icon").style.display = "block";
  document.getElementById("play-icon").style.display = "none";
}

function pressPause() {
  timerState = "paused";
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById("pause-icon").style.display = "none";
  document.getElementById("play-icon").style.display = "block";
}

function pressReset() {
  timerState = "paused";
  secondsRemaining = TIMER_DURATION;
  clearInterval(timerInterval);
  timerInterval = null;
  updateTimer();
  document.getElementById("pause-icon").style.display = "none";
  document.getElementById("play-icon").style.display = "block";
}

function openHelpModal() {
  const helpModalBackground = document.getElementById("help-modal-background");
  const helpModal = document.getElementById("help-modal");
  helpModalBackground.style.display = "flex";
  helpModal.style.display = "block";
  animate(
    helpModal,
    { y: ["100vh", 0] },
    { duration: 1.0, type: "spring", bounce: 0.75 }
  );
}

function closeHelpModal() {
  const helpModalBackground = document.getElementById("help-modal-background");
  const helpModal = document.getElementById("help-modal");
  // TODO Ideally the below happens after the animation completes
  helpModalBackground.style.display = "none";
  helpModal.style.display = "none";
  animate(
    helpModal,
    { y: [0, "100vh"] },
    { duration: 1.0, type: "spring", bounce: 0.75 }
  );
}

function initAnimations() {
  hover(".hover-icon", (element) => {
    animate(element, { scale: 1.3 });

    return () => animate(element, { scale: 1 });
  });

  hover(".dice-value", (element) => {
    animate(element, { scale: 2.0, rotate: -15 });

    return () => animate(element, { scale: 1, rotate: 0 });
  });

  hover(".solo-container", (element) => {
    animate(element, { scale: 1.3 });

    return () => animate(element, { scale: 1 });
  });

  hover(".close-icon", (element) => {
    animate(element, { rotate: 90 });

    return () =>
      animate(
        element,
        { rotate: 0 },
        { duration: 0.5, type: "spring", bounce: 0.5 }
      );
  });

  animate(
    "body .stagger-in",
    { opacity: [0, 1], y: [50, 0] },
    { delay: stagger(0.2) }
  );
}

window.onload = () => {
  initAnimations();
};
