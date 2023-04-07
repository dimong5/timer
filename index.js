const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    buttonEl.disabled = true;
    const formatTime = (t) => {
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);
      return `${hours}:${mins}:${secs}`;
    };
    let initTime = new Date().getTime();
    let endTime = initTime + seconds * 1000;
    timerEl.innerText = formatTime(endTime - initTime);
    const intervalId = setInterval(() => {
      let now = new Date().getTime();
      let time = endTime - now + 1000;

      timerEl.innerText = formatTime(time);
      if (now > endTime) {
        timerEl.innerText = "Time is up!";
        clearInterval(intervalId);
        buttonEl.disabled = false;
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (event) => {
  inputEl.value = inputEl.value.replace(/[^\d]+/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  inputEl.innerText = seconds;

  animateTimer(seconds);

  inputEl.value = "";
});
