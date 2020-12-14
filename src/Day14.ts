import {loadFile} from "./Utils";

export function getAddressesFromMask(mask: string, keyBitString: string) {
    let addresses: string[] = [];
    let floatingCount: number = 0;

    // Apply mask to address
    for (let i = 0; i < keyBitString.length; i++) {
        if (mask[i] === "1") {
            keyBitString = keyBitString.substr(0, i) + "1" + keyBitString.slice(i + 1);
        }
        else if (mask[i] === "X") {
            keyBitString = keyBitString.substr(0, i) + mask[i] + keyBitString.slice(i + 1);
            floatingCount++;
        }
    }

    // find all valid addresses
    for (let j = 0; j < Math.pow(2, floatingCount); j++) {
        let newAddresBitString = keyBitString;
        let replacement: string = j.toString(2).padStart(floatingCount, "0");
        for (let char of replacement) {
            let index: number = newAddresBitString.indexOf("X");
            newAddresBitString = newAddresBitString.substr(0, index) + char + newAddresBitString.slice(index + 1);
        }
        addresses.push(newAddresBitString);
    }

    return addresses;
}

let input: string[];
input = loadFile("inputs/Day14.txt", "\n");

let part1: number = 0;
let part2: number = 0;

let mask: string = "";
let memory = new Map<string, number>();

for (var ins of input) {
    let line: string[] = ins.split(/ |\[|\]|=/).filter(x => x !== "");

    if (line[0] === "mask"){
        mask = line[1];
        continue;
    }

    let valueBitString: string = parseInt(line[2]).toString(2).padStart(36, "0");
    for (let i = 0; i < valueBitString.length; i++) {
        if (mask[i] !== "X") {
            valueBitString = valueBitString.substr(0, i) + mask[i] + valueBitString.slice(i + 1);
        }
    }

    memory.set(line[1], parseInt(valueBitString, 2));
}

memory.forEach((value: number, key: string) => {
    part1+=value;
});

// Part 2
memory.clear();

for (var ins of input) {
    let line: string[] = ins.split(/ |\[|\]|=/).filter(x => x !== "");

    if (line[0] === "mask"){
        mask = line[1];
        continue;
    }

    let valueBitString: string = parseInt(line[2]).toString(2).padStart(36, "0");
    let keyBitString: string = parseInt(line[1]).toString(2).padStart(36, "0");

    const addesses: string[] = getAddressesFromMask(mask, keyBitString);

    for (let address of addesses) {
        memory.set(address, parseInt(valueBitString, 2));
    }
}

memory.forEach((value: number, key: string) => {
    part2+=value;
});

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");