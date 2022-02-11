import chalk from "chalk";
import Color from "./Color.js";
import ansiEscapes from "ansi-escapes";

class View {

    static _curMatrix = [];

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

    static render2(ground, level, score, nextBlock) {

        process.stdout.write(ansiEscapes.clearTerminal);
        process.stdout.write('+--------------------+---------+\n');
        for (let row of ground.getMatrix()) {
            let line = [];
            for (let p of row) {
                line.push(this._getColor(p.getColor(), '  '));
            }
            process.stdout.write('|' + line.join('') + '|' + '         |\n');
        }
        process.stdout.write('+--------------------+---------+\n');
    }

    static render(ground, level, score, nextBlock) {
        process.stdout.write(ansiEscapes.cursorHide);
        let newMatrix = ground.getMatrix();
        if (this._curMatrix.length === 0) {
            process.stdout.write(ansiEscapes.clearScreen);
            process.stdout.write('+--------------------+---------+\n');
            for (let row of newMatrix) {
                let line = [];
                for (let p of row) {
                    line.push(this._getColor(p.getColor(), '  '));
                }
                process.stdout.write('|' + line.join('') + '|' + '         |\n');
            }
            process.stdout.write('+--------------------+---------+\n');
        }
        else {
            for (let rIndex in newMatrix) {
                let newRow = newMatrix[rIndex];
                let oldRow = this._curMatrix[rIndex];
                for (let cIndex in newRow) {
                    if (newRow[cIndex].getColor() !== oldRow[cIndex].getColor()) {
                        process.stdout.write(ansiEscapes.cursorTo(0, parseInt(rIndex) + 1));
                        let line = [];
                        for (let p of newRow) {
                            line.push(this._getColor(p.getColor(), '  '));
                        }
                        process.stdout.write('|' + line.join('') + '|' + '         |');
                        continue;
                    }
                }
            }
        }
        this._curMatrix = newMatrix;
    }

}

export default View;