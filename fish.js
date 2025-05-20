class Fish extends Body {

    randomMovementAngle = 0.2 * Math.PI * 2;
    randomMovementChance = 0.005;

    constructor(sizeList) {
        super(sizeList);
    }

    minimumSpeed = 0.7;
    speedAfterRandomMovement = 2;  //IDEA FOR LATER: Make this dependent on the turned angle
    speedDecay = 0.005;
    speedDecayCounter = 0;

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