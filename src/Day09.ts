import {loadFile} from "./Utils";

export function checkIfValid(start: number, sum: number): boolean {
    // console.log("sum ", sum);
    for (let i: number = 0; i < preambleLength - 1; i++) {
        for (let j: number = i + 1; j < preambleLength; j++) {
            // console.log(instructions[start + i] +  " + " + instructions[start + j]);
            if (sum === instructions[start + i] + instructions[start + j]) {
                return true;
            }
        }
    }
    return false;
}

export function getContiguousNumbers(sum: number) : number[] {
    let contiguous: number[] = [];

    let currentStart: number = 0;
    let currentStartValue: number = instructions[0];
    let currentEnd: number = 1;
    let currentSum: number = instructions[0] + instructions[1]; 
    contiguous.push(instructions[0]);
    contiguous.push(instructions[1]);
    currentEnd++;
    
    while (true) {
        if (currentSum === sum) {
            break;
        }
        else if (currentSum < sum) {
            contiguous.push(instructions[currentEnd]);
            currentSum += instructions[currentEnd];
        }
        else {
            currentSum = 0;
            currentStart++;
            currentEnd = currentStart + 1;
            currentStartValue = instructions[currentStart];
            currentSum = currentStartValue + instructions[currentEnd];

            contiguous = [];
            contiguous.push(currentStartValue);
            contiguous.push(instructions[currentEnd]);
        }
        
        currentEnd++;
    }

    return contiguous.sort((a, b) => a - b);
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
let contiguousReults: number[] = getContiguousNumbers(part1);
part2 = contiguousReults[0] + contiguousReults[contiguousReults.length - 1];

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");