class Pile {

    _points = [];

    getTopY() {
        let yArr = this._points.map(p => p.getY());
        return Math.min(...yArr);
    }

    putIn(points) {
        if (points.find(p => this.getPoint(p.getX(), p.getY()))) {
            this.putIn(points.map(p => p.getY() - 1));
        }
        else if (points.find(p => this.getPoint(p.getX(), p.getY() + 1))) {
            this._points.concat(points);
        }
        else {
            this.putIn(points.map(p => p.getY() + 1));
        }
    }

    getPoint(x, y) {
        return this._points.find(p => p.getX() === x && p.getY() === y);
    }

    reduceRows(yArr) {
        this._points = this._points.filter(p => yArr.indexOf(p.getY()) === -1);
    }

}

export default Pile;