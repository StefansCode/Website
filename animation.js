class Animation {

    constructor() {
        console.log('Animation wird initialisiert...');
        this.canvas = document.getElementById('fishCanvas');
        if (!this.canvas) {
            console.error('Canvas nicht gefunden!');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.bodies = [];
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        console.log('Animation initialisiert!');
    }

    resize() {
        console.log('Resize wird ausgeführt...');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(`Canvas Größe: ${this.canvas.width}x${this.canvas.height}`);
    }

    init() {
        console.log('Körper werden erstellt...');
        // Erstelle mehrere Körper mit unterschiedlichen Größen
        const sizes = [12, 14, 15, 14, 12, 10, 8, 6, 4];
        for (let i = 0; i <1; i++) {
            const body = new Body(sizes);
            body.head.position = new Vector(0,0);
            this.bodies.push(body);
        }
        console.log(`${this.bodies.length} Körper erstellt`);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Aktualisiere und zeichne alle Körper
        this.bodies.forEach(body => {
            body.update();
            //this.drawBody_as_Fish(body);
            this.drawBody_as_Circle(body);
        });
        
        requestAnimationFrame(() => this.animate());
    }

    drawBodypart(bp) {
        this.ctx.beginPath();
        this.ctx.arc(bp.position.x, 
                bp.position.y,
                bp.size,
                0, Math.PI * 2);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawBody_as_Circle(body) {
        body.parts.forEach(bp => this.drawBodypart(bp));
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

// Starte die Animation wenn die Seite geladen ist
window.addEventListener('load', () => {
    console.log('Seite geladen, starte Animation...');
    new Animation();
});