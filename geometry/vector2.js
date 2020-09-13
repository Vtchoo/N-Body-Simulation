class Vector2 {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    Set(x, y) {
        this.x = x
        this.y = y
    }

    SetV(vector2) {
        this.x = vector2.x
        this.y = vector2.y
    }

    Add(x, y) {
        this.x += x
        this.y += y
    }

    Sub(x, y) {
        this.Add(-x, -y)
    }

    AddV(vector2) {
        this.Add(vector2.x, vector2.y)
    }

    SubV(vector2) {
        this.Sub(vector2.x, vector2.y)
    }
    
    Mult(n) {
        this.x *= n
        this.y *= n
    }

    Div(n) {
        this.Mult(1/n)
    }

    MagSqr() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }

    Mag() {
        return Math.sqrt(this.MagSqr())
    }

    static Add(v1, v2) {
        return new vector2(v1.x + v2.x, v1.y + v2.y)
    }

    static Sub(v1, v2) {
        return new vector2(v1.x - v2.x, v1.y - v2.y)
    }

    static Mult(v, n) {
        const vector = new Vector2(v.x, v.y)
        vector.Mult(n)
        return vector
    }
}