import chalk from "chalk";
import Color from "./Color.js";
import ansiEscapes from "ansi-escapes";

class View {

    static _curMatrix = [];
    static _curScore = 0;
    static _curLevel = 1;
    static _curNextBlock = null;

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

    static render(ground, level, score, isLost, isPause) {
        process.stdout.write(ansiEscapes.cursorHide);
        let newMatrix = ground.getMatrix();
        let nextBlock = ground.getNextBlock();

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

            process.stdout.write(ansiEscapes.cursorTo(23, 1));
            process.stdout.write("Score:");
            process.stdout.write(ansiEscapes.cursorTo(23, 2));
            process.stdout.write(score.toString());

            process.stdout.write(ansiEscapes.cursorTo(23, 3));
            process.stdout.write("Level:");
            process.stdout.write(ansiEscapes.cursorTo(23, 4));
            process.stdout.write(level.toString());

            nextBlock.moveToPoint(26, 8);
            let actualPoints = nextBlock.getActualPoints();
            for (let p of actualPoints) {
                process.stdout.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                process.stdout.write(this._getColor(p.getColor(), '  '));
            }
        }
        else {
            if (isLost) {
                process.stdout.write(ansiEscapes.cursorTo(23, 14));
                process.stdout.write(chalk.red("完犊子了"));
            }
            else {
                process.stdout.write(ansiEscapes.cursorTo(23, 14));
                process.stdout.write(chalk.red("        "));
            }

            if (isPause) {
                process.stdout.write(ansiEscapes.cursorTo(24, 16));
                process.stdout.write(chalk.green("PAUSE"));
            }
            else {
                process.stdout.write(ansiEscapes.cursorTo(24, 16));
                process.stdout.write(chalk.green("     "));
            }

            if (this._curScore !== score) {
                process.stdout.write(ansiEscapes.cursorTo(23, 2));
                process.stdout.write(score.toString());
            }
            if (this._curLevel !== level) {
                process.stdout.write(ansiEscapes.cursorTo(23, 4));
                process.stdout.write(level.toString());
            }

            if (this._curNextBlock) {
                for (let p of this._curNextBlock.getActualPoints()) {
                    process.stdout.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                    process.stdout.write(this._getColor(-1, '  '));
                }
            }
            nextBlock.moveToPoint(26, 8);
            let actualPoints = nextBlock.getActualPoints();
            for (let p of actualPoints) {
                process.stdout.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                process.stdout.write(this._getColor(p.getColor(), '  '));
            }
            this._curNextBlock = nextBlock;

            for (let rIndex in newMatrix) {
                let newRow = newMatrix[rIndex];
                let oldRow = this._curMatrix[rIndex];
                for (let cIndex in newRow) {
                    if (newRow[cIndex].getColor() !== oldRow[cIndex].getColor()) {
                        process.stdout.write(ansiEscapes.cursorTo(1, parseInt(rIndex) + 1));
                        let line = [];
                        for (let p of newRow) {
                            line.push(this._getColor(p.getColor(), '  '));
                        }
                        process.stdout.write(line.join(''));
                        continue;
                    }
                }
            }
        }
        this._curMatrix = newMatrix;
    }

}

export default View;