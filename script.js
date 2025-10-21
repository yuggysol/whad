const canvas = document.getElementById('coinCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let coins = [];
const totalCoins = 100;
const tokenSVGs = [];
for(let i=0;i<totalCoins;i++){
    tokenSVGs.push('https://upload.wikimedia.org/wikipedia/commons/3/36/Solana_logo.svg');
}

class Coin {
    constructor(img, x, y, speed){
        this.img = new Image();
        this.img.src = img;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.lastShown = Date.now() - Math.random()*10000000;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,30,30);
    }
    update(){
        this.y += this.speed;
        if(this.y > canvas.height) this.y = -30;
        this.draw();
    }
}

for(let i=0;i<totalCoins;i++){
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height;
    const speed = 1 + Math.random()*3;
    coins.push(new Coin(tokenSVGs[i],x,y,speed));
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    coins.forEach(coin => coin.update());
    requestAnimationFrame(animate);
}
animate();

async function fetchSOL(){
    try{
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await res.json();
        document.getElementById('solPrice').innerText = `SOL = $${data.solana.usd}`;
    }catch(e){console.log(e);}
}
fetchSOL();
setInterval(fetchSOL,60000);
