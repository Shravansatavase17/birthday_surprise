// Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let confetti = [];
const colors = ['#ff1744', '#ff80ab', '#ffd700', '#ff69b4', '#ffffff', '#ffb6c1'];

for (let i = 0; i < 200; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 3,
    d: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncrement: (Math.random() * 0.07) + 0.05
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.tiltAngle);
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = c.color;
    ctx.ellipse(0, 0, c.r, c.r / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c) => {
    c.tiltAngle += c.tiltAngleIncrement;
    c.y += c.d / 2;
    c.x += Math.sin(c.tiltAngle) * 2;
    
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}

drawConfetti();

// Surprise Button
const surpriseBtn = document.getElementById("surpriseBtn");
const surprise = document.getElementById("surprise");
const bgMusic = document.getElementById("bgMusic");

surpriseBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  bgMusic.play().catch(e => console.log("Audio autoplay prevented"));
  surpriseBtn.style.display = "none";
  
  // Create sparkles
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createSparkle(), i * 50);
  }
});

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight + 'px';
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1500);
}

// Random sparkles throughout
setInterval(() => {
  if (Math.random() > 0.7) createSparkle();
}, 1000);