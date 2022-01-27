import Color from './Color.js';

class Point {

    constructor(x = 0, y = 0, color = Color.GRAY) {
        this._x = x;
        this._y = y;
        this._color = color;
    }

    _x = 0;
    _y = 0;
    _color = null;

    getX() {
        return this._x;
    }

    setX(x) {
        this._x = x;
    }

    getY() {
        return this._y;
    }

    setY(y) {
        this._y = y;
    }

    getColor() {
        return this._color;
    }

    setColor(c) {
        this._color = c;
    }

}

export default Point;