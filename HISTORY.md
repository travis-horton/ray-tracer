# ray-tracer — what changed, in plain words

Newest first. Entries before the first one here are still to be written (the backfill).

## October 2026

**ray-tracer #10: the ray tracer in tidy pieces, with checks** · [PR #10](https://github.com/travis-horton/ray-tracer/pull/10) · merged 26.1010.1159 · v1.0.1
- Behind the scenes: the code is now split into small parts (the 3D math, the spheres, the colors, the scene, the drawing loop) instead of one long block, still with no build step. The picture on travish.com is identical down to the last pixel, and new automatic checks fail if it ever changes.
- Fixed: the project's own demo page pointed at a file that no longer existed, so it showed nothing; it draws the picture again.
  Try it: open Terminal and paste
      cd ~/code/ray-tracer && npm test

**ray-tracer #9: six library updates combined, and history tracking** · [PR #9](https://github.com/travis-horton/ray-tracer/pull/9) · merged 26.1010.1150 · v1.0.0
- **[Library updates](https://github.com/travis-horton/ray-tracer/commit/8d44ab8)** · merged 26.1010.1150
  Behind the scenes: updated six helper libraries used only by the code-tidiness checker to the versions that fix known security problems (lodash, hosted-git-info, glob-parent, acorn, path-parse, ajv). The ray tracer itself is unchanged.
- **[History tracking](https://github.com/travis-horton/ray-tracer/commit/2dd0518)** · merged 26.1010.1150
  Behind the scenes: every future change to this project now adds its own plain-language entry to a history file automatically.
