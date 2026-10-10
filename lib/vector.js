// A point or a direction in 3D space.
export default class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static dot(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
  }

  minus(v) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  times(factor) {
    return new Vector(this.x * factor, this.y * factor, this.z * factor);
  }

  length() {
    const { x, y, z } = this;
    return Math.sqrt(x * x + y * y + z * z);
  }

  normalize() {
    const length = this.length();
    return new Vector(this.x / length, this.y / length, this.z / length);
  }
}
