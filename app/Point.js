class Point {

    constructor(x = -1, y = -1, color = null) {
        this._x = x;
        this._y = y;
        this._color = color;
    }

    _x = -1;
    _y = -1;
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