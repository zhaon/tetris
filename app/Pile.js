class Pile {

    _points = [];

    reduceRows(yArr) {
        this._points = this._points.filter(p => yArr.indexOf(p.getY()) === -1);
    }

    getTopY() {
        let yArr = this._points.map(p => p.getY());
        return Math.min(...yArr);
    }

    putIn(block) {
        let points = block.getActualPoints();
        this._points = this._points.concat(points);
    }

    getPoint(x, y) {
        return this._points.find(p => p.getX() === x && p.getY() === y);
    }

}

export default Pile;