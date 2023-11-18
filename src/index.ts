import {
  checkMessageCount,
  getElapsedTime,
  resetInputState,
  startCountdown,
} from "./check";
import { PersistKey } from "./types";
import { sleep } from "./utils";
let startTime: number | null = null;
export const inputField = document.querySelector(
  "input, textarea",
) as HTMLInputElement;
const savedStartTime = localStorage.getItem(PersistKey.ChatDisabled);
sleep(15000);
if (savedStartTime) {
  startTime = parseInt(savedStartTime, 10);
  const elapsedTime: number = getElapsedTime(startTime);
  if (elapsedTime <= 3) {
    sleep(10000);
    startCountdown(startTime);
    inputField.disabled;
    inputField.setAttribute("disabled", "true");
  } else {
    resetInputState();
  }
}

if (inputField) {
  inputField.addEventListener("keydown", (event) => {
    // Use type assertion here
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Enter") {
      checkMessageCount(startTime);
    }
  });
}
