import { loadFile } from "./Utils";

export function getLoopSize(publicKey: number) : number {

    let value: number = 1;
    let subjectNumber: number = 7;
    let loopSize: number = 0;

    while (true) {
        if (value === publicKey)
            break;

        value *= subjectNumber;
        value = value % 20201227;
        loopSize++;
    }

    return loopSize;
}

let part1: number = 1;

let input: string[];
input = loadFile("inputs/Day25.txt", "\n");

let cardPublicKey: number = parseInt(input[0]);
let doorPublicKey: number = parseInt(input[1]);


let cardLoopSize = getLoopSize(cardPublicKey);

let value: number = 1;
for (let i = 0; i < cardLoopSize; i++)  {
    part1 *= doorPublicKey;
    part1 = part1 % 20201227;
}

// getLoopSize(cardPublicKey);

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("********************************************");