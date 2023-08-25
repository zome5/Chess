'use strict'

import {
    kuń,
    goniec
} from "./main.js"

const board = document.querySelector('.board')
const filesContainer = document.querySelector('.files-container');
const ranksContainer = document.querySelector('.ranks-container');
const notation = {
    files: ['a', 'b', 'c', 'd', 'e','f','g','h'],
    ranks: ['1', '2', '3', '4', '5', '6','7','8'].reverse()
}

export function kuńAvailableSquares() {
    const currentPosition = kuń.parentElement.id;
    const currentFile = currentPosition.split('')[0];
    const currentRank = +currentPosition.split('')[1];
    const currentFileIdx = notation.files.indexOf(currentFile);
    const arrayOfAvailableSquares = [];
    const calculateSquare = (moveSideways, moveVertical) => {
        const avaiableMoveFile = currentFileIdx + (moveSideways);
        const avaiableMoveRank = currentRank - (moveVertical);
        if (notation.files[avaiableMoveFile] === undefined || !notation.ranks.includes("" + avaiableMoveRank)) {
            return;
        } else {
            arrayOfAvailableSquares.push(`${notation?.files[avaiableMoveFile]}${avaiableMoveRank}`);
        }
    }
    calculateSquare(1, -2);
    calculateSquare(2, -1);
    calculateSquare(2, 1);
    calculateSquare(1, 2);
    calculateSquare(-1, 2);
    calculateSquare(-2, 1);
    calculateSquare(-2, -1);
    calculateSquare(-1, -2);
    return arrayOfAvailableSquares;
}

export function goniecAvailableSquares() {
    const currentPosition = goniec.parentElement.id;
    const currentFile = currentPosition.split('')[0];
    const currentFileIdx = notation.files.indexOf(currentFile);
    const currentRank = +currentPosition.split('')[1];
    const currentRankIdx = notation.ranks.indexOf("" + currentRank);

    const arrayOfAvailalbeMoves = [];
    const oneStep = (horizontal, vertical, idx) => {
        let file = '';
        let rank = '';
        if (horizontal === 'right') {
            file = notation.files[currentFileIdx + idx]
        } else if (horizontal === 'left') {
            file = notation.files[currentFileIdx - idx]
        }
        if (vertical === 'up') {
            rank = notation.ranks[currentRankIdx - idx]
        } else if (vertical === 'down') {
            rank = notation.ranks[currentRankIdx + idx]
        }
        if (file === undefined || rank === undefined) return null;
        else {
            return file + rank;
        }
    }

    const fillAvaiableMovesArray = (horizontal, vertical) => {
        let nextSquareIsEmpty = true;
        let i = 1;
        while (nextSquareIsEmpty === true) {

            const result = oneStep(horizontal, vertical, i);

            if (result === null) nextSquareIsEmpty = false;
            else {
                arrayOfAvailalbeMoves.push(result)
            };
            i++;
        }
    }
    fillAvaiableMovesArray('left', 'down');
    fillAvaiableMovesArray('right', 'up');
    fillAvaiableMovesArray('left', 'up');
    fillAvaiableMovesArray('right', 'down');

    return arrayOfAvailalbeMoves

}