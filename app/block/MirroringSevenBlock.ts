import Color from "../Color";
import Block from "./Block";
import Point from '../Point'

class MirroringSevenBlock extends Block {

    constructor(x = 0, y = 0, color = Color.BLUE) {
        super(x, y);
        this._points = [
            new Point(-1, 0, color),
            new Point(-1, 1, color),
            new Point(0, 1, color),
            new Point(1, 1, color)
        ];
    }

}

export default MirroringSevenBlock;