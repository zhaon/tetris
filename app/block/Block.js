import Point from '../Point.js';

class Block {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    _points = [];
    _x = 0;
    _y = 0;

    getPoints() {
        let absolutePoints = [];
        for (let p of this._points) {
            absolutePoints.push(new Point(this._x + p.getX(), this._y + p.getY(), p.getColor()));
        }
        return absolutePoints;
    }

    getLocation() {
        return {
            x: this._x,
            y: this._y
        }
    }

    moveToLeft(offset = 1) {
        _x -= offset;
    }

    moveToRight(offset = 1) {
        _x += offset;
    }

    moveToDown(offset = 1) {
        _y += offset;
    }

    rotate() {
        for (let p of this._points) {
            p.x = p.y;
            p.y = 0 - p.x;
        }
    }

}

export default Block;