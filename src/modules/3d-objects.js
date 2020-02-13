import Vector from './3d-vectors';

const { dotProduct } = Vector;

export default class Sphere {
  constructor(center, radius, color) {
    this.p = center;
    this.r = radius;
    this.c = color;
  }

  computeRayIntersect(ray, camera) {
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

  computeNormal(incomingRay) {
    const normal = incomingRay.subtract(this.p).normalize();
    normal.z = -normal.z;
    return normal;
  }
}
