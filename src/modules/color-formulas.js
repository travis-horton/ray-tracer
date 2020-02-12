import Color from 'rgb-color-class';
import { Vector3d as Vector } from './3d-vectors';
import { Sphere } from './3d-objects';
const { dotProduct } = Vector;

export function colorPixel(pixelIndex, color, imageData) {
  const { data } = imageData
  data[pixelIndex * 4] = color.r;
  data[pixelIndex * 4 + 1] = color.g;
  data[pixelIndex * 4 + 2] = color.b;
  data[pixelIndex * 4 + 3] = 255;
}

export function getPixelColor(normalRayCamToPix, object, objectT, light) {
  const incomingRay = normalRayCamToPix.multiply(objectT);
  const n = object.computeNormal(incomingRay);
  const lightVector = light.subtract(incomingRay).normalize();
  const directLight = Math.max(dotProduct(n, lightVector), 0);
  return new Color(
    Math.floor(object.c.r * directLight),
    Math.floor(object.c.g * directLight),
    Math.floor(object.c.b * directLight),
  );
}

