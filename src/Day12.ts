import {loadFile} from "./Utils";

enum Direction {
    East,
    South,
    West,
    North
}

namespace Direction {
    export function turnRightByValue(current: Direction, angle: number) : Direction {
        return (current + (angle/90)) % 4;
    }

    export function turnLeftByValue(current: Direction, angle: number) : Direction {
        if ((current - (angle/90)) < 0)
          return 4 + ((current - (angle/90)));
        else 
          return current - (angle/90);
    }
}

interface Waypoint {
    directionUnit1: Direction; //EW
    directionUnit2: Direction; // NS
    valueUnit1: number; // EW
    valueUnit2: number; // NS
}

export function setNewCoordinates(action: string, value: number) {

    switch (action) {
        case "F": {
            if (currentDirection == Direction.East) {
                currentEW += value;
            }
            else if (currentDirection == Direction.West){
                currentEW -= value;
            }
            else if (currentDirection == Direction.North){
                currentNS += value;
            }
            else if (currentDirection == Direction.South){
                currentNS -= value;
            }
            break;
        }

        case "N": {
            currentNS += value;
            break;
        }

        case "S": {
            currentNS -= value;
            break;
        }

        case "E": {
            currentEW += value;
            break;
        }

        case "W": {
            currentEW -= value;
            break;
        }

        case "R": {
            currentDirection = Direction.turnRightByValue(currentDirection, value);
            break;
        }

        case "L": {
            currentDirection = Direction.turnLeftByValue(currentDirection, value);
            break;
        }
    }
}

export function move(instruction: string) {
    setNewCoordinates(instruction.charAt(0), parseInt(instruction.slice(1)));
}

export function setNewCoordinatesPart2(action: string, value: number) {

    switch (action) {
        case "F": {
            currentEW += value * waypoint.valueUnit1;
            currentNS += value * waypoint.valueUnit2;

            break;
        }

        case "N": {
            waypoint.valueUnit2 += value;
            break;
        }

        case "S": {
            waypoint.valueUnit2 -= value;
            break;
        }

        case "E": {
            waypoint.valueUnit1 += value;
            break;
        }

        case "W": {
            waypoint.valueUnit1 -= value;
            break;
        }

        case "R": {

            for (let i = 0; i < value / 90; i++) {
                let newWaypoint = [waypoint.valueUnit2, -waypoint.valueUnit1];
				waypoint.valueUnit1 = newWaypoint[0];
				waypoint.valueUnit2 = newWaypoint[1];
			}

            break;
        }

        case "L": {
            for (let i = 0; i < value / 90; i++) {
                let newWaypoint = [-waypoint.valueUnit2, waypoint.valueUnit1];
				waypoint.valueUnit1 = newWaypoint[0];
				waypoint.valueUnit2 = newWaypoint[1];
			}

            break;
        }
    }
}

export function movePart2(instruction: string) {
    setNewCoordinatesPart2(instruction.charAt(0), parseInt(instruction.slice(1)));
}

let input: string[];
input = loadFile("inputs/Day12.txt", "\n");

let part1: number = 0;
let part2: number = 0;

let currentNS: number = 0;  // N is +ve and S is -ve
let currentEW: number = 0; // E is +ve and W is -ve

let waypoint: Waypoint = {directionUnit1: Direction.East, valueUnit1: 10, directionUnit2: Direction.North, valueUnit2: 1};

let currentDirection: Direction = Direction.East;

// Part 1
for (var instruction of input) {
    move(instruction);
}

part1  = Math.abs(currentEW) + Math.abs(currentNS);

currentEW = 0;
currentNS = 0;
currentDirection = Direction.East;

// Part 2
for (var instruction of input) {
    movePart2(instruction);
}

part2  = Math.abs(currentEW) + Math.abs(currentNS);

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");