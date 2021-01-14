const SPACE = 40;
const DISTANCE = 10;
const cannonicalBase = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const center = [0, 0, 0];

const productScalarVector = (scalar, vector) => vector.map((x) => x * scalar);
const addVectors = (...vectors) =>
  vectors.reduce((a, b) => a.map((x, i) => x + b[i]));
const linearCombination = (base, coords) =>
  addVectors(...coords.map((coord, i) => productScalarVector(coord, base[i])));

let v1X;
let v1Y;
let v1Z;
let v2X;
let v2Y;
let v2Z;
let v3X;
let v3Y;
let v3Z;

function setup() {
  createCanvas(400, 400, WEBGL);
  v1X = createSlider(-1, 1, 1, 0.1);
  v1Y = createSlider(-1, 1, 0, 0.1);
  v1Z = createSlider(-1, 1, 0, 0.1);
  v2X = createSlider(-1, 1, 0, 0.1);
  v2Y = createSlider(-1, 1, 1, 0.1);
  v2Z = createSlider(-1, 1, 0, 0.1);
  v3X = createSlider(-1, 1, 0, 0.1);
  v3Y = createSlider(-1, 1, 0, 0.1);
  v3Z = createSlider(-1, 1, 1, 0.1);
}

let x = 0;
let y = 0.5;
let z = 0.75;
function draw() {
  orbitControl();
  background(220);
  const customBase = [
    [v1X.value(), v1Y.value(), v1Z.value()],
    [v2X.value(), v2Y.value(), v2Z.value()],
    [v3X.value(), v3Y.value(), v3Z.value()],
  ];
  point(0, 0, 0);

  renderGrid(customBase);
  renderBase(customBase);
  map(noise(x), 0, 1, -DISTANCE, DISTANCE);
  //drawCoords(cannonicalBase, [map(noise(x), 0, 1, -DISTANCE, DISTANCE), map(noise(y), 0, 1, -DISTANCE, DISTANCE), map(noise(z), 0, 1, -DISTANCE, DISTANCE)])
  drawCoords(customBase, [Math.cos(x), 0, 0]);

  x += 0.03;
  y += 0.02;
  z += 0.04;
}

function renderLine(v1, v2) {
  line(
    v1[0] * SPACE,
    v1[1] * SPACE,
    v1[2] * SPACE,
    v2[0] * SPACE,
    v2[1] * SPACE,
    v2[2] * SPACE
  );
}

function renderPoint(v) {
  point(v[0] * SPACE, v[1] * SPACE, v[2] * SPACE);
}

function renderBase(base) {
  stroke("red");
  strokeWeight(5);
  base.forEach((vector) => {
    renderLine(
      productScalarVector(-DISTANCE, vector),
      productScalarVector(DISTANCE, vector)
    );
  });
}

function renderGrid(base) {
  stroke("rgba(120, 144, 156, 0.4)");
  strokeWeight(0.5);

  for (let p = -DISTANCE; p <= DISTANCE; p++) {
    for (let n = -DISTANCE; n <= DISTANCE; n++) {
      renderLine(
        addVectors(
          productScalarVector(-DISTANCE, base[0]),
          productScalarVector(p, base[1]),
          productScalarVector(n, base[2])
        ),
        addVectors(
          productScalarVector(DISTANCE, base[0]),
          productScalarVector(p, base[1]),
          productScalarVector(n, base[2])
        )
      );

      renderLine(
        addVectors(
          productScalarVector(p, base[0]),
          productScalarVector(-DISTANCE, base[1]),
          productScalarVector(n, base[2])
        ),
        addVectors(
          productScalarVector(p, base[0]),
          productScalarVector(DISTANCE, base[1]),
          productScalarVector(n, base[2])
        )
      );
      renderLine(
        addVectors(
          productScalarVector(p, base[0]),
          productScalarVector(n, base[1]),
          productScalarVector(-DISTANCE, base[2])
        ),
        addVectors(
          productScalarVector(p, base[0]),
          productScalarVector(n, base[1]),
          productScalarVector(DISTANCE, base[2])
        )
      );
    }
  }
}

function drawCoords(base, coords) {
  const vector = linearCombination(base, coords);

  stroke("#78909c");
  strokeWeight(3);
  renderLine(center, vector);

  stroke("red");
  strokeWeight(5);

  renderPoint(vector);
}
