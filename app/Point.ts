import Color from './Color.js';

class Point {

    constructor(x: number = 0, y: number = 0, color: number = Color.GRAY) {
        this._x = x;
        this._y = y;
        this._color = color;
    }

    _x: number = 0;
    _y: number = 0;
    _color: number = 0;

    getX(): number {
        return this._x;
    }

    setX(x: number) {
        this._x = x;
    }

    getY(): number {
        return this._y;
    }

    setY(y: number) {
        this._y = y;
    }

    getColor(): number {
        return this._color;
    }

    setColor(c: number) {
        this._color = c;
    }

}

export default Point;