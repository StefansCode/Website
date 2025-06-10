/**
 * Contains drawing functions for the fish body
 */

/**
 * Draws the right side of the fish by connecting all right points
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawRightSide(ctx, body) {
    // Start drawing the path
    ctx.beginPath();
    
    // Start with the last point (back of the fish)
    const firstPoint = body.parts[body.parts.length - 1].getRight();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    
    // Draw line to each point from back to front
    for (let i = body.parts.length - 2; i >= 0; i--) {
        const point = body.parts[i].getRight();
        ctx.lineTo(point.x, point.y);
    }
    
    // Style and stroke the path
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Draws the left side of the fish by connecting all left points
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawLeftSide(ctx, body) {
    // Start drawing the path
    ctx.beginPath();
    
    // Start with the last point (back of the fish)
    const firstPoint = body.parts[body.parts.length - 1].getLeft();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    
    // Draw line to each point from back to front
    for (let i = body.parts.length - 2; i >= 0; i--) {
        const point = body.parts[i].getLeft();
        ctx.lineTo(point.x, point.y);
    }
    
    // Style and stroke the path
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Draws the head of the fish
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawHead(ctx, body) {
    const baseAngle = Math.atan2(body.head.direction.y, body.head.direction.x);
    const startAngle = baseAngle - Math.PI/2;
    const endAngle = baseAngle + Math.PI/2;
    
    ctx.beginPath();
    ctx.arc(
        body.head.position.x,
        body.head.position.y,
        body.head.size,
        startAngle,
        endAngle
    );
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Draws the tail of the fish
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawTail(ctx, body) {
    const baseAngle = Math.atan2(body.tail.direction.y, body.tail.direction.x);
    const startAngle = baseAngle + Math.PI/2;
    const endAngle = baseAngle - Math.PI/2;
    
    ctx.beginPath();
    ctx.arc(
        body.tail.position.x,
        body.tail.position.y,
        body.tail.size,
        startAngle,
        endAngle
    );
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Draws a smiley face on the fish's head
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawSmiley(ctx, body) {
    // Calculate eye positions using relative angles
    const eyeOffset = body.head.size * 1;
    const eyeAngle = Math.PI/3; // 60 degrees for eye placement
    
    // Calculate left eye position
    const leftEyeVector = body.head.direction.clone()
        .rotate(eyeAngle)
        .scaleToLength(eyeOffset);
    const leftEye = body.head.position.clone().add(leftEyeVector);
    
    // Calculate right eye position
    const rightEyeVector = body.head.direction.clone()
        .rotate(-eyeAngle)
        .scaleToLength(eyeOffset);
    const rightEye = body.head.position.clone().add(rightEyeVector);

    // Draw eyes
    ctx.beginPath();
    ctx.arc(leftEye.x, leftEye.y, body.head.size * 0.3, 0, Math.PI * 2);
    ctx.arc(rightEye.x, rightEye.y, body.head.size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    /*
    // Draw smile using the same angle logic but with a smaller radius
    const baseAngle = Math.atan2(body.head.direction.y, body.head.direction.x);
    const startAngle = baseAngle + Math.PI/2;
    const endAngle = baseAngle - Math.PI/2;
    
    ctx.beginPath();
    ctx.arc(
        body.head.position.x,
        body.head.position.y,
        body.head.size * 0.4,  // Smaller radius for the mouth
        startAngle,
        endAngle
    );
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    */
}

/**
 * Draws the complete fish by combining all drawing functions
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawBody(ctx, body) {
    drawRightSide(ctx, body);
    drawLeftSide(ctx, body);
    drawHead(ctx, body);
    drawTail(ctx, body);
}

/**
 * Draws the complete fish by combining all drawing functions
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawFish(ctx, body) {
    drawBody(ctx, body);
    drawSmiley(ctx, body);
}

/**
 * Draws the body parts as circles
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawAsCircles(ctx, body) {
    body.parts.forEach(part => part.drawAsCircle(ctx));
}

/**
 * Draws the body parts as vectors
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
 * @param {Body} body - The body to draw
 */
function drawAsVectors(ctx, body) {
    body.parts.forEach(part => part.drawAsVector(ctx));
} 