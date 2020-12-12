import {loadFile} from "./Utils";

interface seatMapReturn {
    newMap: Array<string>;
    didSeatsChange: boolean;
}

export function printMap() {
    console.log("---------------------------");
    seatMap.forEach( x => {
        console.log(x);
    })
    console.log("---------------------------");
}

export function getNoOfAdjacentSeatsPart2(row: number, col: number) : number {
    let places: string[] = [];
    let seatFound: boolean = false;

    [[0, -1], [0, 1],[-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(val => {
        let newRow: number = row + val[0];
        let newCol: number = col + val[1];
        seatFound = false;
        while (!seatFound) {
            if (newRow >=0 && newRow < rowLength && newCol>=0 && newCol<colLength) {

                const place: string = seatMapPart2[newRow][newCol];
                if (place === "L" || place === "#") {
                    places.push(place);
                    seatFound = true;
                }
                else{
                    newRow += val[0];
                    newCol += val[1];
                }
            }
            else {
                seatFound = true;
            }
        }
    });

    return places.filter(x =>  x === "#").length;
}

export function getNewSeatMap(): seatMapReturn {
    let tempSeatMap = new Array<string>();
    let seatsChanged: boolean = false;

    for (let i: number = 0; i < seatMap.length; i++ ) {
        let tempRow: string = "";
        for (let j: number = 0; j < seatMap[0].length; j++) {
            let noOfAdjacentSeats: number = getNoOfAdjacentSeats(i, j);
            let currentPlace: string = seatMap[i][j];

            switch (currentPlace) {
                case "." : {
                    tempRow+=".";
                    break;
                }

                case "L" : {
                    if (noOfAdjacentSeats === 0) {
                        tempRow+="#";
                        seatsChanged = true;
                    }
                    else {
                        tempRow+="L";
                    }
                    break;
                }

                case "#" : {
                    if (noOfAdjacentSeats >= 4) {
                        tempRow+="L";
                        seatsChanged = true;
                    }
                    else {
                        tempRow+="#";
                    }
                    break;
                }
            }
        }

        tempSeatMap.push(tempRow);
    }

    return {newMap:tempSeatMap, didSeatsChange: seatsChanged };
}

export function getNoOfAdjacentSeats(row: number, col: number) : number {
    let places: string[] = [];

    [[0, -1], [0, 1],[-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(val => {
        const newRow: number = row + val[0];
        const newCol: number = col + val[1];

        if (newRow >=0 && newRow < rowLength && newCol>=0 && newCol<colLength) {
            places.push(seatMap[newRow][newCol]);
        }
    });
    return places.filter(x =>  x === "#").length;
}

export function getNewSeatMapPart2(): seatMapReturn {
    let tempSeatMap = new Array<string>();
    let seatsChanged: boolean = false;

    for (let i: number = 0; i < seatMap.length; i++ ) {
        let tempRow: string = "";
        for (let j: number = 0; j < seatMapPart2[0].length; j++) {
            let noOfAdjacentSeats: number = getNoOfAdjacentSeatsPart2(i, j);
            let currentPlace: string = seatMapPart2[i][j];

            switch (currentPlace) {
                case "." : {
                    tempRow+=".";
                    break;
                }

                case "L" : {
                    if (noOfAdjacentSeats === 0) {
                        tempRow+="#";
                        seatsChanged = true;
                    }
                    else {
                        tempRow+="L";
                    }
                    break;
                }

                case "#" : {
                    if (noOfAdjacentSeats >= 5) {
                        tempRow+="L";
                        seatsChanged = true;
                    }
                    else {
                        tempRow+="#";
                    }
                    break;
                }
            }
        }

        tempSeatMap.push(tempRow);
    }

    return {newMap:tempSeatMap, didSeatsChange: seatsChanged };
}

let input: string[];
input = loadFile("inputs/Day11.txt", "\n");

let part1: number = 0;
let part2: number = 0;

let seatMap = new Array<string>();
let seatMapPart2 = new Array<string>();

input.forEach((line: string) => {
    seatMap.push(line);
});

seatMapPart2 = seatMap;

// printMap();
const rowLength: number = seatMap.length;
const colLength: number = seatMap[0].length;

// part 1
while (true) {
    let newMap: seatMapReturn = getNewSeatMap();

    seatMap = newMap.newMap;
    if (!newMap.didSeatsChange) {
        break;
    }
}

for (var seatRow of seatMap) {
    for (var col of seatRow) {
        if (col === "#") {
            part1++;
        }
    }
}

// part 2
while (true) {
    let newMap: seatMapReturn = getNewSeatMapPart2();

    seatMapPart2 = newMap.newMap;
    if (!newMap.didSeatsChange) {
        break;
    }
}


for (var seatRow of seatMapPart2) {
    for (var col of seatRow) {
        if (col === "#") {
            part2++;
        }
    }
}

//part 1

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");