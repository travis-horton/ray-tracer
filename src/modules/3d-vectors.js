export default class Vector3d {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static dotProduct(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
  }

  magnitude() {
    const { x, y, z } = this;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  normalize() {
    const { x, y, z } = this;
    return new Vector3d(
      x / this.magnitude(x),
      y / this.magnitude(y),
      z / this.magnitude(z),
    );
  }

  subtract(v) {
    const { x, y, z } = this;
    return new Vector3d(
      x - v.x,
      y - v.y,
      z - v.z,
    );
  }

  multiply(factor) {
    const { x, y, z } = this;
    return new Vector3d(
      x * factor,
      y * factor,
      z * factor,
    );
  }
}
