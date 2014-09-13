game.tower = function(c, t) {
    this.type = t;
    this.width = game.brickWidth;
    this.height = game.brickWidth;
    this.setColumn(c);
    this.y = game.stage.height - this.height;
    this.hw = this.width / 2;
    this.hh = this.height / 2;
    this.rad = Math.round(this.width / 10);
    this.removed = false;
    this.sprite = game.sprite.get(this.type);
    this.shootDelay = this.latency = game.elements[this.type].latency;
};

game.tower.prototype.setColumn = function(c) {
    this.column = c;
    this.x = this.column * this.width + game.gap * (this.column + 1);
};

game.tower.prototype.destroy = function() {
    this.removed = true;
    var px = this.width / 12,
        py = this.height / 6;

    for (var j = 1; j < 12; j++) {
        for (var k = 1; k < 6; k++) {
            game.particles.push(new game.particle(this.x + j * px, this.y + k * py, px, py, this.col, 4, 300));
        }
    }
};

game.tower.prototype.hit = function() {
    var px = this.width / 8,
        py = this.height / 4;

    for (var j = 1; j < 8; j++) {
        for (var k = 1; k < 4; k++) {
            game.particles.push(new game.particle(this.x + j * px, this.y + k * py, px, py, this.col, 3, 200));
        }
    }
};

game.tower.prototype.shoot = function() {
    if (game.s !== 0){
        game.bullets.push(new game.bullet(this.column, this.type));
    }
};

game.tower.prototype.update = function() {
    this.shootDelay -= game.timer.delta;
    if (this.shootDelay < 0) {
        this.shoot();
        this.shootDelay = this.latency;
    }
};

game.tower.prototype.draw = function() {
    game.ctx.save();
    game.ctx.translate(this.x, this.y);
    game.ctx.drawImage(this.sprite, 0, 0);
    game.ctx.restore();
};
