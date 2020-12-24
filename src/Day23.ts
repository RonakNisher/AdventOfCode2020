import { loadFile } from "./Utils";

interface Node {
    value: number;
    next: number;
}

export function runGame(cupsMap: Map<number, Node>, maxMoves: number, firstCupValue: number, maxCupValue: number): Map <number, Node> {

    let currentCup: number = firstCupValue;

    for (let i = 1; i <= maxMoves; i++) {
        let currentCupNode: Node = cupsMap.get(currentCup);

        let next1: number = currentCupNode.next;
        let next2: number = cupsMap.get(next1).next;
        let next3: Node = cupsMap.get(cupsMap.get(next2).next);

        currentCupNode.next = next3.next;
        cupsMap.set(currentCupNode.value, currentCupNode); // link to the node 4th from current

        posToInsertAfter = currentCupNode.value === 1 ? maxCupValue : currentCupNode.value - 1;

        while (true) {
            if (next1 === posToInsertAfter || next2 === posToInsertAfter || next3.value === posToInsertAfter)
                posToInsertAfter = posToInsertAfter === 1 ? maxCupValue : posToInsertAfter - 1;
            else
                break;
        }

        let posToInsertAfterNode: Node = cupsMap.get(posToInsertAfter);

        next3.next = posToInsertAfterNode.next;
        posToInsertAfterNode.next = next1;

        cupsMap.set(posToInsertAfter, posToInsertAfterNode);
        cupsMap.set(next3.value, next3);

        currentCup = currentCupNode.next;
    }

    return cupsMap;
}

let part1: number = 0;
let part2: number = 0;

let input: string[];
input = loadFile("inputs/Day23.txt", "\n");

let cups = [...input[0].split("").map(x => parseInt(x))].map(Number);
let cupsMapPart1: Map<number, Node> = new Map<number, Node>();
let cupsMapPart2: Map<number, Node> = new Map<number, Node>();

let posToInsertAfter: number = 0;

cups.forEach((v, i) => (cupsMapPart1.set(v, {value: v, next: i === cups.length - 1 ? cups[0] : cups[i + 1]})));

let part1Cups = runGame(cupsMapPart1, 100 /*maxMoves*/, cups[0], 9 /*maxCupValue*/);

let part1Result: string = ""; 
let nextCup: number = part1Cups.get(1).next;
while (nextCup !== 1) {
    part1Result += nextCup;
    nextCup = part1Cups.get(nextCup).next;
}

// Part 2
const maxCupValue: number = 1000000;
cups.forEach((v, i) => (cupsMapPart2.set(v, {value: v, next: i === cups.length - 1 ? cups.length + 1 : cups[i + 1]})));
for (let i = 10; i <= maxCupValue; i++ )
    cupsMapPart2.set(i, { value: i, next: i === maxCupValue ? cups[0] : i + 1 });

let part2Cups = runGame(cupsMapPart2, 10000000 /*maxMoves*/, cups[0], maxCupValue /*maxCupValue*/);

let nodeVal1 = part2Cups.get(1);
part2 = nodeVal1.next * part2Cups.get(nodeVal1.next).next;

console.log("********************************************");
console.log("Part 1: ", part1Result);
console.log("Part 2: ", part2);
console.log("********************************************");