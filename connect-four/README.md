# Connect Four

My initial version of Connect Four was coded for unit 11 of *Springboard's Software Engineering Career Track* in November of 2021.

### Current Features:

- Turn/color indicator on mouseover with dynamic text further indicating which player's pieces are next
- Placed pieces falling to their lowest avaialbe spot with CSS animation 
- Proper win condition checking with alerts for wins by connecting 4 or ties from a full board.
- Prevention of adding futher pieces if gameplay has concluded

#### Known Bugs:

One known bug is that the falling height of the pieces is a static 300. 
This means the more pieces are in a column, the higher above the board the played piece drops from. 
A potential but unimplemented fix is to have the pieces dynamically set their falling height, reducing each drop by 50px for each piece already in a column.

#### Potential Additions & Features

Future feature additions could include visual overhauls, better win/tie modals, and a reset button. 
A reach feature would be to further animate all the pieces falling out the bottom of the board. 

#### What's next for this project
The codebase is awaiting review by my program mentors prior to further refactoring to make this project employ class defined objects.  
