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
    _isPause = false;

    async start() {
        let Game = this;
        keypress(process.stdin);
        process.stdin.on('keypress', function (ch, key) {
            let allowKeys = ['up', 'down', 'left', 'right', 'space'];
            if (allowKeys.indexOf(key)) {
                switch (key.name) {
                    case 'up':
                        !Game._isLost && !Game._isPause && Game._ground.rotateBlock();
                        break;
                    case 'down':
                        !Game._isLost && !Game._isPause && Game._ground.moveBlockToDown()
                        break;
                    case 'left':
                        !Game._isLost && !Game._isPause && Game._ground.moveBlockToLeft()
                        break;
                    case 'right':
                        !Game._isLost && !Game._isPause && Game._ground.moveBlockToRight()
                        break;
                    case 'space':
                        Game._isPause = !Game._isPause;
                        break;
                    case 'escape':
                        if (Game._isLost) {
                            Game._ground = new Ground();
                            Game._level = 1;
                            Game._score = 0;
                            Game._isLost = false;
                            Game._isPause = false;
                        }
                        break;
                }
                Game._gameLogic();
            }
        });
        process.stdin.setRawMode(true);
        process.stdin.resume();

        while (true) {
            if (!this._isLost && !this._isPause) {
                this._ground.moveBlockToDown();
                this._gameLogic();
            }
            await this._sleep((5 - this._level) * 300);
        }
    }

    _gameLogic() {
        if (this._ground.isYFull()) {
            this._isLost = true;
        }
        else {
            let reduceRows = this._ground.reduceFullRows();

            let score = 0;
            if (reduceRows.length < 2) {
                score = reduceRows.length * 100
            }
            else if (reduceRows.length >= 2 && reduceRows.length < 5) {
                score += reduceRows.length * 100 + reduceRows.length * 100 * 0.5
            }
            else if (reduceRows.length >= 5) {
                score += reduceRows.length * 100 + reduceRows.length * 100 * 0.8
            }
            this._score += score;

            if (this._score < 2000) {
                this._level = 1;
            }
            if (this._score >= 2000 && this._score < 5000) {
                this._level = 2;
            }
            else if (this._score >= 5000 && this._score < 10000) {
                this._level = 3;
            }
            else if (this._score >= 10000) {
                this._level = 4;
            }

        }
        View.render(this._ground, this._level, this._score, this._isLost, this._isPause);
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}

export default Game;