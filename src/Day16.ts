import {loadFile} from "./Utils";

export function checkRules(ticketNo: number, currentField: number) {

    let isInitialValue: boolean = ticketFieldMap.get(currentField) === undefined;

    for (let rule of rules) {
        let ruleConditions = rule[1];
        valid = false;

        for (var condition of ruleConditions) {
            if ((ticketNo >= condition[0] && ticketNo <= condition[1])) {
                valid = true;

                if (!isInitialValue)
                    break;

                let fieldMapValues: Set<string> = ticketFieldMap.get(currentField);
                if (fieldMapValues !== undefined) {
                    fieldMapValues.add(rule[0]);
                }
                else {
                    fieldMapValues = new Set<string>().add(rule[0]);
                }

                ticketFieldMap.set(currentField, fieldMapValues);
                break;
            }
        }

        // looked through all conditions for a rule
        if (!valid) {
            // remove rule name if exists
            if (ticketFieldMap.has(currentField)) {
                let fieldMapValues: Set<string> = ticketFieldMap.get(currentField);
                fieldMapValues.delete(rule[0]);
                ticketFieldMap.set(currentField, fieldMapValues);
            }
        }
    }

}

let input: string[];
input = loadFile("inputs/Day16.txt", "\n\n");

let rulesPart: string[] = input[0].split("\n");
let yourTicketPart: string[] = input[1].split("\n");
let nearbyTicketsPart: string[] = input[2].split("\n");

let part1: number = 0;
let part2: number = 1;

let rules = new Map<string, Array<number[]>>();

for (let rulePart of rulesPart) {
    let rule: string[] = rulePart.split(":").filter(x => x != "");
    let ruleConds: string[] = rule[1].trim().split(/or/).filter(x => x != "");
    let conditions: Array<number[]> = new Array<number[]>();

    for (let i = 0; i < ruleConds.length; i++) {
        conditions.push(ruleConds[i].trim().split("-").filter(x => x != "").map(x => parseInt(x)));
    }

    rules.set(rule[0], conditions);
}

let validNearbyTickets: Array<number[]> = new Array<number[]>();

let valid: boolean = false;

for (let i = 1; i < nearbyTicketsPart.length; i++)
{
    let nearbyTicket = nearbyTicketsPart[i];
    let nearbyTicketSplit: number[] = nearbyTicket.split(",").filter(x => x != "").map(x => parseInt(x));
    for (let ticketNo of nearbyTicketSplit) {
        valid = false;
        for (let ruleConditions of rules.values()) {
            for (var condition of ruleConditions) {
                if ((ticketNo >= condition[0] && ticketNo <= condition[1])) {
                    valid = true;
                    break;
                }
            }
            if (valid) {
                break;
            }
        }
        
        if (!valid) {
            part1 += ticketNo;
            break;
        }
    }

    if (valid) {
        validNearbyTickets.push(nearbyTicketSplit);
    }
}

let ticketFieldMap: Map<number, Set<string>> = new Map<number, Set<string>>();

for (let validTicket of validNearbyTickets) {
    for (let i = 0; i < validTicket.length; i++) {
        let ticketNo: number = validTicket[i];
        checkRules(ticketNo, i);
    }
}

let shouldBreak: boolean = false;
while (!shouldBreak) {
    shouldBreak = true;
    for (let mapKeyVal of ticketFieldMap) {
        if (mapKeyVal[1].size === 1) {
            // delete this entry from all other entries
            for (let keyVal of ticketFieldMap) {
                if (keyVal[0] !== mapKeyVal[0]) {
                    mapKeyVal[1].forEach( x => {
                        if(keyVal[1].delete(x))
                            shouldBreak = false;
                    });
                    ticketFieldMap.set(keyVal[0], keyVal[1]);
                }
            }
        }
    }

    // break;
}

let yourNumbers: number[] = yourTicketPart[1].split(",").filter(x => x != "").map(x => parseInt(x));
for (let keyVal of ticketFieldMap) {

    if ([...keyVal[1]].some(x => x.startsWith("departure"))) {
        part2 *= yourNumbers[keyVal[0]];
    }
}

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");