class QuadTree {

    // Boundary of the branch
    boundary = new Rectangle

    // Max capacity
    capacity = 1
    bodies = []
    
    // Subdivisions
    subDivided = false
    nw
    ne
    sw
    se


    // Specific data for N-Body Simulation
    // Uses Barnes-Hut algorithm
    // (discard if using generic QuadTree algorithm)
    centerOfMass = new Vector2(0, 0)
    mass = 0


    constructor(boundary, n = 1) {
        this.boundary = boundary
        this.capacity = n
    }

    // Subduvides the quadtree in 4 quadtrees
    SubDivide() {
        const x = this.boundary.x
        const y = this.boundary.y
        const w = this.boundary.w
        const h = this.boundary.h

        const nwRect = new Rectangle(x, y, w / 2, h / 2)
        this.nw = new QuadTree(nwRect, this.capacity)
        const neRect = new Rectangle(x + w / 2, y, w / 2, h / 2)
        this.ne = new QuadTree(neRect, this.capacity)
        const swRect = new Rectangle(x, y + h / 2, w / 2, h / 2)
        this.sw = new QuadTree(swRect, this.capacity)
        const seRect = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2)
        this.se = new QuadTree(seRect, this.capacity)

        this.subDivided = true
    }

    // Inserts an array of bodies
    Insert(bodies = []) {
        
        // Filters only bodies inside boundaries
        const bodiesInsideBoundary = bodies.filter(body => this.CheckBoundary(body.position))

        // Adds N-Body specific data into the QuadTree
        // this.mass = bodiesInsideBoundary.reduce((prev, body) => prev + body.mass, 0)
        // this.centerOfMass = bodiesInsideBoundary.reduce((prev, body) => prev.AddV(Vector2.Mult(body.position, body.mass / this.mass)), new Vector2(0, 0))
        bodiesInsideBoundary.forEach(body => {
            this.mass += body.mass
            this.centerOfMass.AddV(Vector2.Mult(body.position, body.mass))
        })
        this.centerOfMass.Div(this.mass)

        // 
        
        if (bodiesInsideBoundary.length > this.capacity) {
            this.SubDivide()
            this.nw.Insert(bodiesInsideBoundary)
            this.ne.Insert(bodiesInsideBoundary)
            this.sw.Insert(bodiesInsideBoundary)
            this.se.Insert(bodiesInsideBoundary)
        } else {
            this.bodies.push(...bodiesInsideBoundary)
        }




    }


    // 
    CheckBoundary(point) {
        return(
            point.x >= this.boundary.x &&
            point.x <= this.boundary.x + this.boundary.w &&
            point.y > this.boundary.y &&
            point.y < this.boundary.y + this.boundary.h
        )
    }



    //
    // Drawing functions (uses p5, discard if not using js)
    //

    draw() {
        push()
        // if(!this.subDivided){
        //     fill('red')
        //     circle(this.centerOfMass.x, this.centerOfMass.y, 10)
        // }
        noFill()
        stroke('white')
        rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h)
        if (this.subDivided)
        {
            this.nw.draw()
            this.ne.draw()
            this.sw.draw()
            this.se.draw()
        }
        pop()
    }

}


class Rectangle {

    x = 0
    y = 0
    w = 0
    h = 0

    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}