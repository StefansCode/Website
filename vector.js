class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    rotate(rad) {
        // Rotationsmatrix anwenden
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        );
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}