export default function renderer(scale) {
  const display = Object.freeze({
    width: 64,
    height: 32,
  });
  const displayState = new Array(display.width * display.height).fill(0);

  const canvas = document.querySelector('#display');
  const ctx = canvas.getContext('2d');

  canvas.width = display.width * scale;
  canvas.height = display.height * scale;

  const setPixel = (x, y) => {
    const coordinates = {
      x,
      y,
    };

    if (x > display.width) {
      coordinates.x -= display.width;
    } else if (x < 0) {
      coordinates.x += display.width;
    }

    if (y > display.height) {
      coordinates.y -= display.height;
    } else if (y < 0) {
      coordinates.y += display.height;
    }

    const pixel = coordinates.x + coordinates.y * display.width;

    displayState[pixel] ^= 1;

    return !displayState[pixel];
  };

  const clear = () => {
    displayState.fill(0);
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    displayState.forEach((_, i) => {
      const x = (i % display.width) * scale;
      const y = Math.floor(i / display.width) * scale;

      if (displayState[i]) {
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, scale, scale);
      }
    });
  };

  return { setPixel, clear, render };
}
