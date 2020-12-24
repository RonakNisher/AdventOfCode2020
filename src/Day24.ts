import { loadFile } from "./Utils";

const compressedDirectionMap: Map<string, string> = new Map<string, string>();

// directions are e, w, se, sw, ne, nw
// back to itself
compressedDirectionMap.set(",e,sw,nw,",","); // 1,2,3,1
compressedDirectionMap.set(",se,w,ne,",","); // 1,3,4,1
compressedDirectionMap.set(",sw,nw,e,",","); // 1,4,5,1
compressedDirectionMap.set(",w,ne,se,",","); // 1,5,6,1
compressedDirectionMap.set(",nw,e,sw,",","); // 1,6,7,1
compressedDirectionMap.set(",ne,se,w,",","); // 1,7,2,1

compressedDirectionMap.set(",se,ne,w,", ","); // 1,3,2,1
compressedDirectionMap.set(",sw,e,nw,", ","); // 1,4,3,1
compressedDirectionMap.set(",w,se,ne,", ","); // 1,5,4,1
compressedDirectionMap.set(",nw,sw,e,", ","); // 1,6,5,1
compressedDirectionMap.set(",ne,w,se,", ","); // 1,7,6,1
compressedDirectionMap.set(",e,nw,sw,", ","); // 1,2,7,1

// opposite direction
compressedDirectionMap.set("ew","");
compressedDirectionMap.set("we","");
compressedDirectionMap.set("nwse","");
compressedDirectionMap.set("senw","");
compressedDirectionMap.set("nesw","");
compressedDirectionMap.set("swne","");

compressedDirectionMap.set(",e,w,", ",");
compressedDirectionMap.set(",w,e,", ",");
compressedDirectionMap.set(",nw,se,", ",");
compressedDirectionMap.set(",se,nw,", ",");
compressedDirectionMap.set(",ne,sw,", ",");
compressedDirectionMap.set(",sw,ne,", ",");

// Not to self
// roundabout directions
compressedDirectionMap.set(",e,se,w,", ",se,"); // 1,2,x,3 -> 1,3
compressedDirectionMap.set(",se,sw,nw,", ",sw,"); // 1,3,x,4 -> 1,4
compressedDirectionMap.set(",sw,w,ne,", ",w,"); // 1,4,x,5 -> 1,5
compressedDirectionMap.set(",w,nw,e,", ",nw,"); // 1,5,x,6 -> 1,6
compressedDirectionMap.set(",nw,ne,se,", ",ne,"); // 1,6,x,7 -> 1,7
compressedDirectionMap.set(",ne,e,sw,", ",e,"); // 1,7,x,2 -> 1,2

compressedDirectionMap.set(",se,e,nw,", ",e,"); // 1,3,x,2 -> 1,2
compressedDirectionMap.set(",sw,se,ne,", ",se,"); // 1,4,x,3 -> 1,3
compressedDirectionMap.set(",w,sw,e,", ",sw,"); // 1,5,x,4 -> 1,4
compressedDirectionMap.set(",nw,w,se,", ",w,"); // 1,6,x,5 -> 1,5
compressedDirectionMap.set(",ne,nw,sw,", ",nw,"); // 1,7,x,6 -> 1,6
compressedDirectionMap.set(",e,ne,w,", ",ne,"); // 1,2,x,7 -> 1,7

// 2 direction around the center
compressedDirectionMap.set(",e,sw,", ",se,"); // 1,2,3 -> 1,3
compressedDirectionMap.set(",se,w,", ",sw,"); // 1,3,4 -> 1,4
compressedDirectionMap.set(",sw,nw,", ",w,"); // 1,4,5 -> 1,5
compressedDirectionMap.set(",w,ne,", ",nw,"); // 1,5,6 -> 1,6
compressedDirectionMap.set(",nw,e,", ",ne,"); // 1,6,7 -> 1,7
compressedDirectionMap.set(",ne,se,", ",e,"); // 1,7,2 -> 1,2

compressedDirectionMap.set(",sw,ne", ",e,"); // 1,3,2 -> 1,2
compressedDirectionMap.set(",sw,e,", ",se,"); // 1,4,3 -> 1,3
compressedDirectionMap.set(",w,se,", ",sw,"); // 1,5,4 -> 1,4
compressedDirectionMap.set(",nw,sw,", ",w,"); // 1,6,5 -> 1,5
compressedDirectionMap.set(",ne,w,", ",nw,"); // 1,7,6 -> 1,6
compressedDirectionMap.set(",e,nw,", ",ne,"); // 1,2,7 -> 1,7


compressedDirectionMap.set(",sw,w,nw,", ",w,w,");
compressedDirectionMap.set(",nw,w,sw,", ",w,w,");
compressedDirectionMap.set(",ne,e,se,", ",e,e,");
compressedDirectionMap.set(",se,e,ne,", ",e,e,");

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

    let result: string = path;
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