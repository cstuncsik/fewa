game.entity = function(p) {
    if (p) {
        this.x = p.x;
        this.y = p.y;
        this.width = p.w;
        this.height = p.h;
        this.col = p.col;
        this.removed = false;
        this.sprite = game.sprite.get(p.name);
        if (!this.sprite) {
            game.sprite.create(p.name, this.width, this.height, function(c) {
                c.fillStyle = p.col;
                c.fillRect(0, 0, p.w, p.h);
            });
        }
        this.sprite = game.sprite.get(p.name);
    }
};

game.entity.prototype.destroy = function() {
    this.removed = true;
};

game.entity.prototype.draw = function() {
    game.ctx.translate(this.x, this.y);
    if (this.rotate) {
        game.ctx.rotate(this.rotate * game.RAD);
    }
    game.ctx.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
};
