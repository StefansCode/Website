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
    isChasing = false;

    /**
     * Turns the fish towards a specific point in the canvas.
     * @param {number} x - The x-coordinate of the target point.
     * @param {number} y - The y-coordinate of the target point.
     */
    turnToPoint(x, y) {
        if (this.isHeadAngleExceeded()){
            return;
        }
        if (this.speed > 0.95*this.speedAfterRandomMovement){
            return;
        }

        // Calculate direction vector from fish to click point
        const direction = new Vector(x - this.head.position.x, y - this.head.position.y);
        // Calculate the angle between current direction and target direction
        const angleToTarget = this.head.direction.angleTo(direction);
        // Use the smaller angle between PI/4 and the actual angle
        let turnAngle = Math.min(Math.abs(angleToTarget), Math.PI/4);
        turnAngle = Math.max(turnAngle, Math.PI/8);
        turnAngle *= Math.sign(angleToTarget);
        // Rotate by the calculated angle
        this.head.direction.rotate(turnAngle);
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

    getMouthPosition(){
        var mouthPosition = this.head.position.clone();
        mouthPosition.add(this.head.direction.scaleToLength(this.head.size/2));
        return mouthPosition;
    }
}