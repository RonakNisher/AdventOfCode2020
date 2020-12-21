import { loadFile } from "./Utils";


let part1: number = 0;
let part2: number = 0;

let input: string[];
input = loadFile("inputs/Day21.txt", "\n");

let allergensIngredientsMap: Map<string, Set<string>> = new Map < string, Set<string>>();
let allIngredientsNonUnique: string[] = [];

for (let inp of input) {
    let parts: string[] = inp.split(/ \(contains |\)/).filter(x => x != "");

    let inputIngredients = parts[0].split(" ").filter(x => x != "");
    inputIngredients.forEach(x => { allIngredientsNonUnique.push(x);});
    
    for (let allergen of parts[1].split(/ |,/).filter(x => x!== "")) {
        
        let ingredients: Set<string> = new Set<string>(inputIngredients);

        let setPresent = allergensIngredientsMap.get(allergen);
        if (setPresent !== undefined) {
            setPresent.forEach( x => {
                if (!ingredients.has(x)) {
                    setPresent.delete(x);
                }
            });

            allergensIngredientsMap.set(allergen, setPresent);
        }
        else
        {
            allergensIngredientsMap.set(allergen, ingredients);
        }
    }
}

part1 = allIngredientsNonUnique.filter(x =>  [...allergensIngredientsMap.values()].every(s => !s.has(x))).length;

// part 2

let shouldContinue: boolean = true;
let dangerList: Set<string> = new Set<string>();

while (shouldContinue) {
    shouldContinue = false;
    for (let entry of allergensIngredientsMap) {
        let key = entry[0];
        if (entry[1].size === 1 && !dangerList.has(key)) {

            shouldContinue = true;
            dangerList.add(key);

            for (let kv of allergensIngredientsMap) {
                if (kv[0] !== key)
                    kv[1].delete([...entry[1]][0]);
            }
        }
    }
}

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", [...dangerList.values()].sort().map(x => [...allergensIngredientsMap.get(x)][0]).join(","));
console.log("********************************************");