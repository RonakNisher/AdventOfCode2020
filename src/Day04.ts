import {loadFile} from "./Utils";

export function isValueValid(data: string[]): boolean {

    switch (data[0]) {
        case birthYear: {
            let byr: number = parseInt(data[1]);

            return (byr >= 1920 && byr <= 2002);
        }

        case issueYear: {
            let iyr: number = parseInt(data[1]);

            return (iyr >= 2010 && iyr <= 2020);
        }

        case expirationYear: {
            let eyr: number = parseInt(data[1]);

            return (eyr >= 2020 && eyr <= 2030);
        }

        case height: {
            let unit: string = data[1].substr(data[1].length - 2).trim();
            let value: number = parseInt(data[1].substr(0, data[1].length - 2));

            // console.log("Height is " + value + " " + unit);

            if (unit === "cm")
                return (value >= 150 && value <= 193);
            else if (unit === "in")
                return (value >= 59 && value <= 76)
            else 
                return false
        }

        case hairColor: {
            let regExp = /^#[0-9a-f]{6}$/;
            return regExp.test(data[1]);
        }

        case eyeColor: {
            let regExp = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
            return regExp.test(data[1]);
        }

        case passportId: {
            let regExp = /^[0-9]{9}$/;

            return regExp.test(data[1]);
        }
    }

    return true;
}

export function isPassportValid(data: string, isPart2: boolean): boolean {

    console.log("------------------");
    console.log(data);

    const passportFieldChunks: string[] = data.split(" ");
    const passportFields: string[] = [];

    for (var passportData in passportFieldChunks) {
        let pd: string[] = passportFieldChunks[passportData].split(":");
        passportFields.push(pd[0]);

        if (isPart2 && !isValueValid(pd)) {
            console.log("invalid due to " + pd);
            return false;
        }
    }

    return (passportFields.length === 8 || (!passportFields.includes(countryId) && passportFields.length === 7));
}

let input: string[];
input = loadFile("inputs/Day04.txt", "\n");

const birthYear: string = "byr";
const issueYear: string = "iyr";
const expirationYear: string = "eyr";
const height: string = "hgt";
const hairColor: string = "hcl";
const eyeColor: string = "ecl";
const passportId: string = "pid";
const countryId: string = "cid";

let validPassportCount: number = 0;
let validPassportCountPart2: number = 0;
let batch: string = "";

input.forEach((line: string) => {

    if (line === "") {
        if (isPassportValid(batch.trim(), false)) {
            validPassportCount++;
            // console.log("valid");
        }

        if (isPassportValid(batch.trim(), true)) {
            validPassportCountPart2++;
            // console.log("valid");
        }

        batch = "";
    }
    else {
        batch+=line;
        batch+=" ";
    }
});

if (isPassportValid(batch.trim(), false)) {
    validPassportCount++;
}

if (isPassportValid(batch.trim(), true)) {
    validPassportCountPart2++;
}


// part 1
console.log("********************************************");
console.log("Part 1: "+validPassportCount);
console.log("Part 2: "+validPassportCountPart2);
console.log("********************************************");
