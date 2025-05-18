class Fish extends Body {

    randomMovementAngle = 0.2 * Math.PI * 2;
    randomMovementChance = 0.002;

    constructor(sizeList) {
        super(sizeList);
    }

    minimumSpeed = 0.7;
    speedAfterRandomMovement = 2;  //IDEA FOR LATER: Make this dependent on the turned angle
    speedDecay = 0.005;
    speedDecayCounter = 0;

    moveRandomly(){
        // Check if the head exists
        if (!this.head) return;

        // Rotate the head by random_movement_angle with a chance of random_movement_chance
        if (Math.random() < this.randomMovementChance) {
            const randomAngle = (2*Math.random() - 1) * this.randomMovementAngle;
            this.head.direction.rotate(randomAngle);
            // Reset speed decay counter
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