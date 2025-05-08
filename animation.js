class Animation {

    constructor() {
        console.log('Animation wird initialisiert...');
        this.canvas = document.getElementById('fishCanvas');
        if (!this.canvas) {
            console.error('Canvas nicht gefunden!');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.fishes = [];
        this.resize();
        this.init();
        
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
        console.log('Fische werden erstellt...');
        // Erstelle mehrere Fische
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            this.fishes.push(new Fish(x, y));
        }
        console.log(`${this.fishes.length} Fische erstellt`);
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Aktualisiere und zeichne alle Fische
        this.fishes.forEach(fish => {
            fish.update();
            fish.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Starte die Animation wenn die Seite geladen ist
window.addEventListener('load', () => {
    console.log('Seite geladen, starte Animation...');
    new Animation();
});