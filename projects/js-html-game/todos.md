
TODOS:
Components:
- timer
- Scores
- grid UI
- Output area
- valid word list
- working list or string

1. Create a scalable board
   [X] Generate based on the  random letters
   [X] Render them as clickable cells

2. Handle cell click
   [X] If first click → select it
   [X] If not first click → check if adjacent to previous
   [X] and check if it has been visited.
   [X] If valid → add to selected list
   [~] Update the current word on screen

3. Clear button
   [X] Clear selected cells
   [X] Clear current word
   [X] Remove highlight

4. Reset button
   [X] Clear selected cells
   [X] Clear current word
   [X] Remove highlight
   [X] Clear Output area
   [X] render new board

5. Submit button
   [] Build the final word from selected cells
   [X] Check length >= 3
   [X] Check if word is in my dictionary Set and if the word was already found
   [X] If valid → add to “found words” list & update score
   [X] Clear current selection

6. Timer (simple version)
   [X] Start 1 mins countdown
   [X] When time is up → stop selecting and submitting

7. Basic UI updates
   [X]  Update timer display
   [X]  Update score display
   [X]  Highlight selected cells
   
8. output area updates
   [X]  display valid words
   [X]  update it accordingly
*/
