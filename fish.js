class fish extends Body {

    random_movement_angle = 0.2 * Math.PI * 2;
    random_movement_chance = 0.002;

    constructor(sizeList) {
        super(sizeList);
    }

    minimum_speed = 0.7;
    speed_after_random_movement = 2;  //IDEA FOR LATER: Make this dependent on the turned angle
    speed_decay = 0.005;
    speed_decay_counter = 0;

    move_randomly(){
        // Check if the head exists
        if (!this.head) return;

        // Rotate the head by random_movement_angle with a chance of random_movement_chance
        if (Math.random() < this.random_movement_chance) {
            const randomAngle = (2*Math.random() - 1) * this.random_movement_angle;
            this.head.direction.rotate(randomAngle);
            // Reset speed decay counter
            this.speed = this.speed_after_random_movement;
            this.speed_decay_counter = 0;
        }
    }

    update_speed(){
        if (this.speed > this.minimum_speed){
            this.speed = this.speed_after_random_movement*Math.pow(2, -this.speed_decay*this.speed_decay_counter);
            this.speed_decay_counter++;
        }
    }

    move(){
        super.move();
        this.update_speed();
    }   
}