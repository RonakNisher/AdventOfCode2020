import {loadFile} from "./Utils";

interface returnVal {
    newPosition: number;
    didSucceed: boolean;
}

export function checkWordAgainstRule(ruleNumber: string, word: string, position: number): returnVal {
    let pos: number = position;

    if (/[a-b]/.test(ruleNumber)) {
        if (word.charAt(position) === ruleNumber) {
            return {newPosition: position + 1, didSucceed: true};
        }
        else {
            return {newPosition: position + 1, didSucceed: false};
        }
    }

    let anySubruleMatched: boolean = false;
    let newPosFromSubruleMatched: number = -1;

    for (let subrule of rules.get(parseInt(ruleNumber))) {
        let allRulesMatched: boolean = true;
        pos = position;

        for (let ch of subrule.split(" ")) {
            let ret: returnVal = checkWordAgainstRule(ch, word, pos);
            if (!ret.didSucceed) {
                allRulesMatched = false;
                break;
            }
            else {
                pos = ret.newPosition;
            }
        }

        if (allRulesMatched) {
            anySubruleMatched = true;

            newPosFromSubruleMatched = pos;
            
            if (ruleNumber !== "8" && ruleNumber !== "11") {
                break;
            }
        }
    }

    return { newPosition: newPosFromSubruleMatched, didSucceed: anySubruleMatched };
}


let part1: number = 0;
let part2: number = 0; 

let input: string[];
input = loadFile("inputs/Day19.txt", "\n\n");

let rules: Map<number, string[]> = new Map<number, string[]>();

for (var rule of input[0].split("\n")) {
    let ruleParts: string[] = rule.split(":");

    rules.set(parseInt(ruleParts[0].trim()), ruleParts[1].trim().split(/ \| |\"/).filter(x => x !== ""));
}


part1 = input[1].split("\n").filter(x => {
    let ret = checkWordAgainstRule("0", x, 0);
    return ret.didSucceed && ret.newPosition === x.length;
}).length;

// part 2
// matches should be of the form 41(41)*(41 31)*

rules.set(8, ["42", "42 8"]);
rules.set(11, ["42 31", "42 11 31"]);

part2 = input[1].split("\n").filter(x => {

    let wordToCheck = x; 

    let newPos: number = 0;
    let count42: number = 0;
    let count31: number = 0;
    
    let ret: returnVal = checkWordAgainstRule("42", wordToCheck, newPos);
    
    if (ret.didSucceed) {
        newPos = ret.newPosition;
        count42++;
    }

    // return if first match is not 42
    if (newPos === 0)
        return false;
    
    let has31SuccessStarted: boolean = false;
    let shouldCheckfor42: boolean = true;

    // Count the other matches for 42 and 31
    while (true) {
        if (newPos <= 0 || newPos >= wordToCheck.length) {
            break;
        }

        let ret42 = shouldCheckfor42 ? checkWordAgainstRule("42", wordToCheck, newPos): {didSucceed: false, newPosition: -1};
        let ret31 = checkWordAgainstRule("31", wordToCheck, newPos);

        if (ret42.didSucceed && !ret31.didSucceed) {
            count42++;
            if (has31SuccessStarted) {
                count31 = 0;
                has31SuccessStarted = false;
            }

            newPos = ret42.newPosition;
        }
        else if (!ret42.didSucceed && ret31.didSucceed) {
            count31++;
            has31SuccessStarted = true;
            shouldCheckfor42 = false;
            newPos = ret31.newPosition;
        }
        else if (ret42.didSucceed && ret31.didSucceed){
            count31++;
            count42++;
            has31SuccessStarted = true;
            
            newPos = ret42.newPosition; // 42 and 31 should both have the same length of the matched input
        }
        else {
            if (newPos < wordToCheck.length - 1)
            {
                count31 = 0; //31 should be the last 
            }
            break;
        }
    }

    return count31 !== 0 && ((count42 - 1) >= count31);
}).length;


console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");