import Pile from './Pile.js';
import Point from './Point.js';
import OneBlock from "./block/OneBlock.js";
import TBlock from "./block/TBlock.js";
import ZBlock from "./block/ZBlock.js";
import MirroringZBlock from "./block/MirroringZBlock.js";
import SevenBlock from "./block/SevenBlock.js";
import MirroringSevenBlock from "./block/MirroringSevenBlock.js";
import StoneBlock from "./block/StoneBlock.js";

class Ground {

    constructor(w = 10, h = 20) {
        this._height = h;
        this._width = w;
        this._pile = new Pile();
        this._activeBlock = this._randomBlock();

        this._nextBlock = this._randomBlock();
    }

    _height = 0;
    _width = 0;
    _activeBlock = null;
    _nextBlock = null;
    _pile = null;

    _randomBlock() {
        let block = null;
        let randomNum = Math.floor((Math.random() * 6) + 1);
        switch (randomNum) {
            case 0:
                block = new OneBlock();
                break;
            case 1:
                block = new TBlock();
                break;
            case 2:
                block = new ZBlock();
                break;
            case 3:
                block = new MirroringZBlock();
                break;
            case 4:
                block = new SevenBlock();
                break;
            case 5:
                block = new MirroringSevenBlock();
                break;
            case 6:
                block = new StoneBlock();
                break;
        }
        block && block.moveToPoint(4, 0);
        return block;
    }

    _canMoveLeft(block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getX() - 1 < 0) && !points.find(p => this._pile.getPoint(p.getX() - 1, p.getY()));
    }

    _canMoveRight(block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getX() + 1 > this._width - 1) && !points.find(p => this._pile.getPoint(p.getX() + 1, p.getY()));
    }

    _canMoveDown(block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getY() + 1 > this._height - 1) && !points.find(p => this._pile.getPoint(p.getX(), p.getY() + 1));
    }

    _canRotate(block) {
        let points = block.getActualPoints();
        return !points.find(p => this._pile.getPoint(p.getY(), 0 - p.getX()));
    }

    reduceFullRows() {
        let yArr = [];
        let allPoints = this.getMatrix();
        for (let row of allPoints) {
            let isFull = true;
            for (let p of row) {
                if (!this._pile.getPoint(p.getX(), p.getY())) {
                    isFull = false;
                }
            }
            if (isFull) {
                yArr.push(row[0].getY());
            }
        }
        if (yArr.length > 0) {
            this._pile.reduceRows(yArr);
        }
        return yArr;
    }

    isYFull() {
        return this._pile.getTopY() === 0 ? true : false;
    }

    setActiveBlock(block) {
        this._activeBlock = block;
    }

    moveBlockToLeft(step = 1) {
        step = step > 0 ? step : 1;
        while (step > 0) {
            if (this._canMoveLeft(this._activeBlock)) {
                this._activeBlock.moveLeft(step);
            }
            else {
                return false;
            }
            step -= 1;
        }
        return true;
    }

    moveBlockToRight(step = 1) {
        step = step > 0 ? step : 1;
        while (step > 0) {
            if (this._canMoveLeft(this._activeBlock)) {
                this._activeBlock.moveRight();
            }
            else {
                return false;
            }
            step -= 1;
        }
        return true;
    }

    moveBlockToDown(step = 1) {
        step = step > 0 ? step : 1
        while (step > 0) {
            if (this._canMoveDown(this._activeBlock)) {
                this._activeBlock.moveDown();
            }
            else {
                this._pile.putIn(this._activeBlock);
                this._activeBlock = this._nextBlock;
                this._nextBlock = this._randomBlock();
                return false;
            }
            step -= 1;
        }
        return true;
    }

    rotateBlock() {
        if (this._canRotate(this._activeBlock)) {
            this._activeBlock.rotate();
        }
        else {
            return false;
        }
        return true;
    }

    getMatrix() {
        let rows = [];
        for (let y = 0; y < this._height; y++) {
            let columns = [];
            for (let x = 0; x < this._width; x++) {
                let blockPoint = null;
                if (blockPoint = this._activeBlock.getActualPoints().find(p => p.getX() === x && p.getY() === y)) {
                    columns.push(blockPoint);
                }
                else if (blockPoint = this._pile.getPoint(x, y)) {
                    columns.push(blockPoint);
                }
                else {
                    blockPoint = new Point(x, y)
                    columns.push(blockPoint);
                }
            }
            rows.push(columns);
        }
        return rows;
    }

}

export default Ground;