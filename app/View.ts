import chalk from "chalk";
import Color from "./Color.js";
import ansiEscapes from "ansi-escapes";
import Ground from "./Ground.js";
import Block from "./block/Block.js";
import Point from "./Point.js";

class View {

    static _curMatrix: Array<Array<Point>> = [];
    static _curScore: number = 0;
    static _curLevel: number = 1;
    static _curNextBlock: Block;
    static stdOut: any = process.stdout;
    static _getColor(color: number, content: string) {
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

    static render(ground: Ground, level: number, score: number, isLost: boolean, isPause: boolean) {
        this.stdOut.write(ansiEscapes.cursorHide);
        let newMatrix = ground.getMatrix();
        let nextBlock = ground.getNextBlock();

        if (this._curMatrix.length === 0) {
            this.stdOut.write(ansiEscapes.clearScreen);
            this.stdOut.write('+--------------------+---------+\n');
            for (let row of newMatrix) {
                let line = [];
                for (let p of row) {
                    line.push(this._getColor(p.getColor(), '  '));
                }
                this.stdOut.write('|' + line.join('') + '|' + '         |\n');
            }
            this.stdOut.write('+--------------------+---------+\n');

            this.stdOut.write(ansiEscapes.cursorTo(23, 1));
            this.stdOut.write("Score:");
            this.stdOut.write(ansiEscapes.cursorTo(23, 2));
            this.stdOut.write(score.toString());

            this.stdOut.write(ansiEscapes.cursorTo(23, 3));
            this.stdOut.write("Level:");
            this.stdOut.write(ansiEscapes.cursorTo(23, 4));
            this.stdOut.write(level.toString());

            nextBlock.moveToPoint(26, 8);
            let actualPoints = nextBlock.getActualPoints();
            for (let p of actualPoints) {
                this.stdOut.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                this.stdOut.write(this._getColor(p.getColor(), '  '));
            }
        }
        else {
            if (isLost) {
                this.stdOut.write(ansiEscapes.cursorTo(23, 14));
                this.stdOut.write(chalk.red("完犊子了"));
            }
            else {
                this.stdOut.write(ansiEscapes.cursorTo(23, 14));
                this.stdOut.write(chalk.red("        "));
            }

            if (isPause) {
                this.stdOut.write(ansiEscapes.cursorTo(24, 16));
                this.stdOut.write(chalk.green("PAUSE"));
            }
            else {
                this.stdOut.write(ansiEscapes.cursorTo(24, 16));
                this.stdOut.write(chalk.green("     "));
            }

            if (this._curScore !== score) {
                this.stdOut.write(ansiEscapes.cursorTo(23, 2));
                this.stdOut.write("        ");
                this.stdOut.write(ansiEscapes.cursorTo(23, 2));
                this.stdOut.write(score.toString());
                this._curScore = score;
            }
            if (this._curLevel !== level) {
                this.stdOut.write(ansiEscapes.cursorTo(23, 4));
                this.stdOut.write("        ");
                this.stdOut.write(ansiEscapes.cursorTo(23, 4));
                this.stdOut.write(level.toString());
                this._curLevel = level;
            }

            if (this._curNextBlock) {
                for (let p of this._curNextBlock.getActualPoints()) {
                    this.stdOut.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                    this.stdOut.write(this._getColor(-1, '  '));
                }
            }
            nextBlock.moveToPoint(26, 8);
            let actualPoints = nextBlock.getActualPoints();
            for (let p of actualPoints) {
                this.stdOut.write(ansiEscapes.cursorTo(p.getX(), p.getY()));
                this.stdOut.write(this._getColor(p.getColor(), '  '));
            }
            this._curNextBlock = nextBlock;

            for (let rIndex in newMatrix) {
                let newRow = newMatrix[rIndex];
                let oldRow = this._curMatrix[rIndex];
                for (let cIndex in newRow) {
                    if (newRow[cIndex].getColor() !== oldRow[cIndex].getColor()) {
                        this.stdOut.write(ansiEscapes.cursorTo(1, parseInt(rIndex) + 1));
                        let line = [];
                        for (let p of newRow) {
                            line.push(this._getColor(p.getColor(), '  '));
                        }
                        this.stdOut.write(line.join(''));
                        continue;
                    }
                }
            }
        }
        this._curMatrix = newMatrix;
    }

}

export default View;