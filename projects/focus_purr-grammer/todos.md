## TODOS
[ ] 1. feat: Gameboard, falling items.
[ ] 2. feat: render falling items on the board
[ ] 3. feat: items are falling.
[ ] 4. feat: add cat component at the bottom of the board
[ ] 5. feat: cat movement by arrow keyboard or mouse
[ ] 6. feat: detect the contact of falling items and cat
[ ] 7. feat: increase/descrease scores per contaction.

## Components
- Gameboard - should have states[score, energy, items[], cat position, is playng] = game logics
- HeaderBar (should call scores, and energy)
- falling items
- cat icon
- buttons: start pause reset

[ ] function: create random falling items
[ ] function: random set fallingtime X location
[~ ] function: cat move
[ ] function: handle collison
[~] function: startBtn handler
[~] function: pauseBtn handler
[~] function: resetBtn handler
[ ] tick function: update items position, spawn new, check collision, update time/energy
[ ] function: handleKeyDown (ArrowLeft/ArrowRight → update catX)
[ ] game Status management

## Issues:
[X] play area must be focused before it moves with arrow key down.
 - amazing, use effect solve it so simply, but what is useEffect, what is used for.