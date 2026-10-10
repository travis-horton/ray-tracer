import defaultScene from './lib/scene.js';
import render from './lib/render.js';

const WIDTH = 800;
const HEIGHT = 600;

const renderRayTracerInElement = (parentContainerId) => {
  const c = document.createElement('canvas');
  c.id = 'c';
  c.width = WIDTH;
  c.height = HEIGHT;
  c.style = 'border: 1px solid black; margin: auto';
  const ctx = c.getContext('2d');
  document.getElementById(parentContainerId).appendChild(c);

  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  render(defaultScene(), imageData.data, WIDTH, HEIGHT);
  ctx.putImageData(imageData, 0, 0);
};

export default renderRayTracerInElement;
