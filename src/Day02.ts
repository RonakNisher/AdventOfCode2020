import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day02.txt", "\n");
console.log(input.length);


let inp: string[] = [];
let validPassword: number = 0;
let validPasswordPart2: number = 0;

input.forEach((line: string) => {
    // console.log(line);
    inp = line.split(" ");
    // console.log(inp.length);

    const lenReq: string[] = inp[0].split("-");
    const minLen: number = parseInt(lenReq[0]);
    const maxLen: number = parseInt(lenReq[1]);

    const char: string = inp[1][0];

    const pwd: string = inp[2];
    const password: string[] = pwd.split("");
    let charCount: number = 0;
    let charCountPart2: number = 0;

    for (let i:number = 0; i < password.length; i++) {

        if (password[i] === char) {

            if (i+1 === minLen || i+1 == maxLen) {
                charCountPart2++;
            }

            charCount++;
        }

    }

    if (charCount >= minLen && charCount <= maxLen) {
        validPassword++;
    }

    if (charCountPart2 === 1) {
        validPasswordPart2++;
        console.log(line);
    }
});

console.log("Part 1 "+validPassword);
console.log("Part 2 "+validPasswordPart2);


