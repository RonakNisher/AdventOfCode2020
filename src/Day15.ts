import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day15.txt", "\n");

let part1: number = 0;
let part2: number = 0;

let memory = new Map<number, Array<number >>();

let currentTurn: number = 1;
let prevNumberSpoken: number = -1;
let nextNumberSpoken: number = 0;

input[0].split(",").forEach( x => {
    let v: number = parseInt(x);
    memory.set(v, [currentTurn]);
    prevNumberSpoken = v;
    currentTurn++;
});

while (currentTurn <= 30000000) {

    if (memory.has(prevNumberSpoken)) {
        let val: Array<number> = memory.get(prevNumberSpoken);
        if (val.length === 1) {
            nextNumberSpoken = 0;
        }
        else if (val.length === 2) {
            nextNumberSpoken = val[1] - val[0];
        }
    }
    else {
        nextNumberSpoken = 0;
    }

    if (memory.has(nextNumberSpoken)){

        let current:Array<number> = memory.get(nextNumberSpoken);
        if (current.length === 2) {
            current[0] = current[1];
            current[1] = currentTurn;
        }
        else {
            current.push(currentTurn);
        }

        memory.set(nextNumberSpoken, current);
    }
    else {
        memory.set(nextNumberSpoken, [currentTurn]);
    }

    prevNumberSpoken = nextNumberSpoken;

    if (currentTurn === 2020) {
        part1 = prevNumberSpoken;
    }

    currentTurn++;
}

part2 = prevNumberSpoken;

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");