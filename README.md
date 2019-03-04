# NOTE #

This module is not complete and even upon completion will require a change to the core Magic Mirror code base. Upon completion of those items, the core codebase changes represent a large fundamental change in the structure of modules and may take some time to get merged in - if at all. In the event my changes are not merged into the core Magic Mirror codebase, I will consider forking and bringing on additional developers to further help refactor and provide more developer friendly support for modules.

## To Do ##

### MVP ###
- Build out cycling of displayed matches
- Build out web scraper to pull in scores
- Finish core Magic Mirror 2 changes to add support for Vue.js based modules

### Secondary Priorities ###
- Add additional customization
    - Number match scores to display on screen at a time
    - Number of matches per player to get
    - Standard frequency of which to poll backend for score updates (default to 1 hour)
    - Optionally increased update for live matches (I have some concerns with this one if Google is used to scrape scores)
    - Ability to disable completed, in progress, and/or upcoming matches from being displayed
- Improve styling
- Stretch goal: option to display key match stats
