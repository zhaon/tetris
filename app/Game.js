import Ground from './Ground.js';
import View from './view.js';

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

        // const ioHook = require('iohook'); ioHook.on("keypress", event => {
        //     console.log(event); // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'} }); ioHook.start();

        setInterval(() => {

            if (!this._ground.moveBlockToDown()) {
                if (this._ground.isYFull()) {
                    this._isLost = true;
                }
                else {
                    this._ground.reduceFullRows();
                }
            }
            View.draw(this._ground, this._level, this._score);

        }, this._level * 1000)
    }

    quit() {

    }

    pause() {

    }

}

export default Game;