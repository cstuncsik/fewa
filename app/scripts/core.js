game.message = function(txt, delay) {
    var ms = game.msg.style;
    if (txt) {
        game.msg.innerHTML = txt;
        ms.display = 'block';
    } else {
        ms.display = 'none';
    }
    if (delay) {
        setTimeout(function() {
            ms.display = 'none';
        }, delay);
    }
};

game.over = function() {
    var t = 0;
    game.s = 0;
    game.message('GAME OVER');
    game.audio.play('death');

    game.bricks.forEach(function(column) {
        setTimeout(function() {
            column.forEach(function(brick) {
                if (brick && !brick.removed) {
                    brick.add = 0.3;
                }
            });
        }, t);
        t += 100;
    });
};

game.pause = function() {
    if (game.paused) {
        game.paused = false;
        game.message();
    } else {
        game.paused = true;
        game.message('PAUSE');
    }
};

game.menu = function() {
    game.paused = true;
    game.mnu.style.display = 'block';
    game.hlp.style.display = 'none';
    game.msg.style.display = 'none';
};

game.help = function() {
    game.mnu.style.display = 'none';
    game.msg.style.display = 'none';
    game.hlp.style.display = 'block';
    if (!game.buildHelp) {
        for (var element in game.elements) {
            if (game.elements.hasOwnProperty(element)) {
                var k = element,
                    v = game.elements[element],
                    el = create('div'),
                    ttl = create('strong'),
                    desc = create('p'),
                    spec = create('p');

                ttl.innerHTML = k + '<br />';
                desc.innerHTML = v.desc;
                spec.innerHTML = v.spec;
                el.appendChild(ttl);
                desc.insertBefore(game.sprite.get(k), desc.firstChild);
                el.appendChild(desc);
                spec.insertBefore(game.sprite.get(k + '-BRICK-special'), spec.firstChild);
                el.appendChild(spec);
                game.hlp.insertBefore(el, game.hlp.firstChild);
            }
        }
        game.buildHelp = true;
    }
};

game.credits = function() {

};

game.update = function() {

    var c = game.bricks.length,
        n;

    while (c--) {
        n = game.bricks[c].length;
        while (n--) {
            if (game.bricks[c][n]) {
                if (game.bricks[c][n].removed) {
                    game.bricks[c].splice(n, 1);
                } else {
                    game.bricks[c][n].update();
                }
            }
        }
    }

    n = game.towers.length;
    while (n--) {
        if (game.towers[n].width) {
            game.towers[n].update();
        }
    }

    n = game.bullets.length;
    while (n--) {
        if (game.bullets[n]) {
            if (game.bullets[n].removed) {
                game.bullets.splice(n, 1);

            } else {
                game.bullets[n].update();
            }
        }
    }

    n = game.particles.length;
    while (n--) {
        if (game.particles[n]) {
            if (game.particles[n].removed) {
                game.particles.splice(n, 1);
            } else {
                game.particles[n].update();
            }
        }
    }

    n = game.explosions.length;
    while (n--) {
        if (game.explosions[n]) {
            if (game.explosions[n].removed) {
                game.explosions.splice(n, 1);
            } else {
                game.explosions[n].update();
            }
        }
    }

    game.rumble.update();
};

game.draw = function() {
    game.ctx.save();
    game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
    var c = game.bricks.length,
        n;

    while (c--) {
        n = game.bricks[c].length;
        while (n--) {
            if (game.bricks[c][n] !== null) {
                game.bricks[c][n].draw();
            }
        }
    }

    n = game.towers.length;
    while (n--) {
        if (game.towers[n].width) {
            game.towers[n].draw();
        }
    }

    n = game.bullets.length;
    while (n--) {
        if (game.bullets[n].width) {
            game.bullets[n].draw();
        }
    }


    n = game.particles.length;
    while (n--) {
        if (game.particles[n] !== null) {
            game.particles[n].draw();
        }
    }

    n = game.explosions.length;
    while (n--) {
        if (game.explosions[n] !== null) {
            game.explosions[n].draw();
        }
    }

    game.rumble.draw();
    game.drawSelection();

};

game.rumble.update = function() {
    if (game.rumble.level > 0) {
        game.rumble.level -= game.rumble.decay;
        game.rumble.level = (game.rumble.level < 0) ? 0 : game.rumble.level;
        game.rumble.x = game.rand.rangef(-game.rumble.level, game.rumble.level);
        game.rumble.y = game.rand.rangef(-game.rumble.level, game.rumble.level);
    } else {
        game.rumble.x = 0;
        game.rumble.y = 0;
    }
};

game.rumble.draw = function() {
    if (game.rumble.x !== 0 || game.rumble.y !== 0) {
        game.stage.style[game.transformName] = "translate(" + game.rumble.x + "px," + game.rumble.y + "px)";
    }
};

game.drawSelection = function() {
    var ac = game.towers[game.activeColumn],
        hc = game.towers[game.hoverColumn];
    if (game.activeColumn !== null) {
        game.ctx.save();
        game.ctx.translate(ac.x, 0);
        game.ctx.lineWidth = 2;
        game.ctx.fillStyle = game.elements[ac.type].color;
        game.ctx.globalAlpha = 0.2;
        game.ctx.fillRect(0, 0, game.brickWidth, game.stage.height);
        game.ctx.restore();
    }
    if (game.hoverColumn !== null) {
        var col = '#ffffff';
        if (hc && hc.x) {
            col = game.elements[hc.type].color;
        }
        if (ac && ac.x) {
            col = game.elements[ac.type].color;
        }
        game.ctx.save();
        game.ctx.translate(game.gap + game.hoverColumn * (game.brickWidth + game.gap), 0);
        game.ctx.lineWidth = 2;
        game.ctx.fillStyle = col;
        game.ctx.globalAlpha = 0.2;
        game.ctx.fillRect(0, 0, game.brickWidth, game.stage.height);
        game.ctx.restore();
    }
};

game.createSprite = function(name, w, h, fn) {

    if (!game.sprites[name]) {

        game.sprites[name] = document.createElement('canvas');
        game.sprites[name].width = w;
        game.sprites[name].height = h;

        var octx = game.sprites[name].getContext('2d');
        octx.save();
        fn(octx);
        octx.restore();
    }

    return game.sprites[name];
};

game.countScore = function(v) {
    game.score += v;
    game.level = Math.ceil(game.s / 0.12);
    game.hud.score.innerHTML = game.score;
    game.hud.level.innerHTML = game.level;
    if (game.level > game.prevLevel) {
        game.prevLevel = game.level;
        game.message('LEVEL UP', 2000);
        game.audio.play('levelup');
    }
};

game.timer = {
    date: new Date(),
    curr: null,
    timestamp: Date.now(),
    delta: 1,
    msec: 0,
    move: 0,
    t: 1E3 / 60,
    tick: function() {
        game.timer.curr = Date.now();
        game.timer.d = game.timer.curr - game.timer.timestamp;
        game.timer.delta = game.timer.d / game.timer.t;
        game.timer.delta = (game.timer.delta < 0) ? 0.001 : game.timer.delta;
        game.timer.delta = (game.timer.delta > 10) ? 10 : game.timer.delta;
        game.timer.msec += game.timer.delta;
        game.timer.timestamp = game.timer.curr;
        game.timer.move = game.s * game.timer.delta;
    }
};

game.newgame = function() {
    game.bricks = game.arr.create(game.columns);
    game.towers = [];
    game.bullets = [];
    game.particles = [];
    game.explosions = [];

    var c, arr = (game.elementTypes.concat(game.arr.create(game.columns - 4, 0))).sort(function() {
        return 0.5 - Math.random();
    });

    for (c = 0; c < arr.length; c++) {
        game.towers[c] = arr[c] ? new game.tower(c, arr[c]) : {};
    }
    game.score = 0;
    game.s = game.speed;
    game.countScore(0);
    game.paused = false;
    game.msg.style.display = 'none';
};

game.init = function() {
    game.elementTypes = Object.keys(game.elements);
    game.transformName = game.vendor.get('transform');
    game.brickWidth = (game.stage.width / game.columns - game.gap) - (game.gap / game.columns);
    game.brickHeight = game.brickWidth / 2 + game.gap;
    game.sprite.factory();
    game.initBackground();
    game.controls();
    game.stats();
    game.menu();
};

game.stats = function() {
    var stats;
    if (typeof Stats === 'function') {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        game.stats = stats;
    } else {
        game.stats = {
            begin: game.noop,
            end: game.noop
        }
    }
};

game.controls = function() {

    window.addEventListener('keyup', function(e) {
        switch (e.keyCode) {
            case 27:
                game.menu();
                break;
            case 80:
                game.pause();
                break;
        }
    }, false);

    game.ng.addEventListener('click', function() {
        game.newgame();
        game.audio.play('click');
        game.mnu.style.display = 'none';
    }, false);

    game.hl.addEventListener('click', function() {
        game.help();
        game.audio.play('click');
    }, false);

    game.hlp.addEventListener('click', function() {
        game.menu();
    }, false);

    game.cr.addEventListener('click', function() {
        game.credits();
        game.audio.play('click');
    }, false);

    ['ng', 'hl', 'cr'].forEach(function(el) {
        game[el].addEventListener('mouseover', function() {
            game.audio.play('hover');
        }, false);
    });

    game.cnt.addEventListener('mousemove', function(e) {
        if (!game.paused) {
            var x = e.pageX - this.offsetLeft,
                col = Math.floor(x / (game.brickWidth + game.gap + game.gap / game.columns));

            game.hoverColumn = col;
        }
    }, false);

    game.cnt.addEventListener('click', function(e) {
        if (!game.paused) {
            var x = e.pageX - this.offsetLeft,
                col = Math.floor(x / (game.brickWidth + game.gap + game.gap / game.columns));
            if (game.towers[col].width) {
                // clicked to tower
                if (game.activeColumn === null) {
                    // selection (first) click
                    game.activeColumn = col;
                    game.audio.play('select');
                } else {
                    // switch towers
                    game.towers[game.activeColumn].setColumn(col);
                    game.towers[col].setColumn(game.activeColumn);
                    game.arr.move(game.towers, game.activeColumn, col);
                    game.activeColumn = null;
                    game.audio.play('move');
                }
            } else {
                if (game.activeColumn !== null) {
                    game.towers[game.activeColumn].setColumn(col);
                    game.arr.move(game.towers, game.activeColumn, col);
                    game.audio.play('move');
                }
                game.activeColumn = null;
            }
        }
    }, false);
};

game.initBackground = function() {
    var star = null,
        s,
        b = game.bgs.length;

    while (b--) {
        game.bg.ctx.clearRect(0, 0, game.bg.ctx.canvas.width, game.bg.ctx.canvas.height);
        s = game.starAmount;
        while (s--) {
            star = new game.star(game.bgs.length - b + 1);
            star.draw();
        }

        game.bgs[b].b.style.backgroundImage = 'url(' + game.bg.toDataURL() + ')';
    }
};

game.updateBackground = function() {
    var b = game.bgs.length;

    while (b--) {
        game.bgs[b].c += (b + 1);
        game.bgs[b].b.style.backgroundPosition = '0px ' + (game.bgs[b].c / 3) + 'px';
    }
};

game.emitter = {
    sum: 0,
    row: 0,
    emit: function() {
        if (game.emitter.sum > game.brickHeight + game.gap || game.emitter.sum === 0) {
            game.emitter.sum = 0;
            var c = game.columns,
                b, randType, randItem;
            while (c--) {
                randType = game.rand.select(game.elementTypes);
                randItem = game.rand.select(Object.keys(game.elements[randType].bricks));
                b = new game.brick({
                    column: c,
                    type: randType,
                    item: randItem
                });
                b.row = game.emitter.row;
                game.bricks[c].unshift(b);
            }
            game.emitter.row++;
            game.s += 0.001;
        }
        game.emitter.sum += game.timer.move;
    }
};

window.onload = function() {

    game.stage.width = game.wh / 2;
    game.stage.height = game.wh - 30;
    game.cnt.style.height = game.wh + 'px';
    game.cnt.style.width = game.stage.width + 'px';
    game.bg.width = game.ww;
    game.bg.height = game.wh;

    for (var i = 0; i < 3; i++) {
        game.bgs[i].width = game.ww;
        game.bgs[i].height = game.wh;
    }

    game.init();

    (function loop() {
        game.timer.tick();
        window.requestAnimationFrame(loop, game.stage);
        game.stats.begin();
        game.updateBackground();
        if (!game.paused) {
            game.emitter.emit();
            game.update();
            game.draw();
        }
        game.stats.end();
    })();
};
