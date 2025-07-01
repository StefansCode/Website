    /**
     * Draws the body part on the canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     * @param {Bodypart} bodypart - The body part to draw
     */
    function drawBodypartAsCircle(ctx, bodypart) {
        if (!ctx) {
            console.error('No canvas context provided to draw method');
            return;
        }

        ctx.beginPath();
        
        ctx.arc(
            bodypart.position.x,
            bodypart.position.y,
            bodypart.size,
            0,
            Math.PI * 2
        );
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Draws a semicircle in the specified direction
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     * @param {Bodypart} bodypart - The body part to draw
     * @param {number} relativeStartAngle - The relative start angle of the semicircle in relation to the bodypart direction
     * @param {number} relativeEndAngle - The relative end angle of the semicircle in relation to the bodypart direction
     */
    function drawBodypartAsSemicircle(ctx, bodypart, relativeStartAngle, relativeEndAngle) {
        if (!ctx) {
            console.error('No canvas context provided to draw method');
            return;
        }

        const baseAngle = bodypart.direction.clone().angleTo();
        const startAngle = baseAngle + relativeStartAngle;
        const endAngle = baseAngle + relativeEndAngle;

        ctx.beginPath();
        ctx.arc(
            bodypart.position.x,
            bodypart.position.y,
            bodypart.size,
            startAngle,
            endAngle
        );
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    /**
     * Draws the direction vector from the position
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     * @param {Bodypart} bodypart - The body part to draw
     */
    function drawBodypartAsVector(ctx, bodypart) {
        bodypart.direction.draw(ctx, bodypart.position);
    }