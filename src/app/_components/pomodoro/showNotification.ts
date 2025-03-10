import { PomodoroStage } from "./timer";

export default function showNotification(completedStage: PomodoroStage) {
  const stageNames = {
    focus: "Foco",
    shortBreak: "Pausa Curta",
    longBreak: "Pausa Longa",
  };

  if ("Notification" in window) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    if (Notification.permission === "granted") {
      new Notification("Pomodoro Timer", {
        body: `Ciclo de ${stageNames[completedStage]} finalizado!`,
        icon: "/favicon.ico",
      });
    }
  }
}
