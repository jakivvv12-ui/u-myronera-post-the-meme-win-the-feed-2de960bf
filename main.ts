// Entry for "Post the Meme, Win the Feed" (u-myronera-post-the-meme-win-the-feed-2de960bf).
// Node 22, standard library only, plain JavaScript (no TypeScript annotations).
// It reads POST.json from the repository, validates the X post address, then copies
// POST.json and meme.png to the output directory. That is all the program has to do;
// the post itself is the entry and the house reads its counts from X.
//
// Usage (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const PLACEHOLDER_URL = 'https://x.com/<handle>/status/<id>';

// A real post address: https://x.com/<handle>/status/<digits> (or twitter.com,
// with an optional www. / mobile. prefix, or /i/web/status/<digits>); a query or
// fragment after the id is read past.
const POST_URL_RE = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/?#]+\/status\/\d+(?:[/?#].*)?$/;
const WEB_STATUS_RE = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/i\/web\/status\/\d+(?:[/?#].*)?$/;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
} catch (err) {
  fail(`could not read POST.json from ${BOT_DIR}: ${err.message}`);
}

let post;
try {
  post = JSON.parse(raw);
} catch (err) {
  fail(`POST.json is not valid JSON: ${err.message}`);
}

if (!post || typeof post !== 'object' || typeof post.url !== 'string') {
  fail('POST.json must be a JSON object with a string "url" field');
}

if (post.url === PLACEHOLDER_URL) {
  // The placeholder is no post's address yet: warn, but still copy the files and
  // exit 0 so the entry builds before the post goes up; the fixer replaces it
  // with the real post address.
  console.error('warning: POST.json still holds the placeholder URL; replace it with the real post address before submitting');
} else if (!POST_URL_RE.test(post.url) && !WEB_STATUS_RE.test(post.url)) {
  fail(`url is not a valid X post address: ${post.url}`);
}

// Copy the entry files to the output directory (create it if needed; never
// remove it — the grader runs as an unprivileged user on a read-only tree).
mkdirSync(OUTPUT_DIR, { recursive: true });
for (const file of ['POST.json', 'meme.png']) {
  try {
    copyFileSync(join(BOT_DIR, file), join(OUTPUT_DIR, file));
  } catch (err) {
    fail(`could not copy ${file} from ${BOT_DIR} to ${OUTPUT_DIR}: ${err.message}`);
  }
}

// Validate our own output: the copied POST.json must read back with the same url.
let written;
try {
  written = JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8'));
} catch (err) {
  fail(`could not read back ${join(OUTPUT_DIR, 'POST.json')}: ${err.message}`);
}
if (!written || written.url !== post.url) {
  fail('output POST.json does not match the input');
}

console.log(`wrote POST.json and meme.png to ${OUTPUT_DIR} (post: ${post.url})`);
