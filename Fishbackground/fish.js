class Fish extends Body {

    randomMovementAngle = 0.2 * Math.PI * 2;
    randomMovementChance = 0.003;

    constructor(sizeList) {
        super(sizeList);
    }

    minimumSpeed = 0.7;
    speedAfterRandomMovement = 2;  //IDEA FOR LATER: Make this dependent on the turned angle
    speedDecay = 0.005;
    speedDecayCounter = 0;

    turnToPoint(x, y) {
        // Calculate direction vector from fish to click point
        const direction = new Vector(x - this.head.position.x, y - this.head.position.y);
        // turn towards this direction
        this.head.direction.rotateTowards(direction, Math.PI/4);
        // Reset speed for smooth movement
        this.speed = this.speedAfterRandomMovement;
        this.speedDecayCounter = 0;
    }

    moveRandomly(){
        const didTurn = super.moveRandomly();

        // If the fish turned, reset the speed and speed decay counter
        if (didTurn) {
            this.speed = this.speedAfterRandomMovement;
            this.speedDecayCounter = 0;
        }
    }

    checkBounds(){
        const didTurn = super.checkBounds();

        // If the fish turned, reset the speed and speed decay counter
        if (didTurn) {
            this.speed = this.speedAfterRandomMovement;
            this.speedDecayCounter = 0;
        }
    }

    updateSpeed(){
        if (this.speed > this.minimumSpeed){
            this.speed = this.speedAfterRandomMovement*Math.pow(2, -this.speedDecay*this.speedDecayCounter);
            this.speedDecayCounter++;
        }
    }

    move(){
        super.move();
        this.updateSpeed();
    }   
}