import Color from 'rgb-color-class';
import { Vector3d as Vector } from './modules/3d-vectors';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const WIDTH = 800;
  const HEIGHT = 600;

  const c = document.createElement('canvas');
  c.id = 'c';
  c.width = WIDTH;
  c.height = HEIGHT;
  c.style = 'border: 1px solid black; margin: auto';
  const ctx = c.getContext('2d');
  body.appendChild(c);

  const imageData = ctx.getImageData(0, 0, c.width, c.height);

  const { data } = imageData;
  const { dotProduct } = Vector;

  class Sphere {
    constructor(center, radius, color) {
      this.p = center;
      this.r = radius;
      this.c = color;
    }

    intersect(ray, camera) {
      const oMinusP = camera.coord.subtract(this.p);
      const a1 = dotProduct(ray, ray);
      const b1 = 2 * (dotProduct(ray, oMinusP));
      const c1 = dotProduct(oMinusP, oMinusP) - (this.r * this.r);
      const d1 = b1 * b1 - 4 * a1 * c1;
      const solution = d1 > 0
        ? Math.max(
          (-b1 + Math.sqrt(d1)) / (2 * a1),
          (-b1 - Math.sqrt(d1)) / (2 * a1),
        )
        : Infinity;

      return solution;
    }

    computeNormal(pointHit) {
      const normal = pointHit.subtract(this.p).normalize();
      normal.z = -normal.z;
      return normal;
    }
  }

  function colorPixel(pixelIndex, color) {
    data[pixelIndex * 4] = color.r;
    data[pixelIndex * 4 + 1] = color.g;
    data[pixelIndex * 4 + 2] = color.b;
    data[pixelIndex * 4 + 3] = 255;
  }

  function getRayCamToPix(i, j) {
    return new Vector(
      (((2 * (i + 0.5)) / WIDTH) - 1) * (WIDTH / HEIGHT),
      (1 - ((2 * (j + 0.5)) / HEIGHT)),
      -3,
    );
  }

  function getPixelColor(normalRayCamToPix, object, objectT, light) {
    const pointHit = normalRayCamToPix.multiply(objectT);
    const n = object.computeNormal(pointHit);
    const lightVector = light.subtract(pointHit).normalize();
    const directLight = Math.max(dotProduct(n, lightVector), 0);
    return new Color(
      Math.floor(object.c.r * directLight),
      Math.floor(object.c.g * directLight),
      Math.floor(object.c.b * directLight),
    );
  }

  function render(scene) {
    const {
      camera, objects, light, ambient,
    } = scene;

    for (let j = 0; j < HEIGHT; j += 1) {
      for (let i = 0; i < WIDTH; i += 1) {
        const pixelIndex = (i + (j * WIDTH));
        const rayCamToPix = getRayCamToPix(i, j);
        const normalRayCamToPix = rayCamToPix.normalize();

        let t = Infinity;
        let objectT = Infinity;

        objects.forEach((object) => {
          objectT = Math.min(
            objectT,
            object.intersect(normalRayCamToPix, camera),
          );
          
          if (objectT < t) {
            const objectColor = getPixelColor(normalRayCamToPix, object, objectT, light);
            colorPixel(pixelIndex, objectColor);
          }
          t = objectT;
        });

        if (objectT === Infinity) {
          colorPixel(pixelIndex, ambient);
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const scene = {
    camera: { coord: new Vector(0, 0, 0) },
    objects: [],
    light: new Vector(0, 4, -9),
    ambient: new Color(35, 15, 25),
  };
  const sphere1 = new Sphere({ x: 2.5, y: 2, z: -9 }, 1, new Color(0, 255, 255));
  const sphere2 = new Sphere({ x: 0, y: -2, z: -20 }, 2, new Color(255, 0, 0));
  const sphere3 = new Sphere({ x: -5, y: 3, z: -17.5 }, 3, new Color(0, 0, 255));
  const sphere4 = new Sphere({ x: 4, y: -2, z: -9 }, 1, new Color(0, 255, 0));
  scene.objects.push(sphere1, sphere2, sphere3, sphere4);

  render(scene);
});
