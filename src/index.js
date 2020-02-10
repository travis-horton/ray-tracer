import Color from 'rgb-color-class';
import Vector3d from './modules/3d-vectors';

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
  const { dotProduct } = Vector3d;

  function vMinus(v1, v2) {
    const newVector = {};
    newVector.x = (v1.x - v2.x);
    newVector.y = (v1.y - v2.y);
    newVector.z = (v1.z - v2.z);
    return newVector;
  }

  function vMultiply(v1, factor) {
    const newVector = {};
    newVector.x = (v1.x * factor);
    newVector.y = (v1.y * factor);
    newVector.z = (v1.z * factor);
    return newVector;
  }

  function vLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  function normalize(v) {
    const normalV = {};
    normalV.x = v.x / (vLength(v));
    normalV.y = v.y / (vLength(v));
    normalV.z = v.z / (vLength(v));
    return normalV;
  }

  class Sphere {
    constructor(center, radius, color) {
      this.p = center;
      this.r = radius;
      this.c = color;
    }

    intersect(ray, camera) {
      const oMinusP = vMinus(camera.p, this.p);
      const a1 = dotProduct(ray, ray);
      const b1 = 2 * (dotProduct(ray, oMinusP));
      const c1 = dotProduct(oMinusP, oMinusP) - (this.r * this.r);
      const d1 = b1 * b1 - 4 * a1 * c1;
      let solution = Infinity;
      if (d1 > 0) {
        solution = Math.max(
          (-b1 + Math.sqrt(d1)) / (2 * a1),
          (-b1 - Math.sqrt(d1)) / (2 * a1),
        );
      }

      return solution;
    }

    computeNormal(pointHit) {
      const n = normalize(vMinus(pointHit, this.p));
      return n;
    }
  }

  function colorPixel(pixelIndex, color) {
    data[pixelIndex * 4] = color.r;
    data[pixelIndex * 4 + 1] = color.g;
    data[pixelIndex * 4 + 2] = color.b;
    data[pixelIndex * 4 + 3] = 255;
  }

  function lightVector(light, pointHit) {
    return normalize(vMinus(light, pointHit));
  }

  const scene = {
    camera: { p: { x: 0, y: 0, z: 0 } },
    objects: [],
    light: { x: -10, y: 20, z: -40 },
    ambient: new Color(35, 15, 25),
  };

  function render() {
    const { camera, objects, light, ambient } = scene;

    for (let j = 0; j < HEIGHT; j += 1) {
      for (let i = 0; i < WIDTH; i += 1) {
        const pixelIndex = (i + (j * WIDTH));
        const normalizedRayFromCameraToThisPixel = normalize({
          x: (((2 * (i + 0.5)) / WIDTH) - 1) * (WIDTH / HEIGHT),
          y: (1 - ((2 * (j + 0.5)) / HEIGHT)),
          z: -3,
        });

        let t = Infinity;
        let objectT = Infinity;

        for (let k = 0; k < objects.length; k += 1) {
          objectT = Math.min(objects[k].intersect(normalizedRayFromCameraToThisPixel, camera), objectT);
          if (objectT < t) {
            const n = objects[k].computeNormal(vMultiply(normalizedRayFromCameraToThisPixel, objectT));
            const l = lightVector(light, vMultiply(normalizedRayFromCameraToThisPixel, objectT));
            const directLight = Math.max(dotProduct(n, l), 0);
            const objectColor = {
              r: objects[k].c.r * directLight,
              g: objects[k].c.g * directLight,
              b: objects[k].c.b * directLight,
            };
            colorPixel(pixelIndex, objectColor);
          }
          t = objectT;
        }
        if (objectT === Infinity) {
          colorPixel(pixelIndex, ambient);
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const sphere1 = new Sphere({ x: 2.5, y: 2, z: -9 }, 1, new Color(0, 255, 255));
  const sphere2 = new Sphere({ x: 0, y: -2, z: -13 }, 2, new Color(255, 0, 0));
  const sphere3 = new Sphere({ x: -5, y: 3, z: -17.5 }, 3, new Color(0, 0, 255));
  const sphere4 = new Sphere({ x: 4, y: -2, z: -9 }, 1, new Color(0, 255, 0));
  scene.objects.push(sphere1, sphere2, sphere3, sphere4);

  render(scene);
});
