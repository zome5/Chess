'use strict'

import {
    kuńAvailableSquares,
    goniecAvailableSquares
} from "./movePatterns.js"

const board = document.querySelector('.board')
const filesContainer = document.querySelector('.files-container');
const ranksContainer = document.querySelector('.ranks-container');
const notation = {
    files: ['a', 'b', 'c', 'd', 'e','f','g','h'],
    ranks: ['1', '2', '3', '4', '5', '6','7','8'].reverse()
}
let beingDragged = '';


buildBoard(8, 8);
const squares = Array.from(document.querySelectorAll('.square'))
colorTheBoard();

export const kuń = createPiece('kuń', '&#9816;', 'b3');

export const goniec = createPiece('goniec', '&#9815;', 'd3');



function createSquare(indexOfSquare) {
    const squareElement = document.createElement('div');
    const setSquareNotationAsId = () => {
        const indexOfFile = indexOfSquare % notation.files.length // -> 0,0,0,0,0,1,1,1,1,1,2,2,2,2,2, ...  
        const indexOfRank = Math.floor(indexOfSquare / notation.files.length) // 1,2,3,4,5,1,2,3,4,5,1,2,3,4,5...
        return notation.files[indexOfFile] + notation.ranks[indexOfRank];
    }
    squareElement.classList.add('square');
    squareElement.setAttribute('id', `${setSquareNotationAsId()}`);
    return squareElement
}

function buildBoard(numOfFiles, numOfRanks) {
    const numOfSquares = numOfFiles * numOfRanks;
    for (let i = 0; i < numOfSquares; i++) {
        board.appendChild(createSquare(i));
        if (i % 8 === 0) { // <-- executes each 5th iteration...
            //                <-- ..., adds notation
            ranksContainer.innerHTML += `<span>${notation.ranks[i / 8]}</span>`
            filesContainer.innerHTML += `<span>${notation.files[i / 8]}</span>`
        }
    }
}


function colorTheBoard(lightSquareColor, darkSquareColor) {
    squares.forEach((square, index) => {
        const column = index % 8; // 8 squares per row
        const row = Math.floor(index / 8);

        const isEvenRow = row % 2 === 0;
        const isEvenColumn = column % 2 === 0;

        if ((isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn)) {
            square.classList.add('light-square')
        } else {
            square.classList.add('dark-square')
        }
    });
}

function createPiece(name, unicode, startingSquareId) {
    const startingSquare = document.getElementById(startingSquareId);
    const pieceElement = document.createElement('span');
    pieceElement.classList.add('piece', name);
    pieceElement.innerHTML = unicode
    pieceElement.setAttribute('draggable', true);
    startingSquare.appendChild(pieceElement);
    return pieceElement
}

function dragDropPiece(piece, pieceAvailableSquares) {

    piece.addEventListener('dragstart', (e) => {
        const availableSquares = pieceAvailableSquares();
        e.dataTransfer.setData('text/plain', '');
        beingDragged = e.target;
        beingDragged.classList.add('dragged')
        availableSquares.forEach(square => {
            const currentSquareElement = document.getElementById(square);
            currentSquareElement.classList.add('highlighted')
        })
    })
    piece.addEventListener('dragend', () => {
        beingDragged.classList.remove('dragged');
        beingDragged = null;
        squares.forEach(square => {
            square.classList.remove('highlighted')
        })
    });
    dragDropSquares( pieceAvailableSquares)
}

function dragDropSquares(pieceAvailableSquares) {
    squares.forEach(square => {
        square.addEventListener('dragover', (e) => {
            e.preventDefault();
        })
        square.addEventListener('drop', (e) => {
            const availableSquares = pieceAvailableSquares();
            if (e.target.offsetParent === beingDragged.offsetParent || beingDragged === '') return;
            if (availableSquares.indexOf(square.id) !== -1) {
                e.target.appendChild(beingDragged)
            }
        })
    })
}

dragDropPiece(kuń, kuńAvailableSquares);
dragDropPiece(goniec, goniecAvailableSquares);