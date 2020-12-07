import {loadFile} from "./Utils";

interface mapTuple {
    bagColor: string,
    amount: number
}

export function getBags(bagName: string) : number {
    let noOfBags: number = 0;

    rules.get(bagName)?.forEach( x => {
        noOfBags += (x.amount + (x.amount * getBags(x.bagColor)));
    });

    return noOfBags;
}


let input: string[];
input = loadFile("inputs/Day07.txt", "\n");

// let part1: number = 0;
let part2: number = 0;

let rules = new Map<string, mapTuple[]>();
let innerToOuterBagMap = new Map<string, string[]>();
let rule: string[] = [];
let firstbagRegex: RegExp = /^([a-zA-Z ]*) bags contain ([0-9]*) ([a-zA-Z ]*) bags?[,|.]?$/;
let otherbagsRegex: RegExp = /^ *([0-9]*) ([a-zA-Z ]*) bags?[,|.]?$/;

input.forEach((line: string) => {
    rule = line.split(",");

    let matches: string[] = rule[0].match(firstbagRegex);

    if (matches !== null) {
        let rulesToAdd: mapTuple[] = [];
        const keyBagName: string = matches[1];
        rulesToAdd.push({bagColor: matches[3], amount: parseInt(matches[2])});
        
        for (let i:number = 1; i < rule.length; i++) {
            matches = rule[i].match(otherbagsRegex);
            rulesToAdd.push({bagColor: matches[2], amount: parseInt(matches[1])})
        }

        if (!rules.has(keyBagName)) {
            rules.set(keyBagName, rulesToAdd);
        }
        else {
            rules.set(keyBagName, rulesToAdd.concat(rules.get(keyBagName)));
        }

        rulesToAdd.forEach( x => {
            if (!innerToOuterBagMap.has(x.bagColor)) {
                innerToOuterBagMap.set(x.bagColor, [keyBagName]);
            }
            else {
                let newArray: string[] = innerToOuterBagMap.get(x.bagColor);
                newArray.push(keyBagName);
                innerToOuterBagMap.set(x.bagColor, newArray);
            }
        });
    }
});

let visited = new Set<string>();
let unvisited = new Array<string>();

// part 1
const bagWeHave: string = "shiny gold";

innerToOuterBagMap.get(bagWeHave).forEach( x => unvisited.push(x));

while (unvisited.length !== 0) {
    let currentBag: string = unvisited.pop();
    visited.add(currentBag);

    innerToOuterBagMap.get(currentBag)?.forEach( x =>  {
        if (!visited.has(x)) {
            unvisited.push(x);
        }});
}

part2 = getBags(bagWeHave);

// part 1
console.log("********************************************");
console.log("Part 1: "+visited.size);
console.log("Part 2: "+part2);
console.log("********************************************");
