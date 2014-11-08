// Create the global game namespace
var game = {};

//  Object extend utility
game.obj = {
    extend: function(subject, extension) {
        var i,
            toStr = Object.prototype.toString,
            astr = '[object Array]';

        for (var prop in extension) {
            if (extension.hasOwnProperty(prop)) {
                if (extension[prop] && extension[prop].constructor && extension[prop] === Object) {
                    subject[prop] = subject[prop] || {};
                    game.obj.extend(subject[prop], extension[prop]);
                } else {
                    subject[prop] = extension[prop];
                }
            }
        }
    }
};

game.obj.extend(game, {

    // Vendor prefixes utility
    vendor: {
        prefixes: ['', 'ms', 'webkit', 'moz', 'o'],
        get: function(prop) {
            var name, i;
            for (i = 0; i < this.prefixes.length; i++) {
                name = this.prefixes[i] + (this.prefixes[i] === '' ? prop : prop.charAt(0).toUpperCase() + prop.slice(1));
                if (typeof document.body.style[name] !== 'undefined') {
                    return name;
                }
            }
            return null;
        }
    },

    // Dom utilities
    dom: {
        get: function(id) {
            return document.getElementById(id);
        },
        create: function(n) {
            return document.createElement(n);
        }
    },

    // Array utilities
    arr: {
        create: function(n, v) {
            var arr = [],
                val;
            while (n--) {
                val = typeof v === 'undefined' ? [] : v;
                arr.push(val);
            }
            return arr;
        },
        move: function(arr, from, to) {
            arr[from] = arr.splice(to, 1, arr[from])[0];
        }
    },

    // Random number utilities
    rand: {
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
    },

    // Some math constants
    PI2: Math.PI * 2,
    RAD: Math.PI / 180,
    DEG: 180 / Math.PI,

    // Empty function
    noop: function() {},

    // Drawing utilities
    line: function(c, x1, y1, x2, y2, col, lw) {
        c.strokeStyle = col;
        c.lineWidth = lw;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
    },
    rect: function(c, x, y, w, h, r, col, lw, fillcolor, glow) {
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
    },
    sine: function(c, x1, y1, x2, y2, col, lw) {
        var xc = (x1 + x2) / 2,
            yc = (y1 + y2) / 2;

        c.strokeStyle = col;
        c.lineWidth = lw;
        c.beginPath();
        c.moveTo(x1, y1);
        c.bezierCurveTo(x1, y1, xc / 2, yc * 1.5, xc, yc);
        c.bezierCurveTo(xc * 1.5, yc / 2, x2, y2, x2, y2);
        c.stroke();
    }
});
