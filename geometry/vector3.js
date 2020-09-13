class Vector3 {

    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    Set(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    SetV(vector3) {
        this.x = vector3.x
        this.y = vector3.y
        this.z = vector3.z
    }

    Add(x, y, z) {
        this.x += x
        this.y += y
        this.z += z
    }

    Sub(x, y, z) {
        this.Add(-x, -y, -z)
    }

    AddV(vector3) {
        this.Add(vector3.x, vector3.y, vector3.z)
    }

    SubV(vector3) {
        this.Sub(vector3.x, vector3.y, vector3.z)
    }
    
    Mult(n) {
        this.x *= n
        this.y *= n
        this.z *= n
    }

    Div(n) {
        this.Mult(1/n)
    }

    MagSqr() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    }

    Mag() {
        return Math.sqrt(this.MagSqr())
    }

    static Add(v1, v2) {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
    }

    static Sub(v1, v2) {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
    }
}