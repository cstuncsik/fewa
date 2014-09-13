game.bullet = function(c, t) {
    this.column = c;
    this.type = t;
    this.speed = 5;
    this.width = game.brickWidth;
    this.height = game.brickHeight;
    this.x = this.column * this.width + game.gap * (this.column + 1);
    this.y = game.stage.height - game.brickWidth;
    this.hw = this.width / 2;
    this.hh = this.height / 2;
    this.rad = 1;
    this.removed = false;
    this.power = 100;
    this.sprite = game.sprite.get(this.type + '-SHOT');
};

game.bullet.prototype.destroy = function(size) {
    game.explosions.push(new game.explosion({
        name: 'explosion#ffffff',
        x: this.x + this.hw,
        y: this.y,
        w: size / 4,
        h: size / 4,
        col: '#ffffff',
        delta: 2,
        rot: 0
    }));
    game.explosions.push(new game.explosion({
        name: 'explosion#ed8500',
        x: this.x + this.hw,
        y: this.y,
        w: size / 7,
        h: size / 7,
        col: '#ed8500',
        delta: 1.5,
        rot: -5
    }));
    game.explosions.push(new game.explosion({
        name: 'explosion#ffff00',
        x: this.x + this.hw,
        y: this.y,
        w: size / 8,
        h: size / 8,
        col: '#ffff00',
        delta: 1,
        rot: 4
    }));
    this.removed = true;
};

game.bullet.prototype.update = function() {
    this.y -= this.speed * game.timer.delta;

    var b = game.bricks[this.column],
        n = b.length, p;

    while (n--) {
        if (b[n] !== null && b[n].y > this.y - game.brickHeight) {
            if (this.type === b[n].type){
                game.rumble.level = 1;
                p = this.power * 2;
            }
            else {
                p = this.power / 10;
            }
            this.destroy(p);
            b[n].hit(p, this.type);
        }
    }

};

game.bullet.prototype.draw = function() {
    game.ctx.save();
    game.ctx.translate(this.x, this.y);
    game.ctx.drawImage(this.sprite, 0, 0);
    game.ctx.restore();
};
