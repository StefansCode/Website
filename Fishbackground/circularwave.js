class CircularWave {
    constructor(x, y){
        // Initialize wave properties
        this.wavePosition = new Vector(x, y);
        this.radius = 0;
        this.maxRadius = 200;
    }

    draw(ctx) {
        if (this.radius < this.maxRadius) {
            this.radius++;
            const opacity = 1 - (this.radius / this.maxRadius);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(this.wavePosition.x, this.wavePosition.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    }

    isMax(){
        if (this.radius < this.maxRadius){
            return false;
        }
        else{
            return true;
        }
    }
}