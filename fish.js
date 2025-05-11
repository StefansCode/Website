class Fish extends Body {
    constructor(sizeList) {
        super(sizeList);
    }

    drawBody_as_Fish(body) {
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
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Zeichne die Punkte
        points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
        });
    }
}