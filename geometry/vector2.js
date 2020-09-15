class Vector2 {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    Set(x, y) {
        this.x = x
        this.y = y
        return this
    }

    SetV(vector2) {
        this.x = vector2.x
        this.y = vector2.y
        return this
    }

    Add(x, y) {
        this.x += x
        this.y += y
        return this
    }

    Sub(x, y) {
        this.Add(-x, -y)
        return this
    }

    AddV(vector2) {
        this.Add(vector2.x, vector2.y)
        return this
    }

    SubV(vector2) {
        this.Sub(vector2.x, vector2.y)
        return this
    }
    
    Mult(n) {
        this.x *= n
        this.y *= n
        return this
    }

    Div(n) {
        this.Mult(1 / n)
        return this
    }

    MagSqr() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }

    Mag() {
        return Math.sqrt(this.MagSqr())
    }

    Unit() {
        this.Div(this.Mag())
        return this
    }

    static Add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y)
    }

    static Sub(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y)
    }

    static Mult(v, n) {
        const vector = new Vector2(v.x, v.y)
        vector.Mult(n)
        return vector
    }

    static Unit(v = new Vector2) {
        const vector = new Vector2(v.x / v.Mag(), v.y / v.Mag())
        return vector
    }
}