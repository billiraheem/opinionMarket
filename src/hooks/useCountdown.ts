import { useState, useEffect } from 'react';

export function useCountdown(targetDateIso: string): string {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(targetDateIso));

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(formatTimeLeft(targetDateIso));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  return timeLeft;
}

function formatTimeLeft(targetIso: string): string {
  const diff = new Date(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return '00:00:00';
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (days > 0) {
    return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
