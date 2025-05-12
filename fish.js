class fish extends Body {
    constructor(sizeList) {
        super(sizeList);
    }

    // Draws the right side of the fish by connecting all right points
    draw_right_side(ctx) {
        // Start drawing the path
        ctx.beginPath();
        
        // Start with the last point (back of the fish)
        const firstPoint = this.parts[this.parts.length - 1].getRight();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        
        // Draw line to each point from back to front
        for (let i = this.parts.length - 2; i >= 0; i--) {
            const point = this.parts[i].getRight();
            ctx.lineTo(point.x, point.y);
        }
        
        // Style and stroke the path
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the left side of the fish by connecting all left points
    draw_left_side(ctx) {
        // Start drawing the path
        ctx.beginPath();
        
        // Start with the last point (back of the fish)
        const firstPoint = this.parts[this.parts.length - 1].getLeft();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        
        // Draw line to each point from back to front
        for (let i = this.parts.length - 2; i >= 0; i--) {
            const point = this.parts[i].getLeft();
            ctx.lineTo(point.x, point.y);
        }
        
        // Style and stroke the path
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the head of the fish
    draw_head(ctx) {
        // Draw a semicircle at the head position
        ctx.beginPath();
        const leftPoint = this.head.getLeft();
        const rightPoint = this.head.getRight();
        ctx.arc(this.head.position.x, this.head.position.y, this.head.size, 
            Math.atan2(rightPoint.y - this.head.position.y, rightPoint.x - this.head.position.x),
            Math.atan2(leftPoint.y - this.head.position.y, leftPoint.x - this.head.position.x));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the tail of the fish
    draw_tail(ctx) {
        // Draw a semicircle at the tail position
        ctx.beginPath();
        const leftPoint = this.tail.getLeft();
        const rightPoint = this.tail.getRight();
        ctx.arc(this.tail.position.x, this.tail.position.y, this.tail.size,
            Math.atan2(leftPoint.y - this.tail.position.y, leftPoint.x - this.tail.position.x),
            Math.atan2(rightPoint.y - this.tail.position.y, rightPoint.x - this.tail.position.x));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the complete fish by combining all drawing functions
    draw_fish(ctx) {
        this.draw_right_side(ctx);
        this.draw_left_side(ctx);
        this.draw_head(ctx);
        this.draw_tail(ctx);
        this.draw_smiley(ctx);
    }

    // Draws a smiley face on the fish's head
    draw_smiley(ctx) {
        // Calculate eye positions (slightly above and to the sides of the head)
        const eyeOffset = this.head.size * 0.3;
        const leftEye = this.head.getLeft().clone().add(this.head.direction.clone().scaleToLength(eyeOffset));
        const rightEye = this.head.getRight().clone().add(this.head.direction.clone().scaleToLength(eyeOffset));

        // Draw eyes
        ctx.beginPath();
        ctx.arc(leftEye.x, leftEye.y, this.head.size * 0.3, 0, Math.PI * 2);
        ctx.arc(rightEye.x, rightEye.y, this.head.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Draw smile (semicircle below the eyes)
        ctx.beginPath();
        const smileStart = this.head.getLeft().clone().add(this.head.direction.clone().scaleToLength(this.head.size * 0.5));
        const smileEnd = this.head.getRight().clone().add(this.head.direction.clone().scaleToLength(this.head.size * 0.5));
        ctx.arc(this.head.position.x, this.head.position.y, this.head.size * 0.4,
            Math.atan2(smileStart.y - this.head.position.y, smileStart.x - this.head.position.x),
            Math.atan2(smileEnd.y - this.head.position.y, smileEnd.x - this.head.position.x));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    /*
    drawBody_as_Fish(body, ctx) {
        const points = [];
        
        // Zuerst die rechte Seite von hinten nach vorne
        for (let i = body.parts.length - 1; i >= 0; i--) {
            points.push(body.parts[i].getRight());
        }

        // Dann die Kopfpunkte
        for (let i = 0; i < 10; i++) {
            const angle = (i / 9) * Math.PI;
            const offset = body.head.direction.clone().rotate(angle).scale(body.head.size);
            points.push(body.head.position.clone().add(offset));
        }

        // Dann die linke Seite von vorne nach hinten
        body.parts.forEach((bp) => {
            points.push(bp.getLeft());
        });

        // Dann die Schwanzpunkte
        for (let i = 0; i < 10; i++) {
            const angle = Math.PI + (i / 9) * Math.PI;
            const offset = body.tail.direction.clone().rotate(angle).scale(body.tail.size);
            points.push(body.tail.position.clone().add(offset));
        }

        // Zeichne den Pfad
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Zeichne die Punkte
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });
    }
    */
}