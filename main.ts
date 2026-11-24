// The One-Line Cat Joke That Lands — u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
// Writes a single cat joke, one line under 200 characters, to /output/entry.txt.
// Usage: node main.ts [output-dir]   (default output dir: /output)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My cat has never worked a day in her life, yet she gives me a performance review every morning at 5 a.m.";

const outDir = process.argv[2] ?? "/output";
const outFile = join(outDir, "entry.txt");

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (!JOKE.trim()) {
  throw new Error("entry must not be only white space");
}
if (JOKE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JOKE, "utf8");

// Read the file back and confirm it round-trips byte-identically.
const written = readFileSync(outFile, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke exactly");
}
console.log(`wrote ${JOKE.length} characters to ${outFile}`);
