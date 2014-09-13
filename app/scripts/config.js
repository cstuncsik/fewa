var get = function(id) {
    return document.getElementById(id);
},
create = function(n) {
    return document.createElement(n);
};

var game = {
    sprites: {},
    columns: 8,
    hoverColumn: null,
    activeColumn: null,
    gap: 2,
    ww: window.innerWidth,
    wh: window.innerHeight,
    level: 1,
    prevLevel: 1,
    score: 0,
    hud: {
        level: get("lv"),
        score: get('sc')
    },
    cnt: get("cnt"),
    msg: get("msg"),
    mnu: get("mnu"),
    hlp: get("hlp"),
    ng: get("ng"),
    hl: get("hl"),
    cr: get("cr"),
    stage: get("c"),
    bg: get('b'),
    bgs: [{
        b: get("b1"),
        c: 0
    }, {
        b: get("b2"),
        c: 0
    }, {
        b: get("b3"),
        c: 0
    }],
    paused: false,
    speed: 0.1,
    gravity: 0.3,
    rumble: {
        body: get("r"),
        x: 0,
        y: 0,
        level: 0,
        decay: 0.4
    },
    starColors: ["#ffffff", "#ffe9c4", "#d4fbff"],
    elements: {
        FIRE: {
            color: '#ff3824',
            latency: 50,
            power: 100,
            bricks: {
                empty: {
                    energy: 50
                },
                filled: {
                    energy: 100
                },
                special: {
                    energy: 200
                }
            },
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            spec: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        EARTH: {
            color: '#44db5e',
            latency: 60,
            power: 100,
            bricks: {
                empty: {
                    energy: 50
                },
                filled: {
                    energy: 100
                },
                special: {
                    energy: 200
                }
            },
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            spec: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        WATER: {
            color: '#54c7fc',
            latency: 70,
            power: 100,
            bricks: {
                empty: {
                    energy: 50
                },
                filled: {
                    energy: 100
                },
                special: {
                    energy: 200
                }
            },
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            spec: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        AIR: {
            color: '#ffcd00',
            latency: 40,
            power: 100,
            bricks: {
                empty: {
                    energy: 50
                },
                filled: {
                    energy: 100
                },
                special: {
                    energy: 200
                }
            },
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            spec: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    },
    starAmount: 400
};

game.ctx = game.stage.getContext('2d');
game.bg.ctx = game.bg.getContext('2d');
