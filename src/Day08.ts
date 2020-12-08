import {loadFile} from "./Utils";

interface returnVal {
    isInfiniteLoop: boolean,
    value: number
}

export function doesTerminate(newInstructions: string[]): returnVal {

    let currentInstruction: string[] = [];
    let currentInstructionNo: number = 0;
    let accumulator: number = 0;
    let modifier: number = 1;
    let value: number = 0;
    let seenInstructions = new Set<number>();

    while (true) {
        if (seenInstructions.has(currentInstructionNo)) {
            return { isInfiniteLoop: true,  value: accumulator };
        }

        if (currentInstructionNo >= newInstructions.length) {
            return { isInfiniteLoop: false,  value: accumulator };
        }
    
        seenInstructions.add(currentInstructionNo);
        currentInstruction = newInstructions[currentInstructionNo].split(" ");
        
        modifier = (currentInstruction[1].startsWith("-") ? -1 : 1);
        value = +currentInstruction[1].substr(1);
    
        switch (currentInstruction[0]) {
            case "nop": {
                currentInstructionNo++;
                break;
            }
    
            case "acc": {
                accumulator += modifier * value;
                currentInstructionNo++;
                break;
            }
    
            case "jmp": {
                currentInstructionNo += modifier * value;
                break;
            }
        }
    }
}


let input: string[];
input = loadFile("inputs/Day08.txt", "\n");

// let part1: number = 0;
let part2: number = 0;

let instructions: string[] = [];
let changedInstructionNo: number = 0;

input.forEach((line: string) => {
    instructions.push(line);
});

let oldIns: string = ""

for (changedInstructionNo = 0; changedInstructionNo < instructions.length; changedInstructionNo++) {

    oldIns = instructions[changedInstructionNo];
    if (instructions[changedInstructionNo].includes("nop")) {
        instructions[changedInstructionNo] = instructions[changedInstructionNo].replace("nop", "jmp");
    }
    else if (instructions[changedInstructionNo].includes("jmp")) {
        instructions[changedInstructionNo] = instructions[changedInstructionNo].replace("jmp", "nop");
    }
    else {
        continue;
    }

    // console.log("changing instruction " + oldIns+ " to " + instructions[changedInstructionNo] );
    let result: returnVal = doesTerminate(instructions);

    instructions[changedInstructionNo] = oldIns;

    if (!result.isInfiniteLoop) {
        part2 = result.value;
        break;
    }
}

// part 1
console.log("********************************************");
console.log("Part 1: ", doesTerminate(instructions).value);
console.log("Part 2: ",part2);
console.log("********************************************");