const SPACE = 30

const productScalarForVector = (scalar, vector) => ({
  x: vector.x * scalar,
  y: vector.y * scalar
})
const addVectors = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y
})
const linearCombination = base => coords => addVectors(productScalarForVector(coords[0], base[0]), productScalarForVector(coords[1], base[1]))

const canonicalBase = [{
  x: 1,
  y: 0
}, {
  x: 0,
  y: 1
}]

let sliderV1X
let sliderV1Y
let viewV1
let sliderV2X
let sliderV2Y
let viewV2


let sliderVX
let sliderVY

function setup() {
  createCanvas(400, 400);
  sliderV1X = createSlider(-10, 10, 1, .1)
  sliderV1Y = createSlider(-10, 10, 0, .1)
  viewV1 = createInput(`[${sliderV1X.value()}, ${sliderV1Y.value()}]`)
  sliderV2X = createSlider(-10, 10, 0, .1)
  sliderV2Y = createSlider(-10, 10, 1, .1)
  viewV2 = createInput(`[${sliderV2X.value()}, ${sliderV2Y.value()}]`)

  sliderVX = createSlider(-10, 10, 1, .1)
  sliderVY = createSlider(-10, 10, 1, .1)
}

let n = 0
let z = .5
let v = 1
let x = 1.5
let points = []
function draw() {
  background(220);
  translate(height / 2, width / 2)

  const generator = [
    {
      x: sliderV1X.value(),
      y: sliderV1Y.value()
    },
    {
      x: sliderV2X.value(),
      y: sliderV2Y.value()
    }
  ]

  viewV1.value(`[${sliderV1X.value()}, ${sliderV1Y.value()}]`)
  viewV2.value(`[${sliderV2X.value()}, ${sliderV2Y.value()}]`)

  renderGrid(generator, '#78909c')
  renderBase(generator, '#F44336')
  
  points.forEach(p => {
    const vector = linearCombination(generator)(p)
      point(vector.x * SPACE, -vector.y * SPACE)
  })

  const r = map(noise(z), 0, 1, 0, 4)
  drawCoords(generator, [Math.sin(n) * r, Math.cos(n) * r])
  //drawCoords(generator, [map(noise(v), 0, 1, -2, 2) + Math.sin(n) * 3, map(noise(z), 0, 1, -2, 2) + Math.cos(n) * 3])
  
  points.push([Math.sin(n) * r, Math.cos(n) * r])
  if (points.length > 200) {
    points.shift()
  }


  n+=.06
  z+=.02

  /*
   renderGrid(canonicalBase, '#b0bec5')
  renderBase(canonicalBase, '#F88279')
  
  drawCoords(canonicalBase, [-1, 1])
  drawCoords(canonicalBase, [sliderVX.value(), sliderVY.value()])
    drawVector(canonicalBase, [-1, 1])
  */
}

function renderBase(base, color = 'red') {
  stroke(color)
  strokeWeight(2)
  drawVectors(productScalarForVector(-100, base[0]), productScalarForVector(100, base[0]))
  drawVectors(productScalarForVector(-100, base[1]), productScalarForVector(100, base[1]))
}

function drawVectors(a, b) {
  line(-a.x * SPACE, a.y * SPACE, -b.x * SPACE, b.y * SPACE)
}



function renderGrid(base, color) {
  stroke(color)
  strokeWeight(1)
  for (let p = -200; p <= 200; p++) {
    drawVectors(
      addVectors(productScalarForVector(-100, base[0]), productScalarForVector(p, base[1])),
      addVectors(productScalarForVector(100, base[0]), productScalarForVector(p, base[1]))
    )

    drawVectors(
      addVectors(productScalarForVector(-100, base[1]), productScalarForVector(p, base[0])),
      addVectors(productScalarForVector(100, base[1]), productScalarForVector(p, base[0]))
    )
  }
}

function drawCoords(base, coords) {
  const lc = linearCombination(base)

  stroke('green')
  strokeWeight(2)
  line(0, 0, coords[0] * base[0].x * SPACE, coords[0] * -base[0].y * SPACE)

  line(0, 0, coords[1] * base[1].x * SPACE, coords[1] * -base[1].y * SPACE)
  line(0, 0, coords[1] * base[1].x * SPACE, coords[1] * -base[1].y * SPACE)

  const vector = lc(coords)
  stroke('gray')

  line(0, 0, vector.x * SPACE, -vector.y * SPACE)
  stroke('red')

  strokeWeight(5)


  point(vector.x * SPACE, -vector.y * SPACE)
}

function drawVector(base, vector) {

  }
