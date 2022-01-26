import Pile from './Pile.js';
import Point from './Point.js';

class Ground {

    constructor(activeBlock, w = 10, h = 20) {
        this._height = h;
        this._width = w;
        this._pile = new Pile();
        this._activeBlock = activeBlock;
    }

    _height = 0;
    _width = 0;
    _activeBlock = null;
    _pile = null;

    _canMoveToLeft(points, step) {
        return step > 0 && !points.find(p => p.getX() - step < 0) && !points.find(p => this._pile.getPoint(p.getX() - step, p.getY()));
    }

    _canMoveToRight(points, step) {
        return step > 0 && !points.find(p => p.getX() + step > this._width) && !points.find(p => this._pile.getPoint(p.getX() + step, p.getY()));
    }

    _canMoveToDown(points, step) {
        return step > 0 && !points.find(p => p.getY() + step > this.height) && !points.find(p => this._pile.getPoint(p.getX(), p.getY() + step));
    }

    _canRotate(points) {
        return !points.find(p => this._pile.getPoint(p.getY(), 0 - p.getX()));
    }

    addBlock(block) {
        if (!this._activeBlock) {
            this._activeBlock = this._randomBlock();
        }
    }

    moveBlockToLeft(step = 1) {
        step = step >= 0 ? step : 0;
        if (this._canMoveToLeft(this._activeBlock.getPoints(), step)) {
            this._activeBlock.moveToleft(step);
        }
    }

    moveBlockToRight(step = 1) {
        step = step >= 0 ? step : 0;
        if (this._canMoveToRight(this._activeBlock.getPoints(), step)) {
            this._activeBlock.moveToRight(step);
        }
    }

    moveBlockToDown(step = 1) {
        step = step >= 0 ? step : 0;
        if (this._canMoveToDown(this._activeBlock.getPoints(), step)) {
            this._activeBlock.moveToDown(step);
        }
    }

    rotateBlock() {
        if (this._canRotate(this._activeBlock.getPoints())) {
            this._activeBlock.rotate();
        }
    }

    isCrash() {
        let points = this._activeBlock.getPoints();
        return !points.find(p => p.getY() + 1 === this.height) && !points.find(p => this._pile.getPoint(p.getX(), p.getY() + 1));
    }

    getAllPoints() {
        let rows = [];
        for (let y = 0; y < this._height; y++) {
            let columns = [];
            for (let x = 0; x < this._width; x++) {
                let blockPoint = null;
                if (blockPoint = this._activeBlock.getPoints().find(p => p.getX() === x && p.getY() === y)) {
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