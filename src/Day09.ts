import {loadFile} from "./Utils";

export function checkIfValid(start: number, sum: number): boolean {
    for (let i: number = 0; i < preambleLength - 1; i++) {
        for (let j: number = i + 1; j < preambleLength; j++) {
            if (sum === instructions[start + i] + instructions[start + j]) {
                return true;
            }
        }
    }
    return false;
}

export function getContiguousNumbers(sum: number) : number {

    let currentStart: number = 0;
    let currentEnd: number = 0;
    let currentSum: number = 0; 
    
    while (true) {
        if (currentSum === sum) {
            const contiguousReults: number[] = instructions.slice(currentStart, currentEnd);
            return Math.min(...contiguousReults) + Math.max(...contiguousReults);
        }
        else if (currentSum < sum) {
            currentSum += instructions[currentEnd++];
        }
        else {
            currentSum-=instructions[currentStart++]; 
        }
    }
}


let input: string[];
input = loadFile("inputs/Day09.txt", "\n");

let part1: number = 0;
let part2: number = 0;

let instructions: number[] = [];

input.forEach((line: string) => {
    instructions.push(parseInt(line));
});

const preambleLength: number = 25; // make 25 for final problem

for (let start: number = preambleLength; start < instructions.length; start++) {

    if (!checkIfValid(start - preambleLength, instructions[start])){
        part1 = instructions[start];
        break;
    }
}

// part 2
part2 = getContiguousNumbers(part1);

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");