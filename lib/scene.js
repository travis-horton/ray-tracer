import Color from './color.js';
import Sphere from './sphere.js';
import Vector from './vector.js';

// The picture on travish.com: four spheres lit from the upper left.
const defaultScene = () => ({
  camera: { p: new Vector(0, 0, 0) },
  light: new Vector(-10, 20, -40),
  ambient: new Color(35, 15, 25),
  objects: [
    new Sphere(new Vector(2.5, 2, -9), 1, new Color(0, 255, 255)),
    new Sphere(new Vector(0, -2, -13), 2, new Color(255, 0, 0)),
    new Sphere(new Vector(-5, 3, -17.5), 3, new Color(0, 0, 255)),
    new Sphere(new Vector(4, -2, -9), 1, new Color(0, 255, 0)),
  ],
});

export default defaultScene;
