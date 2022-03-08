//https://medium.com/swlh/html-5-canvas-solar-system-e1e18204b123
const DEBUG = false;
class Planet {
    constructor(radius, color, velocity, orbitRadius, imgPath) {
        this.x;
        this.y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.orbitRadius = orbitRadius;
        this.theta = 0;
        this.image = new Image(this.radius, this.radius);
        this.image.src = imgPath;
    }

    draw() {
        var r = Math.sqrt(Math.pow(this.x - center_x, 2) + Math.pow(this.y - center_y, 2))
        this.theta += (0.02 * this.velocity);

        this.x = center_x + this.orbitRadius * Math.sin(this.theta)
        this.y = center_y + this.orbitRadius * Math.cos(this.theta)

        if (DEBUG) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        c.beginPath();
        c.lineWidth = 2;
        c.arc(center_x, center_y, r, 0, Math.PI * 2, false);
        c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        c.stroke();
        c.closePath();

        c.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    update() {
        this.draw();
    }
}

class Star {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'white';
    }

    draw() {
        console.log('draw star')
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    planets.forEach(planet => {
        planet.update();
    })

    stars.forEach(star => {
        star.update();
    })
}

let c;
let canvas;
let center_x = 0;
let center_y = 0;
let earth = 10;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

function init() {
    planets = [];
    stars = [];
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    planets.push(new Planet(40, 'red', 0, 0, './sun.png'));
    planets.push(new Planet(25, 'white', 4.14, 60, './mercury.png'));
    planets.push(new Planet(30, 'red', 1.6, 90, './venus.png'));
    planets.push(new Planet(30, 'white', 1, 120, './earth.png'));
    planets.push(new Planet(30, 'red', 0.53, 150, './mars.png'));
    planets.push(new Planet(30, 'red', 0.08, 200, './jupiter.png'));
    planets.push(new Planet(30, 'red', 0.03, 260, './saturn.png'));
    planets.push(new Planet(30, 'red', 0.011, 310, './uranus.png'));
    planets.push(new Planet(30, 'red', 0.006, 370, './neptune.png'));

    for (i=0; i<200; i++) {
        x = getRandomInt(0, canvas.width)
        y = getRandomInt(0, canvas.height)
        radius = getRandomInt(1, 2)
        stars.push(new Star(x, y, radius));
    }
} 

window.onload = function() {
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
    animate();
}