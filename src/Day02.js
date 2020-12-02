"use strict";
exports.__esModule = true;
var Utils_1 = require("./Utils");
var input;
input = Utils_1.loadFile("inputs/Day02.txt", "\n");
console.log(input.length);
var inp = [];
var validPassword = 0;
input.forEach(function (line) {
    console.log(line);
    inp = line.split(" -:");
    console.log(inp);
    // const minLen: number = parseInt(inp[0]);
    // const maxLen: number = parseInt(inp[1]);
    // const char: string = inp[2];
    // const pwd: string = inp[3];
    // const password: string[] = pwd.split("");
    // let charCount: number = 0;
    // password.forEach(c => {
    //     if (c === char) {
    //         charCount++;
    //     }
    // });
    // if (charCount >= minLen && charCount <= maxLen) {
    //     validPassword++;
    // }
});
console.log(validPassword);
