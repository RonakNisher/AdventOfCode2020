import * as fs from "fs";

export function loadFile(filename: string, separator?: string | RegExp): string[] {
    let content = fs.readFileSync(filename).toString();
    return separator ? content.split(separator) : [content];
}