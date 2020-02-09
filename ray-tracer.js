var body = document.querySelector("body");
var c = document.createElement("canvas");
body.appendChild(c);
c.id = "c"
var c = document.getElementById("c");
var width = 640;
var height = 480;
c.width = width;
c.height = height;
c.style.border = "1px solid black";
var ctx = c.getContext("2d");
var imageData = ctx.getImageData(0, 0, c.width, c.height);
var data = imageData.data;
var c = document.getElementById("c");
var width = 640;
var height = 480;
var ctx = c.getContext('2d');
var imageData = ctx.getImageData(0, 0, width, height);
var data = imageData.data;

var scene = {};

scene.camera = {
  p: {
    x: 0,
    y: 0,
    z: 0
  }
};

scene.objects = [
  {
    type: "sphere",
    p: {
      x: 0,
      y: 0,
      z: -5
    },
    color: {
      r: 155,
      g: 200,
      b: 155,
      a: 255
    },
    radius: 2.2
  },  
];

scene.ambient = { r: 0, g: 0, b: 0, a:255 }

function intersect(ray, object) {
  var cameraToCenter = object.p;
  var dUnNormalized = ray.d;
  var dLength = vLength(dUnNormalized);
  var d = {
    x: dUnNormalized.x/dLength,
    y: dUnNormalized.y/dLength,
    z: dUnNormalized.z/dLength
  };
  var tCenter = dotProduct(cameraToCenter, d);

  if (tCenter < 0) {return false};

  var centerToRay = Math.sqrt(
    (dotProduct(cameraToCenter, cameraToCenter) - tCenter*tCenter)
  );

  if (centerToRay > object.radius) {return false};

  var tHalfInCircle = Math.sqrt(
    dotProduct(cameraToCenter, cameraToCenter) - (centerToRay*centerToRay)
  );

  var t = tCenter - tHalfInCircle;
  return true;
};

function render(scene) {
  var camera = scene.camera,
      objects = scene.objects;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      var px = (width * i + j)
      var p = { 
                x: (2*((j+0.5)/width)-1)*(width/height), 
                y: (1-(2*((i+0.5)/height))), 
                z: -1 
              };

      for (let k = 0; k < objects.length; k++) {
        var ray = {p: camera.p, d: p}

        if (intersect(ray, objects[k])) {
          colorPx(px, objects[k].color)
        } else {
          colorPx(px, scene.ambient)
        };
      };
    };
  };
  ctx.putImageData(imageData,0,0)
};

function colorPx(px, color) {
  data[px*4] = color.r;
  data[px*4+1] = color.g;
  data[px*4+2] = color.b;
  data[px*4+3] = color.a;
};

function dotProduct(v1, v2) {
  return (v1.x*v2.x+v1.y*v2.y+v1.z*v2.z)
};

function vLength(v) {
  return (Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z))
}

render(scene);
