import Color from 'rgb-color-class';
import { Vector3d as Vector } from './modules/3d-vectors';
import { Sphere } from './modules/3d-objects';
import { colorPixel, getPixelColor } from './modules/color-formulas';
const WIDTH = 800;
const HEIGHT = 600;
const { dotProduct } = Vector;

function getRayCamToPix(i, j, w, h) {
  return new Vector(
    (((2 * (i + 0.5)) / w) - 1) * (WIDTH / h),
    (1 - ((2 * (j + 0.5)) / h)),
    -3,
  );
}

function render(scene, imageData, ctx) {
  const {
    camera, objects, light, ambient, dimensions,
  } = scene;
  const { w, h } = dimensions;

  for (let j = 0; j < h; j += 1) {
    for (let i = 0; i < w; i += 1) {
      const pixelIndex = (i + (j * w));
      const normalRayCamToPix = getRayCamToPix(i, j, w, h).normalize();

      let t = Infinity;
      let objectT = Infinity;

      objects.forEach((object) => {
        objectT = Math.min(
          objectT,
          object.computeRayIntersect(normalRayCamToPix, camera),
        );

        if (objectT < t) {
          const objectColor = getPixelColor(normalRayCamToPix, object, objectT, light);
          colorPixel(pixelIndex, objectColor, imageData);
        }
        t = objectT;
      });

      if (objectT === Infinity) {
        colorPixel(pixelIndex, ambient, imageData);
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const c = document.createElement('canvas');
  c.id = 'c';
  c.width = WIDTH;
  c.height = HEIGHT;
  c.style = 'border: 1px solid black; margin: auto';
  body.appendChild(c);

  const ctx = c.getContext('2d');
  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const { data } = imageData;

  const scene = {
    camera: { coord: new Vector(0, 0, 0) },
    objects: [],
    light: new Vector(0, 4, -9),
    ambient: new Color(35, 15, 25),
    dimensions: { w: WIDTH, h: HEIGHT },
  };
  const sphere1 = new Sphere({ x: 2.5, y: 2, z: -9 }, 1, new Color(0, 255, 255));
  const sphere2 = new Sphere({ x: 0, y: -2, z: -20 }, 2, new Color(255, 0, 0));
  const sphere3 = new Sphere({ x: -5, y: 3, z: -17.5 }, 3, new Color(0, 0, 255));
  const sphere4 = new Sphere({ x: 4, y: -2, z: -9 }, 1, new Color(0, 255, 0));
  scene.objects.push(sphere1, sphere2, sphere3, sphere4);

  render(scene, imageData, ctx);
});
