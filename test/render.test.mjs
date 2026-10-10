import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import Color from '../lib/color.js';
import Sphere from '../lib/sphere.js';
import Vector from '../lib/vector.js';
import defaultScene from '../lib/scene.js';
import render from '../lib/render.js';
import renderRayTracerInElement from '../ray-tracer.js';

// SHA-256 of the 800×600 picture as rendered before the split into modules
// (master fa19a33). Any change to the image changes this.
const PICTURE = '87a0ba8d0b5be5a07692bb38b3b256d7d453d7c626ba9d6bf478580ec7bfc18f';

const sha256 = (data) => createHash('sha256').update(data).digest('hex');

test('renders the same picture as before the split', () => {
  const data = new Uint8ClampedArray(800 * 600 * 4);
  render(defaultScene(), data, 800, 600);
  assert.equal(sha256(data), PICTURE);
});

test('the page entry draws that picture into the named element', () => {
  let drawn;
  let parentId;
  let appended;
  globalThis.document = {
    createElement: () => ({
      getContext: () => ({
        getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
        putImageData: (image) => { drawn = image.data; },
      }),
    }),
    getElementById: (id) => {
      parentId = id;
      return { appendChild: (el) => { appended = el; } };
    },
  };
  try {
    renderRayTracerInElement('box');
  } finally {
    delete globalThis.document;
  }
  assert.equal(parentId, 'box');
  assert.equal(appended.width, 800);
  assert.equal(appended.height, 600);
  assert.equal(sha256(drawn), PICTURE);
});

test('an empty scene is all background', () => {
  const ambient = new Color(1, 2, 3);
  const data = new Uint8ClampedArray(4 * 3 * 4);
  render({
    camera: { p: new Vector(0, 0, 0) }, light: new Vector(0, 0, 0), ambient, objects: [],
  }, data, 4, 3);
  for (let px = 0; px < 12; px += 1) {
    assert.deepEqual([...data.slice(px * 4, px * 4 + 4)], [1, 2, 3, 255]);
  }
});

test('vectors', () => {
  const v = new Vector(3, 4, 12);
  assert.equal(v.length(), 13);
  assert.equal(v.normalize().length(), 1);
  assert.equal(Vector.dot(v, new Vector(1, 1, 1)), 19);
  assert.deepEqual(v.minus(new Vector(1, 1, 1)), new Vector(2, 3, 11));
  assert.deepEqual(v.times(2), new Vector(6, 8, 24));
});

test('a sphere is hit straight ahead and missed off to the side', () => {
  const sphere = new Sphere(new Vector(0, 0, -10), 1, new Color(0, 0, 0));
  const origin = new Vector(0, 0, 0);
  assert.equal(sphere.intersect(new Vector(0, 0, -1), origin), 11);
  assert.equal(sphere.intersect(new Vector(1, 0, 0), origin), Infinity);
  assert.deepEqual(sphere.normalAt(new Vector(0, 0, -11)), new Vector(0, 0, -1));
});
