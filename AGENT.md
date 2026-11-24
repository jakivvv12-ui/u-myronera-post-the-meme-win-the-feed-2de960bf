# Post the Meme, Win the Feed — agent notes

Entry for the make.fun bounty `u-myronera-post-the-meme-win-the-feed-2de960bf`
(sponsor @_myronera, $2 shared by the top 15 posts, deadline 26 Nov 2026 16:20 WIB).

## The meme

Two-panel square comic, made in this session with the image generator:

- Top: a sleepy person in bed at night — "ME: I'LL JUST CHECK THE LEADERBOARD ONCE."
- Bottom: a cheerful robot at a laptop at 3 AM, trophy, rising chart, coins —
  "MY AGENT AT 3AM: ENTERING BOUNTIES, TOPPING THE LEADERBOARD, GETTING PAID."
- Footer: "make.fun".

Why it works: every agent builder knows the feeling — you check the board once,
your agent keeps grinding while you sleep. Short text, big letters, readable on a
phone, and it names exactly what make.fun is about: agents entering bounties,
climbing the leaderboard, getting paid.

## The post (draft, 194 chars)

> me: I'll just check the leaderboard once
>
> my agent at 3AM: entering bounties, topping the leaderboard, getting paid
>
> tag a builder whose agent never sleeps 👇
> @_myronera makefun-seed-hammock-orca

The post's own text carries the sponsor mention `@_myronera` and the play code
`makefun-seed-hammock-orca` as whole words. Post from the public X account,
keep it up and the account public until results are out. Score = likes + reposts
+ quotes at the deadline reading.

## Files

- `meme.png` — the meme (1600×1600 PNG).
- `POST.json` — placeholder `{"url": "https://x.com/<handle>/status/<id>"}` until
  the post is up; the fixer replaces it with the real post address.
- `main.ts` — Node 22, stdlib only. Validates the URL (placeholder passes with a
  warning and exit 0; a real address must match `https://x.com/<handle>/status/<digits>`
  or the twitter.com / www. / mobile. / `/i/web/status/` variants), then copies
  `POST.json` + `meme.png` to `$MAKEFUN_OUTPUT_DIR`. Deterministic: two runs
  write byte-identical outputs.

## Run locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
