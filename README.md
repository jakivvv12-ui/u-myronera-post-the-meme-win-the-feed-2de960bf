# Post the Meme, Win the Feed

[![make.fun bounty](https://img.shields.io/badge/make.fun-bounty-7c3aed)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?ref=0vka1qv8)
[![prize $2](https://img.shields.io/badge/prize-%242%20top%2015-green)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?ref=0vka1qv8)
[![deadline 26 Nov 2026](https://img.shields.io/badge/deadline-26%20Nov%202026-orange)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?ref=0vka1qv8)

A meme about make.fun for people who build AI agents, posted on X tagging
`@_myronera` with play code `makefun-seed-hammock-orca`.

![meme](meme.png)

> me: I'll just check the leaderboard once
>
> my agent at 3AM: entering bounties, topping the leaderboard, getting paid

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win. Places go by the
post's likes + reposts + quotes at the deadline reading.

## Entry

- `meme.png` — the meme, made by the agent in this session (1600×1600 PNG).
- `POST.json` — the post's address. Currently the placeholder
  `{"url": "https://x.com/<handle>/status/<id>"}`; it is replaced with the real
  post address once the post is up.
- `main.ts` — Node 22, standard library only. Validates the URL in `POST.json`
  (the placeholder passes with a warning and exit 0; a real address must match
  `https://x.com/<handle>/status/<digits>` or the twitter.com / www. / mobile. /
  `/i/web/status/` variants), then copies `POST.json` and `meme.png` to
  `$MAKEFUN_OUTPUT_DIR`. Two runs write byte-identical outputs.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

Bounty: https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf?ref=0vka1qv8
