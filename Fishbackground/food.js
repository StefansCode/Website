class Food{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 10;
        this.radius = 0;
        this.maxRadius = 200;
    }

    draw(ctx){
        ctx.beginPath();

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);

        // Draw the expanding circle
        if (this.radius < this.maxRadius){
            this.radius++;
            // Calculate opacity based on radius (1 at start, 0 at maxRadius)
            const opacity = 1 - (this.radius / this.maxRadius);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.closePath();
    }



}