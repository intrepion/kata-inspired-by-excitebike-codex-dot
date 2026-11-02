# Dirt Circuit

A small, original-art motocross time trial inspired by Nintendo's Excitebike. Race two laps on five dirt courses alone or with rival bikes. Manage turbo heat, steer between four lanes, and adjust your pitch before landing. [Return to the Kata Arcade](https://intrepion.github.io/).

## Play locally

From this directory run `python3 -m http.server 8765 --bind 127.0.0.1`, then visit <http://127.0.0.1:8765/>. No build or dependencies are required. Run `npm test` for the game-logic tests. Static hosting such as GitHub Pages can serve the root directory.

## Controls

Hold Z to accelerate or X for turbo; release to slow down. Up/down changes lanes; left lifts the front wheel and right lowers it. On a touch screen use the on-screen buttons, including simultaneous throttle and steering. Cross blue strips to cool the engine and avoid brown rough patches. Too much heat stops the bike temporarily. Land close to level to maintain speed; a steep landing or collision costs time. Select a course and solo/rivals on the start screen. Sound is optional.

## Design and scope

The game uses an original canvas illustration and a synthesized sound cue. Side-on Canvas 2D fits the original's gameplay; a 3D library would add complexity without improving it. The five generated courses, tuning, rivals, target times and physics are approximations, not replicas. It does not implement the original's track editor, save system, automatic qualifying/main-race progression, full original obstacle set, or original audio and artwork. Rivals are moving hazards rather than a complete opponent AI. The target time is a simple pass/retry threshold rather than a full ranking table.

## Research

- [Nintendo, Excitebike manual](https://www.nintendo.co.jp/clv/manuals/en/pdf/CLV-P-NAAHE_en.pdf): controls, heat, cool zones, jumps, race modes and progression.
- [HonestGamers review](https://www.honestgamers.com/11896/nes/excitebike/review.html): lane hazards and landing alignment.

Excitebike is a trademark of its respective owner. This independent learning project is not affiliated with or endorsed by Nintendo. Source code and original assets are under the MIT license.

## Arcade metadata

See [docs/arcade-metadata.md](docs/arcade-metadata.md) for the game-owned manifest and screenshot provenance.
