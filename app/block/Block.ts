import Point from '../Point.js';

class Block {

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    _points: Array<Point> = [];
    _x: number = 0;
    _y: number = 0;

    getActualPoints(): Array<Point> {
        let absolutePoints: Array<Point> = [];
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

    moveToPoint(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    moveLeft(step: number = 0) {
        this._x -= step;
    }

    moveRight(step: number = 0) {
        this._x += step;
    }

    moveUp() {
        this._y -= 1;
    }

    moveDown() {
        this._y += 1;
    }

    rotate(direction: number = 0) {
        if (direction === 0) { // 顺时针
            for (let p of this._points) {
                let x = 0 - p.getY();
                let y = p.getX();
                p.setX(x);
                p.setY(y);
            }
        }
        else { // 逆时针
            for (let p of this._points) {
                let x = p.getY();
                let y = 0 - p.getX();
                p.setX(x);
                p.setY(y);
            }
        }

    }

}

export default Block;