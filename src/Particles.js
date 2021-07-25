//document.body.appendChild(document.createElement('canvas'))

const canvas = document.querySelector('canvas');
canvas.style.position = 'fixed'
canvas.style.top = '0'
canvas.style.left = '0'

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    // this.requestFullscreen()
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 20; i++){
        particlesArray.push(new Particle());
    }
})
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++){
        particlesArray.push(new Particle());
    }
})
// canvas.addEventListener('touchmove', function(event){
//     //this.requestFullscreen()
//     mouse.x = event.touches[0].pageX;
//     mouse.y = event.touches[0].pageY;
//     for (let i = 0; i < 3; i++){
//         particlesArray.push(new Particle());
//     }
// })


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = 'hsla(' + hue + ', 100%, 50%, .8)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.02)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=1;
    requestAnimationFrame(animate);
}
animate();