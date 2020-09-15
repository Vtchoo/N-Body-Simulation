// Gravitational constant G
const G = 1

// Precision threshold for Barned-Hut algorithm
// This values refers to the ratio s/d where
//      s is the width of the quadtree region and
//      d is the distance between the body and the region's bodies' center of mass
// If s/d > threshold, get subdivisions, else get current region's mass and center of mass
var precisionThreshold = 1

class Body {

    position
    velocity
    acceleration

    mass

    constructor(x = 0, y = 0, z = 0, mass = 1, vx = 0, vy = 0, vz = 0) {
        this.position = new Vector2(x, y)
        this.velocity = new Vector2(vx, vy)
        this.acceleration = new Vector2(0, 0)
        this.mass = mass
    }

    GetGravityFromArray(bodies = []) {
        
        const force = new Vector2(0, 0)
        bodies.forEach(body => {
            if (body != this) {
                const dir = Vector2.Sub(body.position, this.position)
                const dist = dir.Mag()
                dir.Unit()
                //console.log(dir.Mag())
                force.AddV(Vector2.Mult(dir, G * this.mass * body.mass / Math.pow(dist, 2)))
                
            }
        })
        this.acceleration = Vector2.Mult(force, 1 / this.mass)
    }

    GetGravityFromQuadTree(quadtree = new QuadTree(null)) {
        
        const firstBody = bodies[0]
        if (this === firstBody && drawComparisons)
        {
            fill('green')
            circle(firstBody.position.x, firstBody.position.y, 10)
        }

        const force = this.GetForceFromQuadTree(quadtree)
        this.acceleration = Vector2.Mult(force, 1 / this.mass)

    }

    GetForceFromQuadTree(quadtree = new QuadTree(null)) {
        
        const firstBody = bodies[0]
        // fill('green')
        // circle(firstBody.position.x, firstBody.position.y, 10)

        const force = new Vector2(0, 0)

        if (quadtree.mass !== 0) {

            const d2 = Vector2.Sub(quadtree.centerOfMass, this.position).MagSqr()
            const s2 = Math.pow(Math.max(quadtree.boundary.w, quadtree.boundary.h), 2)
            const t2 = Math.pow(precisionThreshold, 2)

            if ((quadtree.CheckBoundary(this.position) || (s2/d2 > t2)) && quadtree.subDivided) {
                force.AddV(this.GetForceFromQuadTree(quadtree.nw))
                force.AddV(this.GetForceFromQuadTree(quadtree.ne))
                force.AddV(this.GetForceFromQuadTree(quadtree.sw))
                force.AddV(this.GetForceFromQuadTree(quadtree.se))
            } else {
                if (quadtree.subDivided) {
                    const dir = Vector2.Sub(quadtree.centerOfMass, this.position)
                    force.AddV(Vector2.Unit(dir).Mult(G * this.mass * quadtree.mass / dir.MagSqr()))
                    if (this === firstBody && drawComparisons) {
                        fill('rgba(255,0,0,.25)')
                        rect(quadtree.boundary.x, quadtree.boundary.y, quadtree.boundary.w, quadtree.boundary.h)
                    }
                } else {
                    for (const body of quadtree.bodies) {
                        if (body != this) {
                            const dir = Vector2.Sub(body.position, this.position)
                            const newForce = Vector2.Unit(dir).Mult(G * this.mass * body.mass / dir.MagSqr())
                            force.AddV(newForce)
                            if(this === firstBody && drawComparisons){
                                fill('rgba(255,0,0,.5)')
                                circle(body.position.x, body.position.y, 10)
                            }
                        }
                    }
                }
            }
        }
        return force
    }



    Update() {
        this.velocity.AddV(this.acceleration)
        this.position.AddV(this.velocity)
    }



    //
    // Drawing functions (uses p5, discard if not using js)
    //
    draw() {
        push()
        translate(this.position.x, this.position.y)
        noStroke()
        fill('white')
        circle(0, 0, this.mass * 5 * 100)
        stroke('red')
        //line(0, 0, this.acceleration.x * 100, this.acceleration.y * 100)
        pop()
    }
}