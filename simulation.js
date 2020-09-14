// Constants
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

const N = 200
const bodies = []

var tree

// Simulation setup
function setup(){

    // Create array of bodies
    for (let i = 0; i < N; i++)
        bodies.push(new Body(Math.random() * canvasWidth, Math.random() * canvasHeight))
    
    const boundary = new Rectangle(0, 0, canvasWidth, canvasHeight)
    tree = new QuadTree(boundary, 2)

    tree.Insert(bodies)

    createCanvas(canvasWidth, canvasHeight)

    
    console.log(bodies)
}

// Update function
function draw() {

    // Space background
    background(0)

    bodies.forEach(body => body.draw())

    tree.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}