import {loadFile} from "./Utils";

export function getNumber(pass: string, min: number, max: number): number {

    let mid: number =  Math.floor((min + max)/ 2);
    for (var ch of pass) {
        if (ch === "F" || ch === "L") {
            max = mid;
        }
        else {
            min = mid + 1;
        }

        mid = Math.floor((min + max) / 2);
    }

    return mid;
}

let input: string[];
input = loadFile("inputs/Day05.txt", "\n");

let part1: number = 0;
let part2: number = 0;
let row: number = 0;
let seat: number = 0;

let seatIds: number[] = [];

input.forEach((line: string) => {

    row = getNumber(line.substr(0, 7), 0, 127);
    // console.log("row is " + row);

    seat = getNumber(line.substr(7), 0, 7);
    // console.log("seat is " + seat);

    const seatId: number = (8 * row) + seat;

    seatIds.push(seatId);

    if (part1 < seatId) {
        part1 = seatId;
    }
});


let sortedSeatIds: number[] = seatIds.sort((n1, n2) => n1 - n2);

let prev: number = sortedSeatIds[0];
for (let i: number = 1; i < sortedSeatIds.length; i++) {
    if ((prev + 1) === (sortedSeatIds[i] - 1)) {
        part2 = prev + 1;
    }
    prev = sortedSeatIds[i];
}

// part 1
console.log("********************************************");
console.log("Part 1: "+part1);
console.log("Part 2: "+part2);
console.log("********************************************");
