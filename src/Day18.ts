import {loadFile} from "./Utils";

interface Dimension {
    x: number;
    y: number;
    z: number;
    w?: number;
}

export function getResult(expr: string): number {
    let stack: Array<string> = new Array<string>();
    let i: number = 0;
    let val: string = expr.charAt(i);
    while (i < expr.length) {

        if (val === " ") {
            val = expr.charAt(++i);
            continue;
        }

        if (val === "+" || val === "*") {
            stack.push(val);
        }
        else if (val === "(") {
            stack.push(val);
        }
        else if (val === ")") {
            // look back and calculate
            let computedValue = stack.pop(); // should be number

            if (stack.pop() !== "(") {
                console.log("no matching (");
            }
            else {
                val = computedValue;
                continue;
            }
        }
        else { // numbers
            if (stack.length === 0) {
                stack.push(val);
                val = expr.charAt(++i);
                continue;
            }

            let computedVal: number = parseInt(val);
            let stackTop: string = stack[stack.length - 1];
            if (stackTop === "+" || stackTop === "*") {
                while (stack.length !== 0 && stackTop !== "(") {
                    let operand: string = stack.pop();
                    computedVal = operand === "+" ? computedVal + parseInt(stack.pop()) : computedVal * parseInt(stack.pop());
                    stackTop = stack[stack.length - 1];
                }

                stack.push(computedVal.toString());
            }
            else if (stackTop === "(") {
                stack.push(val);
            }
            else {
                console.log("unknown top ", stackTop);
                break;
            }
        }

        val = expr.charAt(++i);
    }

    return parseInt(stack.pop());
}

export function getResultPart2(expr: string): number {

    let stack: Array<string> = new Array<string>();
    let i: number = 0;
    let val: string = expr.charAt(i);
    while (i < expr.length) {

        if (val === " ") {
            val = expr.charAt(++i);
            continue;
        }

        if (val === "*") {
            stack.push(val);
        }
        else if(val === "+") {
            if (expr.charAt(i + 2) === "(") {
                stack.push(val);
            }
            else {
                let computedVal: number = (+(expr.charAt(i + 2)) + +(stack.pop()));
                stack.push(computedVal.toString());
                i = i + 2; // because of spaces in the input
            }
        }
        else if (val === "(") {
            stack.push(val);
        }
        else if (val === ")") {
            // look back and calculate
            let computedValue = parseInt(stack.pop()); // should be number
            let stackTop: string = stack[stack.length - 1];

            while (stackTop !== "(") {
                let operand: string = stack.pop();

                if (operand !== "*") {
                    console.log("Something wrong", operand);
                }

                computedValue *= parseInt(stack.pop());
                stackTop = stack[stack.length - 1];
            }

            stack.pop(); //remove the (
            val = computedValue.toString();
            continue;
        }
        else { // numbers
            if (stack.length === 0) {
                stack.push(val);
                val = expr.charAt(++i);
                continue;
            }

            let computedVal: number = parseInt(val);
            let stackTop: string = stack[stack.length - 1];
            if (stackTop === "+") {
                while (stack.length !== 0 && stackTop !== "(" && stackTop !== "*") {
                    let operand: string = stack.pop();
                    computedVal = operand === "+" ? computedVal + parseInt(stack.pop()) : computedVal * parseInt(stack.pop());
                    stackTop = stack[stack.length - 1];
                }

                stack.push(computedVal.toString());
            }
            else if (stackTop === "*") {
                stack.push(val);
            }
            else if (stackTop === "(") {
                stack.push(val);
            }
            else {
                console.log("unknown top ", stackTop);
                break;
            }
        }

        val = expr.charAt(++i);
    }

    if (stack.length !== 1) {
        let sum: number = 1;
        for (let item of stack) {
            if (item !== "*") {
                sum *= parseInt(item);
            }
        }
        return sum;
    }

    return parseInt(stack.pop());
}

let part1: number = 0;
let part2: number = 0; 

let input: string[];
input = loadFile("inputs/Day18.txt", "\n");

for (let inp of input) {
    part1 += getResult(inp);
    part2 += getResultPart2(inp);
}


console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");