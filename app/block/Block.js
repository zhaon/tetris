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

    moveToPoint(x, y) {
        this._x = x;
        this._y = y;
    }

    moveToLeft(step = 1) {
        this._x -= step >= 0 ? step : 0;
    }

    moveToRight(step = 1) {
        this._x += step >= 0 ? step : 0;
    }

    moveToDown(step = 1) {
        this._y += step >= 0 ? step : 0;
    }

    rotate() {
        for (let p of this._points) {
            p.setX(p.getY());
            p.setY(0 - p.getX());
        }
    }

}

export default Block;