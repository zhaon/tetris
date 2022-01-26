import Color from "../Color.js";
import Block from "./Block.js";
import Point from '../Point.js'

class OneBlock extends Block {

    constructor(x = 0, y = 0) {
        super(x, y);
        this._points = [
            new Point(-1, 0, Color.BLUE),
            new Point(0, 0, Color.BLUE),
            new Point(1, 0, Color.BLUE),
            new Point(-2, 0, Color.BLUE)
        ];
    }

}

export default OneBlock;