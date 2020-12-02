import {loadFile} from "./Utils";

let input: string[];
input = loadFile("inputs/Day01.txt", "\n");
console.log(input.length);

let a: number = 0;
let b: number = 0;
let c: number = 0;
let inp: number[] = [];

input.forEach((line: string) => {
    // console.log(line);
    let no: number = parseInt(line);
    inp.push(no);
});

const len:number = inp.length;
console.log(inp.length + "len of inp");

for (let i: number = 0; i < len; i++)
{
    a = inp[i];
    console.log("a is " + a);
    for (let j:number = i + 1; j < len; j++) {

        b = inp[j];
        for (let k:number = j + 1; k < len; k++) {        
            let n: number = inp[k];
            if (n !== a && n !== b && ((n + a + b) === 2020)) {
                    console.log("found c", n);
                    c = n;
                    break;
                }    
        }

        if (c !== 0)
            break;
    }
    

    if (c !== 0)
        break;
}
console.log('a is' + a +' and b is {b} and a*b is {a*b}' + b + ', ' + a*b*c);


