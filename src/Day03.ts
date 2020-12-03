import {loadFile} from "./Utils";


export function calculateNoOfTrees(slopeCol: number, slopeRow: number): number {
    let noOfTrees: number = 0;
    let currentRow: number = 0;
    let currentCol: number = 0;

    while(currentRow < rowSize) {
        if (map[currentRow].charAt(currentCol % colSize) === tree) {
            noOfTrees++;
        }
    
        currentCol+=slopeCol;
        currentRow+=slopeRow;    
    }

    // console.log("no of trees " + noOfTrees)
    return noOfTrees;
}

let input: string[];
input = loadFile("inputs/Day03.txt", "\n");
// console.log(input.length);


let map: string[] = [];
let i: number = 0;
input.forEach((line: string) => {
    map[i++] = line;
});

// console.log("max rows "+map.length + " columns " + map[0].length);

// find no of trees
let colSize: number = map[0].length;
let rowSize: number = map.length;

const tree: string = "#";
const snow: string = ".";

const slopeCol: number[] = [1, 3, 5, 7, 1];
const slopeRow: number[] = [1, 1, 1, 1, 2];

// part 1
console.log("Part 1: "+calculateNoOfTrees(3, 1));

// part 2
let part2: number = 1;
for (let i: number = 0; i < slopeCol.length; i++) {
    part2 *= calculateNoOfTrees(slopeCol[i], slopeRow[i]);
}

console.log("part 2: " + part2);
