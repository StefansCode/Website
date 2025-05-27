class Food{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 10, 10);
    }
    
}