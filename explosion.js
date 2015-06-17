//var Explosion = function () {
var canvas, ctx, particles = [];

window.addEventListener('load',function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
});

function Particle(center) {
  this.scale = 1.0;
  this.x = center.x;
  this.y = center.y;
  this.side = 5;
  this.color = '#000000';
  this.velocityX = 0;
  this.velocityY = 0;
  this.scaleSpeed = 0.5;
  this.center = center;

}

Particle.prototype.update = function(ms) {
  //shrinking
  this.scale -= this.scaleSpeed * ms / 1000;

  if(this.scale <= 0) { this.scale = 0; }

  //moving away from explosion
  this.x += this.velocityX * ms / 1000;
  this.y += this.velocityY * ms / 1000;
}

Particle.prototype.draw = function(ctx) {
  // translating the 2D context to the particle coordinates
  ctx.save();
  ctx.translate(this.x*10,this.y*10);
  ctx.scale(this.scale,this.scale);

  // draw a filled square in the particle's local space
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.fillRect(0,0,this.side,this.side);
  ctx.restore();
}

function randomFloat(min,max) {
  return min + Math.random() * (max - min);
}

function createExplosion(loc,color,callback) {
  var minSize = 4, maxSize = 18;
  var minSpeed = 10, maxSpeed = 40;
  var minScaleSpeed = 1.0, maxScaleSpeed = 4.0;

  for(var angle = 0; angle < 360; angle += 36) {
    var particle = new Particle(loc);
    particle.side = randomFloat(minSize,maxSize);
    particle.color = color;
    particle.scaleSpeed = randomFloat(minScaleSpeed,maxScaleSpeed);
    var speed = randomFloat(minSpeed,maxSpeed);
    particle.velocityX = speed * Math.cos(angle*Math.PI/180);
    particle.velocityY = speed * Math.sin(angle*Math.PI/180);

    particles.push(particle);
  }

  setTimeout(callback,1000);
}

function update(frameDelay) {
  for(var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.update(frameDelay);
    particle.draw(ctx);
  }
}
