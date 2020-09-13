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


    //
    // Drawing functions (uses p5, discard if not using js)
    //
    draw() {
        push()
        translate(this.position.x, this.position.y)
        noStroke()
        fill('white')
        circle(0, 0, this.mass + 5)
        pop()
    }
}