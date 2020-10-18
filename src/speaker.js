export default function speaker() {
  const audioCtx = window.AudioContext || window.webkitAudioContext;
  const gain = audioCtx.createGain();
  const finish = audioCtx.destination;

  let oscillator;

  gain.connect(finish);

  const play = frequency => {
    if (audioCtx && !oscillator) {
      oscillator = audioCtx.createOscillator();

      oscillator.frequency.setValueAtTime(frequency || 440, audioCtx.currentTime);

      oscillator.type = 'square';
      oscillator.connect(gain);
      oscillator.start();
    }
  };

  const stop = () => {
    if (!oscillator) return;

    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  };

  return { play, stop };
}
