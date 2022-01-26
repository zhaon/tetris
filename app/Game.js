import Ground from './Ground.js';
import Block from './block/Block.js';
import OneBlock from './block/OneBlock.js';

class Game {

    _ground = null;
    _nextBlock = null;
    _speed = 1;
    _level = 1;
    _score = 1;

    getScore() {

    }

    isWin() {

    }

    isLost() {

    }

    start() {

       
        setInterval(() => {

        }, this._speed * 1000)
    }

    quit() {

    }

    pause() {

    }

}

export default Game;