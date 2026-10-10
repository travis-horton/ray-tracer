import Vector from './vector.js';

export default class Sphere {
  constructor(center, radius, color) {
    this.p = center;
    this.r = radius;
    this.c = color;
  }

  // How far along `ray` (a unit vector from `origin`) the ray meets this
  // sphere, or Infinity if it misses. Takes the farther of the two hits.
  intersect(ray, origin) {
    const oMinusP = origin.minus(this.p);
    const a1 = Vector.dot(ray, ray);
    const b1 = 2 * (Vector.dot(ray, oMinusP));
    const c1 = Vector.dot(oMinusP, oMinusP) - (this.r * this.r);
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

  normalAt(point) {
    return point.minus(this.p).normalize();
  }
}
