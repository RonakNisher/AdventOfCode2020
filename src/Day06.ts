import {loadFile} from "./Utils";


let input: string[];
input = loadFile("inputs/Day06.txt", "\n");

let part1: number = 0;
let part2: number = 0;
let batchStarted: boolean = false;

let questions = new Set<string>();
let questionsPart2 = new Set<string>();

input.forEach((line: string) => {

    if (line === "") {
        // end of batch
        part1 += questions.size;
        questions.clear();

        part2+=questionsPart2.size;
        questionsPart2.clear();

        batchStarted = false;
    }
    else {
        for (let qs of line) {
            questions.add(qs);
        }

        if (!batchStarted && questionsPart2.size === 0) {
            [...line].forEach(x => questionsPart2.add(x));
            batchStarted = true;
        }
        else{
            [...line].forEach(x => { 
                if(!questionsPart2.has(x)) 
                    {questionsPart2.delete(x) }
            });

            [...questionsPart2].forEach(x => { 
                if(!line.includes(x)) 
                    {questionsPart2.delete(x) }
            });
        }
    }
});

part1 += questions.size;
part2 += questionsPart2.size;

// part 1
console.log("********************************************");
console.log("Part 1: "+part1);
console.log("Part 2: "+part2);
console.log("********************************************");
