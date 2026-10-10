import Vector from './vector.js';

function colorPx(data, px, color) {
  data[px * 4] = color.r;
  data[px * 4 + 1] = color.g;
  data[px * 4 + 2] = color.b;
  data[px * 4 + 3] = 255;
}

// The ray from the camera through the middle of pixel (i, j).
function rayThroughPixel(i, j, width, height) {
  return new Vector(
    (((2 * (i + 0.5)) / width) - 1) * (width / height),
    (1 - ((2 * (j + 0.5)) / height)),
    -3,
  ).normalize();
}

// Fills `data` (RGBA, 4 bytes per pixel, row by row) with the scene.
// Needs no browser: `data` can be any array of width * height * 4.
export default function render(scene, data, width, height) {
  const {
    objects, camera, light, ambient,
  } = scene;

  for (let j = 0; j < height; j += 1) {
    for (let i = 0; i < width; i += 1) {
      const px = (i + (j * width));
      const p = rayThroughPixel(i, j, width, height);

      let t = Infinity;
      let objectT = Infinity;
      for (let k = 0; k < objects.length; k += 1) {
        objectT = Math.min(objects[k].intersect(p, camera.p), objectT);
        if (objectT < t) {
          const hit = p.times(objectT);
          const n = objects[k].normalAt(hit);
          const l = light.minus(hit).normalize();
          const directLight = Math.max(Vector.dot(n, l), 0);
          colorPx(data, px, {
            r: objects[k].c.r * directLight,
            g: objects[k].c.g * directLight,
            b: objects[k].c.b * directLight,
          });
        }
        t = objectT;
      }
      if (objectT === Infinity) {
        colorPx(data, px, ambient);
      }
    }
  }
}
