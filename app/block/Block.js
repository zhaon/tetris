import Point from '../Point.js';

class Block {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    _points = [];
    _x = 0;
    _y = 0;

    getActualPoints() {
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

    moveLeft() {
        this._x -= 1;
    }

    moveRight() {
        this._x += 1;
    }

    moveUp() {
        this._y -= 1;
    }

    moveDown() {
        this._y += 1;
    }

    rotate() {
        for (let p of this._points) {
            let x = 0 - p.getY();
            let y = p.getX();
            p.setX(x);
            p.setY(y);
        }
    }

}

export default Block;