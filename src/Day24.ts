import { loadFile } from "./Utils";

let directionMap: Map<string, number[]> = new Map<string, number[]>();
directionMap.set("e", [1,0]);
directionMap.set("w", [-1,0]);
directionMap.set("sw", [0,1]);
directionMap.set("ne", [0,-1]);
directionMap.set("se", [1,1]);
directionMap.set("nw", [-1,-1]);

let neighbours: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1]];

let coordinateTileColorMap: Map<string, number> = new Map<string, number>();

export function compressPath(path: string) : string {
    let currentX: number = 0;
    let currentY: number = 0;

    for (let i = 0; i <  path.length;) {
        let currentChar = path.charAt(i);
        let nextDirection: string = "";

        if (currentChar === "s" || currentChar === "n") {
            nextDirection = currentChar + path.charAt(i+1);
            i+=2;
        }
        else {
            nextDirection = currentChar;
            i++;
        }

        let moveCoordinates = directionMap.get(nextDirection);
        currentX += moveCoordinates[0];
        currentY += moveCoordinates[1];
    }

    return [currentX, currentY].join(",");
}

let part1: number = 0;
let part2: number = 0;

let input: string[];
input = loadFile("inputs/Day24.txt", "\n");

let transformedInput: string[] = input.map(x => compressPath(x));

for (let tile of transformedInput) {
    let currentColor: number = coordinateTileColorMap.get(tile) | 0; // 0 is white
    coordinateTileColorMap.set(tile, currentColor === 0 ? 1 : 0);
}

part1 = [...coordinateTileColorMap.values()].filter(x => x === 1).length;

// Part 2
for (let day = 1; day <= 100; day++) {
    let newTileMap: Map<string, number> = new Map<string, number>();
    let minX: number = 1000;
    let minY: number = 1000;
    let maxX: number = -1000;
    let maxY: number = -1000;

    [...coordinateTileColorMap.keys()].forEach(x => {
        let xy: number[] = x.split(",").map(y => parseInt(y));

        minX = Math.min(minX, xy[0]);
        maxX = Math.max(maxX, xy[0]);
        minY = Math.min(minY, xy[1]);
        maxY = Math.max(maxY, xy[1]);
    });

    for (let i = minX - 1; i <= maxX + 1; i++) {
        for (let j = minY - 1; j <= maxY + 1; j++) {
            let newColor: number = 0;
            let currentColor: number = coordinateTileColorMap.get(i + "," + j) | 0; // 0 is white
            let neighbourCountBlackTiles = neighbours.filter(xy => {
                let neighbourX: number = xy[0] + i;
                let neighbourY: number = xy[1] + j;
                return (coordinateTileColorMap.get(neighbourX + "," + neighbourY) | 0) === 1
            }).length;

            if (currentColor === 1) { // Black
                if (neighbourCountBlackTiles === 0 || neighbourCountBlackTiles > 2)
                    newColor = 0; // flip to white
                else
                    newColor = 1; // stays black
            }
            else { // white
                if (neighbourCountBlackTiles === 2)
                    newColor = 1; // flip to blacl
                else
                    newColor = 0; // stays white
            }

            newTileMap.set(i + "," + j, newColor);
        }
    }

    coordinateTileColorMap.clear();
    newTileMap.forEach((value: number, key: string) => coordinateTileColorMap.set(key, value));
}

part2 = [...coordinateTileColorMap.values()].filter(x => x === 1).length;

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");