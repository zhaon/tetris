import Block from "./block/Block";
import Point from "./Point";

class Pile {

    _points: Array<Point> = [];

    reduceRows(yArr: Array<number>) {
        this._points = this._points.filter(p => yArr.indexOf(p.getY()) === -1);
        for (let y of yArr) {
            for (let p of this._points) {
                if (p.getY() < y) {
                    p.setY(p.getY() + 1);
                }
            }
        }
    }

    getTopY() {
        let yArr = this._points.map(p => p.getY());
        return Math.min(...yArr);
    }

    putIn(block: Block) {
        let points = block.getActualPoints();
        this._points = this._points.concat(points);
    }

    getPoint(x: number, y: number) {
        return this._points.find(p => p.getX() === x && p.getY() === y);
    }

}

export default Pile;