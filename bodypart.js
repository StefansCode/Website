class Bodypart {
    constructor(position, direction, size) {
        this.position = position;
        this.direction = direction;
        this.size = size;
    }

    getLeft() {
        const rightVector = this.direction.clone()
                                                .rotate(Math.PI / 2)
                                                .scale(this.size);
        return this.position.clone().add(rightVector);
    }

    getRight() {
        const rightVector = this.direction.clone()
                                            .rotate(-Math.PI / 2)
                                            .scale(this.size);
        return this.position.clone().add(rightVector);
    }

    toString() {
        return `Bodypart(Position: ${this.position.toString()}, Direction: ${this.direction.toString()}, Size: ${this.size})`;
    }
}