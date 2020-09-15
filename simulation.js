// Constants
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

// Simulation settings
var N = 1000
var bodies = []
var useNaiveAlgorithm = false

// The quadtree
var tree

// Display settings
var drawTree = false
var drawComparisons = false

// Spawn mode: 'RADIAL' | 'RECTANGULAR' | 'CLUSTER'
var spawnMode = 'RADIAL'
var clusters = []
var clusterRadius = 100

// Commands and UI
var reset = false


// Simulation setup
function setup(){

    SpawnBodies()    

    // const boundary = new Rectangle(0, 0, canvasWidth, canvasHeight)
    // tree = new QuadTree(boundary, 2)

    // tree.Insert(bodies)

    createCanvas(canvasWidth, canvasHeight)

    
    console.log(tree)
}

function SpawnBodies() {
    // Clear array of bodies
    bodies = []

    // Create array of bodies
    switch (spawnMode) {
        case 'RADIAL':
            for (let i = 0; i < N; i++) {
                const angle = Math.random() * Math.PI * 2
                const radius = Math.sqrt(Math.random()) * Math.min(canvasWidth, canvasHeight) / 2
                bodies.push(new Body(
                    canvasWidth / 2 + radius * Math.cos(angle),
                    canvasHeight / 2 + radius * Math.sin(angle),
                    0,
                    Math.random() * .01,
                    (Math.random() - .5) * .1,
                    (Math.random() - .5) * .1
                ))
            }
            break;
        case 'RECTANGULAR':
            for (let i = 0; i < N; i++)
                bodies.push(new Body(Math.random() * canvasWidth, Math.random() * canvasHeight, 0, Math.random()))
            break;
    }  

}

// Update function
function draw() {

    // Space background
    background(0)

    if (reset) {
        SpawnBodies()
        reset = false
    }

    const boundary = new Rectangle(0, 0, canvasWidth, canvasHeight)
    tree = new QuadTree(boundary, 2)
    tree.Insert(bodies)

    bodies.forEach(body => {
        if (useNaiveAlgorithm)
            body.GetGravityFromArray(bodies)
        else
            body.GetGravityFromQuadTree(tree)
    })

    bodies.forEach(body => {
        body.Update()
    })

    bodies.forEach(body => {
        body.draw()
    })

    if (drawTree)
        tree.draw()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}



// Commands
function Reset() {
    reset = true
}