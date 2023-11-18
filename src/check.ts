import { inputField } from ".";
import { PersistKey } from "./types";
import { sleep } from "./utils";
let messageCount: number = 0;
let startTime: number | null = null;
function setStartTime() {
  startTime = Date.now();
  localStorage.setItem(PersistKey.ChatDisabled, startTime.toString());
  return startTime;
}
function checkMessageCount(_startTime: number | null): void {
  startTime = _startTime;
  if (startTime === null) {
    startTime = setStartTime();
    startCountdown(startTime);
  }

  const elapsedTime: number = getElapsedTime(startTime);

  if (elapsedTime >= 3) {
    messageCount = 0;
    startTime = setStartTime();
  }

  messageCount++;
  if (messageCount >= 12) {
    alert(
      "آخ آخ عزیزم تو محدودیت 12 تا سوال در سه ساعت خودت و تکمیل کردی ممنون ازت سه ساعت دیگه میبینمت.",
    );

    if (inputField) {
      startCountdown(startTime);
      inputField.disabled;
      inputField.setAttribute("disabled", "true");
    }
  }
}

function getElapsedTime(startTime: number) {
  const elapsedTime = (Date.now() - startTime) / (1000 * 60 * 60);
  return elapsedTime;
}

function resetInputState() {
  localStorage.removeItem(PersistKey.ChatDisabled);
  startTime = null;

  const inputField = document.querySelector(
    "input, textarea",
  ) as HTMLInputElement;
  if (inputField) {
    inputField.removeAttribute("disabled");
    inputField.value = ""; // Reset the input field text
  }
}

function updateInputFieldWithTime(timeString: string) {
  const inputField = document.querySelector(
    "input, textarea",
  ) as HTMLInputElement;
  if (inputField) {
    inputField.value = timeString;
  }
}

function startCountdown(startTime: number) {
  const countdownInterval = setInterval(() => {
    if (startTime) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
      const timeLeft = Math.max(3 * 60 * 60 - elapsedTime, 0); // Remaining time in seconds

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        resetInputState();
        return;
      }

      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = Math.floor(timeLeft % 60);

      const timeString = `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      updateInputFieldWithTime(timeString);
    }
  }, 1000);
}

export { checkMessageCount, resetInputState, getElapsedTime, startCountdown };
