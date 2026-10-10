# rayTracer
my first crack at a rayTracer

Plain JavaScript modules: no build step, nothing to install to run it.

## Run it
Browsers only load modules over http, so serve the folder and open the page:

    python3 -m http.server 8000
    # then open http://localhost:8000

## The pieces
- `ray-tracer.js` — the entry: `renderRayTracerInElement(id)` draws the picture into the element with that id (this is what travish.com calls)
- `lib/render.js` — traces one ray per pixel into an RGBA array; needs no browser
- `lib/scene.js` — the camera, light, background and the four spheres
- `lib/sphere.js`, `lib/vector.js`, `lib/color.js` — the shapes and the math

## Test
    npm test

Includes a fingerprint of the whole 800×600 picture, so any change to the image fails the test.
