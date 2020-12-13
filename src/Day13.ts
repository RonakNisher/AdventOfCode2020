import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day13.txt", "\n");

let part1: number = 0;
let part2: number = 0;

const earlistDepartTime: number = parseInt(input[0]);

let earliestBusId: number = 0;
let earliestBusTime: number = 10000000;

let busIds: number[] = input[1].split(",").filter(x => x !== "x").map(x => parseInt(x));

for (let busId of busIds) {
    let quotient = Math.floor(earlistDepartTime/busId);
    
    if (earliestBusTime > busId*(quotient + 1)) {
        earliestBusId = busId;
        earliestBusTime = busId*(quotient + 1);
    }
}


//part 2
let busIdsString: string[] = input[1].split(",");
let busIdToTimeDiffMap = new Map<number, number>();

let diff: number = 0;
for (let x of busIdsString) {
    if (x !== "x")
        busIdToTimeDiffMap.set(parseInt(x), diff);
    diff++;
}

// Find first number that satisfies our condition for the first 5 numbers.
// this will give us the multiplier that we can use to increment our numbers for brute force
// This is based on the observation that the difference between the numbers that satisfy these constraints equals
// the product of all those numbers
let multiplier: number = 0;
let firstBaseNo: number = 0;
let foundBaseStartNumber: boolean = false;

for (let j: number = 0; j < 500000000; j++) {
    if (j%busIds[0] === 0 
        && (j + busIdToTimeDiffMap.get(busIds[1])) % busIds[1] === 0 
        && (j + busIdToTimeDiffMap.get(busIds[2])) % busIds[2] === 0 
        && (j + busIdToTimeDiffMap.get(busIds[3])) % busIds[3] === 0
        && (j + busIdToTimeDiffMap.get(busIds[4])) % busIds[4] === 0) {

            foundBaseStartNumber = true;
            firstBaseNo = j;
            break;
    }
}

if (foundBaseStartNumber) {
    multiplier = busIds[0] * busIds[1] * busIds[2] * busIds[3] * busIds[4];
}

console.log("firstBaseNo ",firstBaseNo);
console.log("multiplier ",multiplier);

let start: number = 100000000000000;
let currentNumber: number = Math.floor(start/multiplier)*multiplier + firstBaseNo;

let numberFound: boolean = false;

while (!numberFound) {
    numberFound = true;
    for (let busId of busIds) {
        if (!((currentNumber + busIdToTimeDiffMap.get(busId)) % busId === 0)) {
            numberFound = false;
            currentNumber+=multiplier;
            break;
        }
    }
}

console.log("********************************************");
console.log("Part 1: ", earliestBusId * (earliestBusTime - earlistDepartTime));
console.log("Part 2: ", currentNumber);
console.log("********************************************");