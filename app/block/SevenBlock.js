import Color from "../Color.js";
import Block from "./Block.js";
import Point from '../Point.js'

class SevenBlock extends Block {

    constructor(x = 0, y = 0, color = Color.MAGENTA) {
        super(x, y);
        this._points = [
            new Point(1, 0, color),
            new Point(-1, 1, color),
            new Point(0, 1, color),
            new Point(1, 1, color)
        ];
    }

}

export default SevenBlock;