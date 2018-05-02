// Declare times our player was hit by an enemy
let timesHit = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.speed = ~~(Math.random() * 300) + 180;
  // Set enemy initial location
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 500) this.x = -100;

  // Check if player collides with enemy
  if (player.y === this.y) {
    if (player.x > this.x - 80 && player.x < this.x + 80) resetPosition();
  }

  // Reset player position after collision
  function resetPosition() {
    player.x = 200;
    player.y = 380;
    timesHit++;
    playerLives();
  }

  // Decrease player lives if hit by enemy
  function playerLives() {
    const hearts = document.querySelectorAll('.heart');
    if (timesHit === 1) {
      for (let i = 0; i < 3; i++) {
        if (i > 1) {
          hearts[i].style.visibility = 'collapse';
        }
      }
    } else if (timesHit === 2) {
      for (let i = 0; i < 3; i++) {
        if (i > 0) {
          hearts[i].style.visibility = 'collapse';
        }
      }
    } else if (timesHit === 3) {
      console.log('you lost - stop the game');
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  // PLayer position
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';

  // Set initial times player has reached the top
  this.reachTop = 0;
}

Player.prototype.update = function() {
  // Check if player reaches top
  if (this.y < 0) {
    this.x = 200;
    this.y = 380;
    console.log(this.reachTop);
    this.reachTop++;
    // If the player reaches top 3 times, display congratulations modal
    if (this.reachTop === 3) {
      console.log('display modal - you win');
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle player movement
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
    this.x -= 100;
  } else if (key === 'right' && this.x < 400) {
    this.x += 100;
  } else if (key === 'up' && this.y > 0) {
    this.y -= 80;
  } else if (key === 'down' && this.y < 380) {
    this.y += 80;
  }
  player.update();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(-100, 140), new Enemy(-100, 60), new Enemy(-100, 220)];
// Place the player object in a variable called player
var player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
