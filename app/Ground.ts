import Pile from './Pile.js';
import Point from './Point.js';
import OneBlock from './block/OneBlock.js';
import TBlock from "./block/TBlock.js";
import ZBlock from "./block/ZBlock.js";
import MirroringZBlock from "./block/MirroringZBlock.js";
import SevenBlock from "./block/SevenBlock.js";
import MirroringSevenBlock from "./block/MirroringSevenBlock.js";
import StoneBlock from "./block/StoneBlock.js";
import Block from './block/Block.js';

class Ground {

    constructor(w = 10, h = 20) {
        this._height = h;
        this._width = w;
        this._pile = new Pile();
        this._activeBlock = this._randomBlock();
        this._nextBlock = this._randomBlock();
    }

    _height: number = 0;
    _width: number = 0;
    _activeBlock: Block;
    _nextBlock: Block;
    _pile: Pile;

    _randomBlock(): Block {
        let block: Block = new TBlock();
        let randomNum = Math.round(Math.random() * 6) + 1;
        switch (randomNum) {
            case 1:
                block = new OneBlock();
                break;
            case 2:
                //   block = new TBlock();
                break;
            case 3:
                block = new ZBlock();
                break;
            case 4:
                block = new MirroringZBlock();
                break;
            case 5:
                block = new SevenBlock();
                break;
            case 6:
                block = new MirroringSevenBlock();
                break;
            case 7:
                block = new StoneBlock();
                break;
        }
        block.moveToPoint(4, 0);
        return block;
    }

    _canMoveLeft(block: Block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getX() - 1 < 0) && !points.find(p => this._pile.getPoint(p.getX() - 1, p.getY()));
    }

    _canMoveRight(block: Block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getX() + 1 > this._width - 1) && !points.find(p => this._pile.getPoint(p.getX() + 1, p.getY()));
    }

    _canMoveDown(block: Block) {
        let points = block.getActualPoints();
        return !points.find(p => p.getY() + 1 > this._height - 1) && !points.find(p => this._pile.getPoint(p.getX(), p.getY() + 1));
    }

    _canRotate(block: Block) {
        block.rotate();
        let points = block.getActualPoints();
        if (points.find(p => this._pile.getPoint(p.getX(), p.getY()))) {
            block.rotate(1);
            return false;
        }
        else if (points.find(p => p.getX() < 0)) {
            block.rotate(1);
            block.moveRight();
            return true;
        }
        else if (points.find(p => p.getX() > this._width - 1)) {
            block.rotate(1);
            block.moveLeft();
            return true;
        }
        else if (points.find(p => p.getY() > this._height - 1)) {
            block.rotate(1);
            block.moveUp();
            return true;
        }
        else {
            block.rotate(1);
            return true;
        }
    }

    reduceFullRows() {
        let yArr = [];
        let allPoints = this.getMatrix();
        for (let row of allPoints) {
            let isFull = true;
            for (let p of row) {
                if (!this._pile.getPoint(p.getX(), p.getY())) {
                    isFull = false;
                    break;
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
        return this._pile.getTopY() <= 0 ? true : false;
    }

    setActiveBlock(block: Block) {
        this._activeBlock = block;
    }

    moveBlockToLeft(step: number = 1) {
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
            if (this._canMoveRight(this._activeBlock)) {
                this._activeBlock.moveRight(step);
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

    getMatrix(): Array<Array<Point>> {
        let rows: Array<Array<Point>> = [];
        for (let y = 0; y < this._height; y++) {
            let columns: Array<Point> = [];
            for (let x = 0; x < this._width; x++) {
                let blockPoint: Point;
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

    getNextBlock() {
        let obj = Object.create(this._nextBlock);
        Object.assign(obj, this._activeBlock);
        return obj;
    }

}

export default Ground;