import Ground from './Ground.js';
import OneBlock from "./block/OneBlock.js";
import TBlock from "./block/TBlock.js";
import ZBlock from "./block/ZBlock.js";
import MirroringZBlock from "./block/MirroringZBlock.js";
import SevenBlock from "./block/SevenBlock.js";
import MirroringSevenBlock from "./block/MirroringSevenBlock.js";
import StoneBlock from "./block/StoneBlock.js";
import Color from './Color.js';
import chalk from 'chalk';

class Game {

    constructor() {
        this._ground = new Ground(this._randomBlock());
        this._nextBlock = this._randomBlock();
    }

    _ground = null;
    _nextBlock = null;
    _speed = 1;
    _level = 1;
    _score = 1;

    _randomBlock() {
        switch (Math.round(Math.random()) * 6) {
            case 0:
                return new OneBlock();
            case 1:
                return new TBlock();
            case 2:
                return new ZBlock();
            case 3:
                return new MirroringZBlock();
            case 4:
                return new SevenBlock();
            case 5:
                return new MirroringSevenBlock();
            case 6:
                return new StoneBlock();
        }
    }


    getScore() {

    }

    isWin() {

    }

    isLost() {

    }

    start() {
        setInterval(() => {
            console.clear();
            let points = this._ground.getAllPoints();
            for (let row of points) {
                let line = [];
                for (let p of row) {
                    line.push(chalk.bgRed(' '));
                }
                console.log(line.join(' ') + '\n');
            }


        }, this._speed * 1000)
    }

    quit() {

    }

    pause() {

    }

}

export default Game;