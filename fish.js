class Fish {
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(2 + Math.random() * 2, 0);
        this.radius = 15;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#4a90e2';
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.position = this.position.add(this.velocity);
        
        if (this.position.x > window.innerWidth + this.radius) {
            this.position.x = -this.radius;
            this.position.y = Math.random() * (window.innerHeight - 100) + 50;
        }
    }
}