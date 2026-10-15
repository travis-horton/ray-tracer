# ray-tracer — what changed, in plain words

Newest first.

## October 2026

**ray-tracer #18: the change log catches up on entries it missed** · [PR #18](https://github.com/travis-horton/ray-tracer/pull/18) · merged 26.1015.0728 · v1.0.4
- Behind the scenes: the robot that writes this file after each change now also writes in any earlier finished change it missed, oldest first, with a "recorded late" note when it is more than an hour late. If GitHub won't answer one of its lookups, it skips only that one, records the newest change anyway, and fills the gap on a later run.

**ray-tracer #17: five library updates combined, and a newer tidiness checker** · [PR #17](https://github.com/travis-horton/ray-tracer/pull/17) · merged 26.1010.1230 · v1.0.3
- Behind the scenes: the code-tidiness checker moved to its current version with a new settings file, which clears all 21 known security warnings in the helper libraries it uses; a helper library nothing used was removed. The ray tracer and its picture are unchanged.
  Try it: open Terminal and paste
      cd ~/code/ray-tracer && npm install && npm run lint && npm test

**ray-tracer #16: the project's past, written down** · [PR #16](https://github.com/travis-horton/ray-tracer/pull/16) · merged 26.1010.1210 · v1.0.2
- Behind the scenes: the history file now covers the whole project, from its first version to 26.1010, not just today's changes.

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

## June 2024

**Colors get their own file** · [commits](https://github.com/travis-horton/ray-tracer/commits/master?since=2024-06-06&until=2024-06-06) · merged 24.0606.1301 · v0.2.2
- **[Tidy-up](https://github.com/travis-horton/ray-tracer/commit/b557312)** · merged 24.0606.1259
  Behind the scenes: the code that describes a color moved out of the ray tracer into its own small file, and the ray tracer is now handed to other pages as the file's one main piece, which is how the Ray tracer page on travish.com asks for it. The picture is unchanged.
- **[Color file](https://github.com/travis-horton/ray-tracer/commit/6ace1d1)** · merged 24.0606.1301
  Fixed: the tidy-up two minutes earlier pointed at the new color file before the file had been added, so in between the ray tracer could not load. Adding the file fixed that.
  Try it: open https://www.travish.com/programming/ray-tracer (the site runs exactly this version).

## July 2021

**The ray tracer can draw inside another page** · [commit](https://github.com/travis-horton/ray-tracer/commit/b1f346c) · merged 21.0701.1744 · v0.2.1
- New: instead of drawing onto its own page as soon as that page loaded, the ray tracer now draws into whichever box another page names. This is what let it run inside travish.com, on the Ray tracer page the site added on 21.0727.

## February 2020

**The newer ray tracer, a tidy-up, and a module experiment** · [commits](https://github.com/travis-horton/ray-tracer/commits/master?since=2020-02-09&until=2020-02-09) · merged 20.0209.1747 · v0.2.0
- **[The newer ray tracer](https://github.com/travis-horton/ray-tracer/commit/3a782bb)** · merged 20.0209.1048
  New: the 2017 version was replaced by a newer one found on the laptop: four colored balls (cyan, red, blue and green) at different distances, shaded by a single light so they look round, on an 800×600 picture with a dark plum background. A small web page to open it came with it, captioned "first try at a ray tracer", and two minutes earlier the program file got a name ending a browser recognizes.
- **[Page and code tidy-up](https://github.com/travis-horton/ray-tracer/commit/dc9da9c)** · merged 20.0209.1211
  Behind the scenes: the page now uses a standard layout with the title "ray tracer", the ray tracer waits for the page to finish loading before it draws, and an automatic code-tidiness checker was added and its suggestions applied. The picture is unchanged.
- **[Module experiment](https://github.com/travis-horton/ray-tracer/commit/e751dff)** · merged 20.0209.1747
  Behind the scenes: tried moving the color code into a separate file, but a browser can't load a program split that way without an extra build tool, so the code went back into one file and its name was set back. A color library was also added to the project's list of borrowed pieces and never used.
  Breaking: the page was left asking for the experiment's file name, which no longer exists, so from here on opening the page on its own shows the caption but no picture. (Later corrected on 26.1010, in ray-tracer #10: the page draws the picture again.)

## November 2017

**The first ray tracer** · [commit](https://github.com/travis-horton/ray-tracer/commit/43ee83e) · merged 17.1112.0905 · v0.1.1
- New: a ray tracer makes a picture by working out, for every dot, whether a line from the eye hits something. This first one draws a single pale green ball as a flat disc on a black 640×480 picture, with no shading yet, and had no web page to open it with.

**The project begins** · [commit](https://github.com/travis-horton/ray-tracer/commit/270e2ac) · merged 17.1111.2205 · v0.1.0
- Behind the scenes: the project was created with a one-line description, "my first crack at a rayTracer".
