game.brick = function(p) {
    this.column = p.column;
    this.type = p.type;
    this.width = game.brickWidth;
    this.height = game.brickHeight;
    this.x = this.column * this.width + game.gap * (this.column + 1);
    this.y = -this.height;
    this.hw = this.width / 2;
    this.hh = this.height / 2;
    this.rad = Math.round(this.width / 10);
    this.removed = false;
    this.col = game.elements[this.type].color;
    this.add = 0;
    this.explode = game.noop;
    this.sprite = game.sprite.get(this.type + '-BRICK-' + p.item);
    this.val = this.energy = game.elements[this.type].bricks[p.item].energy;


    if (p.item === 'special') {
        switch (p.type) {
            case 'FIRE':
                this.explode = function() {
                    game.rumble.level = 10;
                    var b = game.bricks[this.column],
                        n = b.length;
                    while (n--) {
                        if (b[n] && !b[n].removed) {
                            b[n].hitType = b[n].type;
                            b[n].destroy();
                        }
                    }
                    game.audio.play('explosionBig');
                };
                break;
            case 'EARTH':
                this.explode = function() {
                    game.rumble.level = 10;
                    var n = game.columns,
                        r, b;
                    while (n--) {
                        r = game.bricks[n].length;
                        while (r--) {
                            b = game.bricks[n][r];
                            if (b && !b.removed && b.row >= this.row - 1 && b.row <= this.row + 1 && b.column >= this.column - 1 && b.column <= this.column + 1) {
                                b.hitType = b.type;
                                b.destroy();
                            }
                        }
                    }
                    game.audio.play('explosionBig');
                };
                break;
            case 'WATER':
                this.explode = function() {
                    game.rumble.level = 10;
                    var n = game.columns,
                        r;
                    while (n--) {
                        if (n !== this.column) {
                            r = game.bricks[n].length;
                            while (r--) {
                                if (game.bricks[n][r] && !game.bricks[n][r].removed && game.bricks[n][r].row === this.row) {
                                    game.bricks[n][r].hitType = game.bricks[n][r].type;
                                    game.bricks[n][r].destroy();
                                }
                            }
                        }
                    }
                    game.audio.play('explosionBig');
                };
                break;
            case 'AIR':
                this.explode = function() {
                    game.rumble.level = 10;
                    var n = game.columns,
                        r, b;
                    while (n--) {
                        r = game.bricks[n].length;
                        while (r--) {
                            b = game.bricks[n][r];
                            if (b && !b.removed && b.type === this.type && b.val === 50) {
                                b.hitType = b.type;
                                b.destroy();
                            }
                        }
                    }
                    game.audio.play('explosionBig');
                };
                break;
        }
    }
};

game.brick.prototype.destroy = function(noscore) {
    this.removed = true;
    if (this.type === this.hitType) {
        this.explode();
        game.flash = 8;
    }
    game.rumble.level = 5;
    var sz = 12,
        pcs = 10;
    while (pcs--) {
        game.particles.push(new game.particle({
            name: 'particle' + this.col,
            x: this.x + this.width / 2,
            y: this.y + this.height,
            w: this.width / sz,
            h: this.height / (sz / 2),
            col: this.col,
            speed: game.rand.range(1, 5),
            dist: game.rand.range(3, 5) * 100
        }));
    }
    if (!noscore) {
        game.countScore(this.val);
    }
    game.audio.play('explosion');
};

game.brick.prototype.hit = function(p, t) {
    this.hitType = t;
    this.energy -= p;
    if (this.energy <= 0 && !this.removed) {
        this.destroy();
    }
    game.audio.play('hit');
};

game.brick.prototype.update = function() {
    this.y += game.timer.move + this.add;
    if (this.add === 0) {
        if (game.s !== 0 && this.y > game.stage.height - this.height - game.brickWidth) {
            game.over();
        }
    } else {
        this.add -= game.gravity;
    }
};

game.brick.prototype.draw = function() {
    game.ctx.save();
    game.ctx.translate(this.x, this.y);
    game.ctx.drawImage(this.sprite, 0, 0);
    game.ctx.restore();
};
