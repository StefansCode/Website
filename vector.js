class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Addiert einen anderen Vektor (mutiert this)
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    // Subtrahiert einen anderen Vektor (mutiert this)
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    // Skaliert den Vektor mit einem Faktor (mutiert this)
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    // Skaliert den Vektor auf eine bestimmte Länge (mutiert this)
    scaleToLength(length) {
        const currentLength = this.length();
        if (currentLength === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            const factor = length / currentLength;
            this.scale(factor);
        }
        return this;
    }
    
    invertX() {
        this.x = -this.x;
        return this;
    }

    invertY() {
        this.y = -this.y;
        return this;
    }

    // Rotiert den Vektor um einen Winkel (in Radiant, mutiert this)
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
        return this;
    }

    // Gibt eine Kopie des Vektors zurück
    clone() {
        return new Vector(this.x, this.y);
    }

    // Länge des Vektors
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Für eine schönere Ausgabe
    toString() {
        return `Vector(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}