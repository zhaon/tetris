import keypress from 'keypress';
import Ground from './Ground.js';
import View from './View.js';

class Game {

    constructor() {
        this._ground = new Ground();
    }

    _ground = null;
    _level = 1;
    _score = 0;
    _isLost = false;

    getScore() {

    }

    isLost() {
        return this._isLost;
    }

    start() {
        let Game = this;
        let isAutoDown = true;
        keypress(process.stdin);
        process.stdin.on('keypress', function (ch, key) {
            let allowKeys = ['up', 'down', 'left', 'right', 'space'];
            if (allowKeys.indexOf(key)) {
                isAutoDown = false;
                switch (key.name) {
                    case 'up':
                        Game._ground.rotateBlock();
                        break;
                    case 'down':
                        Game._ground.moveBlockToDown() && Game._ground.reduceFullRows();
                        break;
                    case 'left':
                        Game._ground.moveBlockToLeft()
                        break;
                    case 'right':
                        Game._ground.moveBlockToRight()
                        break;
                    case 'space':
                        break;
                }
                View.render(Game._ground, Game._level, Game._score);
                isAutoDown = true;
            }
        });
        process.stdin.setRawMode(true);
        process.stdin.resume();

        setInterval(() => {
            if (isAutoDown) {
                if (!this._ground.moveBlockToDown()) {
                    if (this._ground.isYFull()) {
                        this._isLost = true;
                    }
                    else {
                        this._ground.reduceFullRows();
                    }
                }
                View.render(this._ground, this._level, this._score);
            }

        }, this._level * 1000)
    }

    quit() {

    }

    pause() {

    }

}

export default Game;