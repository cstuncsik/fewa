game.star = function(l) {
    this.x = game.rand.flot() * game.bg.ctx.canvas.width;
    this.y = game.rand.flot() * game.bg.ctx.canvas.height;
    this.brightness = l * 15 + game.rand.range(l*14, l*18) / 100;
    this.radius = game.rand.flot() / l * 4;
    this.color = game.starColors[game.rand.range(0, game.starColors.length)];
    this.draw();
};

game.star.prototype.update = function() {

};

game.star.prototype.draw = function() {
    game.bg.ctx.save();
    game.bg.ctx.beginPath();
    game.bg.ctx.globalAlpha = this.brightness;
    game.bg.ctx.fillStyle = this.color;
    game.bg.ctx.arc(this.x, this.y, this.radius, 0, game.PI2);
    game.bg.ctx.fill();
    game.bg.ctx.closePath();
    game.bg.ctx.restore();
};