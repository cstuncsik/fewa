game.vendor = {
    prefixes: ["", "ms", "webkit", "moz", "o"],
    get: function(prop) {
        var name, i;
        for (i = 0; i < this.prefixes.length; i++) {
            name = this.prefixes[i] + (this.prefixes[i] === "" ? prop : prop.charAt(0).toUpperCase() + prop.slice(1));
            if (typeof document.body.style[name] !== "undefined") {
                return name;
            }
        }
        return null;
    }
};

game.arr = {
    create: function(n, v) {
        var arr = [],
            val;
        while (n--) {
            val = typeof v === "undefined" ? [] : v;
            arr.push(val);
        }
        return arr;
    },
    move: function(arr, from, to) {
        arr[from] = arr.splice(to, 1, arr[from])[0];
    }
};

game.rand = {
    intg: function(max) {
        return Math.random() * (max || 0xfffffff) | 0;
    },
    flot: function() {
        return Math.random();
    },
    bool: function() {
        return Math.random() > 0.5;
    },
    range: function(min, max) {
        return game.rand.intg(max - min) + min;
    },
    rangef: function(min, max) {
        return game.rand.flot() * (max - min) + min;
    },
    select: function(source) {
        return source[game.rand.range(0, source.length)];
    }
};

game.PI2 = Math.PI * 2;

game.RAD = Math.PI / 180;

game.DEG = 180 / Math.PI;

game.noop = function() {};

game.rect = function(c, x, y, w, h, r, col, lw, fillcolor, glow) {
    x += lw;
    w -= lw * 2;
    y += lw;
    h -= lw * 2;
    c.beginPath();
    c.strokeStyle = col;
    c.lineWidth = lw;
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
    c.stroke();
    if (fillcolor) {
        c.fillStyle = fillcolor;
        c.fill();
    }
    if (glow) {
        game.rect(c, x - lw, y - lw, w + lw * 2, h + lw * 2, r * 1.2, glow, lw / 2);
    }
};

game.sine = function(c, x1, y1, x2, y2, col, lw) {
    var xc = (x1 + x2) / 2,
        yc = (y1 + y2) / 2;

    c.strokeStyle = col;
    c.lineWidth = lw;
    c.beginPath();
    c.moveTo(x1, y1);
    c.bezierCurveTo(x1, y1, xc / 2, yc * 1.5, xc, yc);
    c.bezierCurveTo(xc * 1.5, yc / 2, x2, y2, x2, y2);
    c.stroke();
};

game.line = function(c, x1, y1, x2, y2, col, lw) {
    c.strokeStyle = col;
    c.lineWidth = lw;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
};
