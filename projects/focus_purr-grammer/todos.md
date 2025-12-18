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

[X] function: create random falling items
[X] function: random set fallingitems location
[X] function: cat move
[X] function: handle collison
[X] function: startBtn handler
[X] function: pauseBtn handler
[X] function: resetBtn handler
[X] tick function: update items position, spawn new, check collision, update time/energy
[X] function: handleKeyDown (ArrowLeft/ArrowRight → update catX)
[X] game Status management
[X] falling items overlaps
[X] scores and energy logic
[ ] set levels via playing time.
[X] speed is changed or not? speed is not working by 12/13; --- fixed 12/17
    the speed logic should change with the time not the score, otherwise will be a mess.
[X] add a short description of hwo the game works.
[X] playsound button show different when muted.
[X] change styling of GameOver.
## Issues:
[X] play area must be focused before it moves with arrow key down.
 - amazing, use effect solve it so simply, but what is useEffect, what is used for.
  
## What I learned
###  useMemo 
- When to use it
  - memoizes a computed value so it isn’t recalculated on every render unless its dependencies change.
- what is the input
    - A function
        * Must be a pure function
        * Returns a computed value
    - A dependency array

    - Lists the values the computation depends on
        * The memoized value is recomputed only when one of these values changes
- what is output
    - The memoized result of the computation
    - result is a value, **not** a **function**
    - The cached value is reused across renders until dependencies change

### useRef
- Use it when you need to store something that:
    * Should persist across renders
    * Should NOT trigger a re-render
  
**Typical usage:**
useMemo → derived values (visible items, difficulty scaling)
useRef → audio, interval IDs, latest state in game loop