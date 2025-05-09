class Body {
    offset = 10;
    speed = 2;
    head = null;
    tail = null;

    constructor(sizeList) {
        this.parts = sizeList.map((size, i) =>
            new Bodypart(
                new Vector(-this.offset * i, 0),
                new Vector(0, this.offset),
                size
            )
        );
        this.head = this.parts[0] || null;
    
        if(this.head != null){
            this.head.direction = new Vector(1,1);
        }
        
        this.tail = this.parts[this.parts.length - 1] || null;
        
    }
    
    update(){
            this.checkBounds();
            this.update_direction();
            this.move();
    }

    move() {
        if (!this.head) return;

        const moveVector = this.head.direction.clone()
            .scaleToLength(this.speed);

        this.head.position.add(moveVector);

        for (let i = 1; i < this.parts.length; i++) {
            const prev = this.parts[i - 1];
            const curr = this.parts[i];
            const toPrev = prev.position.clone().subtract(curr.position);
            const dist = toPrev.length();
            if (dist !== this.offset) {
                toPrev.scaleToLength(dist - this.offset);
                curr.position.add(toPrev);
            }
        }
    }

    random_movement_angle = 0.1 * Math.PI * 2;
    random_movement_chance = 0.1;
    update_direction(){
        if (Math.random() < this.random_movement_chance) {
            const randomAngle = (2*Math.random() - 1) * this.random_movement_angle;
            this.head.direction.rotate(randomAngle);
        }
    }

    checkBounds(margin = 0) {
        if (!this.head) return;

        const minX = 0;
        const maxX = window.innerWidth;
        const minY = 0;
        const maxY = window.innerHeight;

        // Prüfe X
        if (this.head.position.x < minX + margin) {
            this.head.direction.invertX();
        } else if (this.head.position.x > maxX - margin) {
            this.head.direction.invertX();
        }

        // Prüfe Y
        if (this.head.position.y < minY + margin) {
            this.head.direction.invertY();
        } else if (this.head.position.y > maxY - margin) {
            this.head.direction.invertY();
        }
    }
}

