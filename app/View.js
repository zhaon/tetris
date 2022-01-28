import chalk from "chalk";
import Color from "./Color.js";
import ansiEscapes from "ansi-escapes";

class View {

    _curMatrix = [];

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
                return content;
        }
    }
    static render(ground, level, score, nextBlock) {

        process.stdout.write(ansiEscapes.clearTerminal);
        process.stdout.write('+--------------------+\n');
        for (let row of ground.getMatrix()) {
            let line = [];
            for (let p of row) {
                line.push(this._getColor(p.getColor(), '  '));
            }
            process.stdout.write('|' + line.join('') + '|' + '\n');
        }
        process.stdout.write('+--------------------+\n');
    }

}

export default View;