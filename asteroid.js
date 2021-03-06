(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  function randomVelocity () {
    var dx = (Math.random() * 2 - 1) * 3;
    var dy = (Math.random() * 2 - 1) * 3;
    return [ dx, dy ];
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel, coords, radius) {
    Asteroids.MovingObject.call(this, pos, vel, radius, 'white');
    this.coords = coords;
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.randomAsteroid = function (dimX, dimY) {
    var startLoc = Math.random()
    var x, y;
    if (startLoc < 0.25) {
      // start on top edge
      x = Math.random() * dimX;
      y = 0;
    } else if (startLoc < 0.5) {
      // start on bottom edge
      x = Math.random() * dimX;
      y = dimY;
    } else if (startLoc < 0.75) {
      // start on right edge
      x = dimX;
      y = Math.random() * dimY;
    } else {
      // start on left edge
      x = 0;
      y = Math.random() * dimY;
    }

    return this.createAsteroid([x,y], randomVelocity());
  };

  Asteroid.prototype.createAsteroid = function (pos, vel) {
    var coords  = [];
    var pt_angle = 0;
    var x, y, radius;
    var sumRadius = 0;
    var count = 0;
    while (pt_angle < 360) {
      radius = (Math.random() * 15 ) + 30;
      sumRadius += radius;
      count += 1
      x = pos[0] + Math.cos(Math.PI / 180 * pt_angle) * radius;
      y = pos[1] + Math.sin(Math.PI / 180 * pt_angle) * radius;
      coords.push([x, y]);
      pt_angle += Math.random() * 40 + 20; //add 20 - 60 deg each time
    }
    var avgRadius = sumRadius / count;
    return new Asteroid(pos, vel, coords, avgRadius);
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coords[0][0], this.coords[0][1]);

    for(var i = 1; i < this.coords.length; i++) {
      ctx.lineTo(this.coords[i][0], this.coords[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  Asteroid.prototype.move = function () {
    var dx = this.vel[0];
    var dy = this.vel[1];
    this.pos = [this.pos[0] + dx, this.pos[1] + dy];
    this.coords.forEach(function(coord) {
      coord[0] += dx;
      coord[1] += dy;
    })
  };
})(this);