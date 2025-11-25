/** 
TODO:
Components:
- timer
- Scores
- grid UI
- Output area
- valid word list
- working list or string

1. Create a 4×4 board
   [] Generate 16 random letters
   [] Render them as clickable cells

2. Handle cell click
   [] If first click → select it
   [] If not first click → check if adjacent to previous and check if it has been visited.
   [] If valid → add to selected list
   [] Update the current word on screen

3. Clear button
   [] Clear selected cells
   [] Clear current word
   [] Remove highlight
4. Restart button
   [] Clear selected cells
   [] Clear current word
   [] Remove highlight
   [] Clear Output area
   
5. Submit button
   [] Build the final word from selected cells
   [] Check length >= 3
   [] Check if word is in my dictionary Set and if the word was already found
   [] If valid → add to “found words” list & update score
   [] Clear current selection

6. Timer (simple version)
   [] Start 3 mins countdown
   [] When time is up → stop selecting and submitting

7. Basic UI updates
   []  Update score display
   []  Update timer display
   []  Highlight selected cells
   
8. output area updates
   []  display valid words
   []  update it accordingly
*/
