// Constants
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

// Simulation settings
const N = 1000
const bodies = []
var useNaiveAlgorithm = true

// The quadtree
var tree

// Display settings
var drawTree = false

// Radial spawn
radialSpawn = true

// Simulation setup
function setup(){

    // Create array of bodies
    for (let i = 0; i < N; i++)
        if (radialSpawn) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * Math.min(canvasWidth, canvasHeight) / 2
            bodies.push(new Body( canvasWidth / 2 + radius * Math.cos(angle), canvasHeight / 2 + radius * Math.sin(angle), 0, Math.random()))
        } else {
            bodies.push(new Body(Math.random() * canvasWidth, Math.random() * canvasHeight, 0, Math.random()))
        }
       
    
    const boundary = new Rectangle(0, 0, canvasWidth, canvasHeight)
    tree = new QuadTree(boundary, 2)

    tree.Insert(bodies)

    createCanvas(canvasWidth, canvasHeight)

    
    console.log(tree)
}

// Update function
function draw() {

    // Space background
    background(0)

    const boundary = new Rectangle(0, 0, canvasWidth, canvasHeight)
    tree = new QuadTree(boundary, 2)
    tree.Insert(bodies)

    bodies.forEach(body => {
        body.draw()
    })

    bodies.forEach(body => {
        if (useNaiveAlgorithm)
            body.GetGravity(bodies)
    })

    bodies.forEach(body => {
        body.Update()
    })


    if (drawTree)
        tree.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}