import Color from "../Color";
import Block from "./Block";
import Point from '../Point'

class MirroringZBlock extends Block {

    constructor(x = 0, y = 0, color = Color.CYAN) {
        super(x, y);
        this._points = [
            new Point(0, -1, color),
            new Point(1, -1, color),
            new Point(-1, 0, color),
            new Point(0, 0, color)
        ];
    }

}

export default MirroringZBlock;