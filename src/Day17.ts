import {loadFile} from "./Utils";

interface Dimension {
    x: number;
    y: number;
    z: number;
    w?: number;
}

export function prettyPrintGrid(zdim: number, dim: number) {
    for (let i: number = -1 * dim; i <= dim; i++ ) {
        let row: string = "";
        for (let j: number = -1 * dim; j <= dim; j++ ) {
                let v = JSON.stringify({x:i, y:j, z:zdim});
                row += grid.has(v) ? grid.get(v) : ".";
        }
        console.log(row);
    }
}

export function findNeighbours(current: Dimension): Array<Dimension>{
    let neighbours: Array<Dimension> = [];

    let currentX: number = current.x;
    let currentY: number = current.y;
    let currentZ: number = current.z;

    for (let i: number = -1; i <= 1; i++ ) {
        for (let j: number = -1; j <= 1; j++ ) {
            for (let k: number = -1; k <= 1; k++ ) {
                if (i === j && j === k && i === 0)
                    continue;

                neighbours.push({x:i + currentX, y:j + currentY, z:k + currentZ});
            }
        }
    }

    return neighbours;
}

export function findNeighboursPart2(current: Dimension): Array<Dimension>{
    let neighbours: Array<Dimension> = [];

    let currentX: number = current.x;
    let currentY: number = current.y;
    let currentZ: number = current.z;
    let currentW: number = current.w;

    for (let i: number = -1; i <= 1; i++ ) {
        for (let j: number = -1; j <= 1; j++ ) {
            for (let k: number = -1; k <= 1; k++ ) {
                for (let w: number = -1; w <= 1; w++ ) {
                    if (i === j && j === k && k === w && i === 0)
                        continue;

                    neighbours.push({x:i + currentX, y:j + currentY, z:k + currentZ, w:w + currentW});
                }
            }
        }
    }

    return neighbours;
}

let input: string[];
input = loadFile("inputs/Day17.txt", "\n");

let x: number = 0;
let y: number = 0;
let z: number = 0;

let maxDim: number;
let minDim: number;

let grid: Map<string, string> = new Map<string, string>(); 
let tempGrid: Map<string, string> = new Map<string, string>(); 

for (var inp of input) {
    x = 0;
    for (var pos of inp) {
        grid.set(JSON.stringify({x:x, y:y, z:z}), pos);
        x++;
    }
    y++;
}

let cycle: number = 0;
let activeNeighboursCount: number = 0;

while (cycle < 6) {
    tempGrid = new Map<string, string>();

    let minX: number = 1000;
    let minY: number = 1000;
    let minZ: number = 1000;

    let maxX: number = -1000;
    let maxY: number = -1000;
    let maxZ: number = -1000;

    for (let k of grid.entries()) {
        if (k[1] === "#") {
            let dim: Dimension = JSON.parse(k[0]);

            minX = Math.min(dim.x, minX);
            minY = Math.min(dim.y, minY);
            minZ = Math.min(dim.z, minZ);

            maxX = Math.max(dim.x, maxX);
            maxY = Math.max(dim.y, maxY);
            maxZ = Math.max(dim.z, maxZ);
        }
    }

    minX--; minY--; minZ--;
    maxX++; maxY++; maxZ++;
    
    minDim = Math.min(minX, minY, minZ,);
    maxDim = Math.max(maxX, maxY, maxZ);

    for (let i: number = minDim; i <= maxDim; i++ ) {
        for (let j: number = minDim; j <= maxDim; j++ ) {
            for (let k: number = minDim; k <= maxDim; k++ ) {

                let point: string = JSON.stringify({x:i, y:j, z:k});

                activeNeighboursCount = 0;
                findNeighbours(JSON.parse(point)).forEach (x => {

                let val: string = grid.get(JSON.stringify(x));
                if (val === "#") {
                    activeNeighboursCount++;
                }

                });

                let currentVal: string = grid.has(point) ? grid.get(point) : ".";

                if (currentVal === "#") {
                    if (activeNeighboursCount === 2 || activeNeighboursCount === 3)
                        tempGrid.set(point, "#");
                    else
                        tempGrid.delete(point);
                }
                else if (currentVal === ".") {
                    if (activeNeighboursCount === 3)
                        tempGrid.set(point, "#");
                }
            }
        }
    }

    grid = tempGrid;

    cycle++;
}

let part1: number = 0;
let part2: number = 0; 

part1 = [...grid.values()].filter(x => x === "#").length;

///////////////////////// Part 2


grid = new Map<string, string>(); 

y = 0;
for (var inp of input) {
    x = 0;
    for (var pos of inp) {
        grid.set(JSON.stringify({x:x, y:y, z:z, w:0}), pos);
        x++;
    }
    y++;
}

cycle = 0;

while (cycle < 6) {
    tempGrid = new Map<string, string>();

    let minX: number = 1000;
    let minY: number = 1000;
    let minZ: number = 1000;
    let minW: number = 1000;

    let maxX: number = -1000;
    let maxY: number = -1000;
    let maxZ: number = -1000;
    let maxW: number = -1000;

    for (let k of grid.entries()) {
        if (k[1] === "#") {
            let dim: Dimension = JSON.parse(k[0]);

            minX = Math.min(dim.x, minX);
            minY = Math.min(dim.y, minY);
            minZ = Math.min(dim.z, minZ);
            minW = Math.min(dim.w, minW);

            maxX = Math.max(dim.x, maxX);
            maxY = Math.max(dim.y, maxY);
            maxZ = Math.max(dim.z, maxZ);
            maxW = Math.max(dim.w, maxW);
        }
    }

    minX--; minY--; minZ--; minW--;
    maxX++; maxY++; maxZ++; maxW++;

    let minDim = Math.min(minX, minY, minZ, minW);
    maxDim = Math.max(maxX, maxY, maxZ, maxW);

    for (let i: number = minDim; i <= maxDim; i++ ) {
        for (let j: number = minDim; j <= maxDim; j++ ) {
            for (let k: number = minDim; k <= maxDim; k++ ) {
                for (let w: number = minDim; w <= maxDim; w++ ) {

                    let point: string = JSON.stringify({x:i, y:j, z:k, w:w});

                    activeNeighboursCount = 0;
                    findNeighboursPart2(JSON.parse(point)).forEach (x => {

                        let val: string = grid.get(JSON.stringify(x));
                        if (val === "#") {
                            activeNeighboursCount++;
                        }
                    });

                    let currentVal: string = grid.has(point) ? grid.get(point) : ".";

                    if (currentVal === "#") {
                        if (activeNeighboursCount === 2 || activeNeighboursCount === 3)
                            tempGrid.set(point, "#");
                        else
                            tempGrid.delete(point);
                    }
                    else if (currentVal === ".") {
                        if (activeNeighboursCount === 3)
                            tempGrid.set(point, "#");
                    }
                }
            }
        }
    }

    grid = tempGrid;
    cycle++;
}

part2 = [...grid.values()].filter(x => x === "#").length;


console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");