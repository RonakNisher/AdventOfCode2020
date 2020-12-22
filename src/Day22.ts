import { loadFile } from "./Utils";

interface res {
    winner: number;
    cards: Array<number>;
}

export function playGame(player1Cards: Array<number>, player2Cards: Array<number>, isPart2: boolean, seenSet: Set<string> = new Set<string>()): res{
    let result: res = {winner: 0, cards: []};

    let winner: number = 0;
    while (player1Cards.length !== 0 && player2Cards.length !== 0) {
        let currentCards: string = player1Cards.join(",") + ":" + player2Cards.join(",");

        if (isPart2) {
            if (seenSet.has(currentCards)) {
                winner = 1;
                break;
            }
    
            seenSet.add(currentCards);
        }

        let player1Card: number = player1Cards.shift();
        let player2Card: number = player2Cards.shift();

        if (isPart2 && player1Cards.length >= player1Card && player2Cards.length >= player2Card) {
            // Recurse
            result = playGame(player1Cards.slice(0, player1Card), player2Cards.slice(0, player2Card), isPart2, new Set<string>());
            winner = result.winner;
        }
        else {
            winner = player1Card > player2Card ? 1 : 2;
        }

        if (winner === 1) {
            player1Cards.push(player1Card);
            player1Cards.push(player2Card);
        }
        else {
            player2Cards.push(player2Card);
            player2Cards.push(player1Card);
        }
    }

    result.winner = winner;
    result.cards = winner == 1? player1Cards : player2Cards;

    return result;
}

let part1: number = 0;
let part2: number = 0;

let input: string[];
input = loadFile("inputs/Day22.txt", "\n\n");

let player1Cards: Array<number> = input[0].split("\n").slice(1).map(x => parseInt(x));
let player2Cards: Array<number> = input[1].split("\n").slice(1).map(x => parseInt(x));
const totalCards: number = player1Cards.length * 2;

let winnerPart1: res = playGame(player1Cards.slice(), player2Cards.slice(), false /*isPart2*/);

let i: number = totalCards;
part1 = winnerPart1.cards.reduce((acc, value) => acc + (value*i--), 0); 

let winnerPart2: res = playGame(player1Cards, player2Cards, true /*isPart2*/);
i = totalCards;
part2 = winnerPart2.cards.reduce((acc, value) => acc + (value * i--), 0); 

console.log("********************************************");
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
console.log("********************************************");