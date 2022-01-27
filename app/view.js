import chalk from "chalk";
import Color from "./Color.js";


class View {

    static _getColor(color, content) {
        switch (color) {
            case Color.BLUE:
                return chalk.bgBlue(content);
            case Color.CYAN:
                return chalk.bgCyan(content);
            case Color.GREENBRIGHT:
                return chalk.bgGreenBright(content);
            case Color.MAGENTA:
                return chalk.bgMagenta(content);
            case Color.RED:
                return chalk.bgRed(content);
            case Color.YELLOW:
                return chalk.bgYellow(content);
            case Color.YELLOWBRIGHT:
                return chalk.bgYellowBright(content);
            default:
                return chalk.bgGray(content);
        }
    }
    static draw(ground, level, score, nextBlock) {
        console.clear();
        for (let row of ground.getMatrix()) {
            let line = [];
            for (let p of row) {
                line.push(this._getColor(p.getColor(), '  '));
            }
            console.log(line.join(' ') + '\n');
        }
    }

}

export default View;