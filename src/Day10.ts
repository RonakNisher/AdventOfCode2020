import {loadFile} from "./Utils";

export function getValidCombinations(currentJoltage: number): number {

    if (adapters.find(x => x === currentJoltage) === undefined) {
        visited.set(currentJoltage, 0);
        return 0;
    }
    
    if (currentJoltage === maxJoltage) {
        visited.set(currentJoltage, 1);
        return 1;
    }
    
    if (visited.has(currentJoltage)) {
        return visited.get(currentJoltage);
    }
    
    let ret: number = getValidCombinations(currentJoltage + 1) + getValidCombinations(currentJoltage + 2) + getValidCombinations(currentJoltage + 3);
    visited.set(currentJoltage, ret);
    
    return ret;
}


let input: string[];
input = loadFile("inputs/Day10.txt", "\n");

let part1: number = 0;
// let part2: number = 0;

let adapters = input.map(i => parseInt(i)).sort((a, b) => a - b);

const maxJoltage: number = adapters[adapters.length - 1] + 3;
adapters.push(maxJoltage);

let visited = new Map<number, number>();

//part 1
let countOf1DiffAdapters: number = 0;
let countOf3DiffAdapters: number = 0;
let prevJoltage: number = 0;
adapters.forEach(x => {
    if (prevJoltage + 1 === x) {
        prevJoltage = x;
        countOf1DiffAdapters++;
    }
    else if (prevJoltage + 2 === x) {
        prevJoltage = x;
    }
    else if (prevJoltage + 3 === x) {
        prevJoltage = x;
        countOf3DiffAdapters++;
    }
});

part1 = countOf1DiffAdapters * countOf3DiffAdapters;

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", getValidCombinations(1) + getValidCombinations(2)+ getValidCombinations(3));
console.log("********************************************");