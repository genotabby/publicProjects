# Developting a Reversi game
Project Brief
-------------
MVP - Minimum Viable Product
- Built with HTML, CSS and JavaScript
- Use Javascript for DOM manipulation
- Hosted on vercel
- Be displayed in the browser


Technologies & Tools used
-------------

- HTML
- CSS
- Javascript
- Github

Description
-------------
This is a classic Reversi game using the Orthello rules. This game was implemented using HTML, CSS and Javascript while attending the Software Immersive course at General Assembly. 
I chose Reversi as it is a visually complex game when done manually in person and is one of my favourite traditional board games.

Objective
-------------
The objective of the game is to have the majority of discs facing up on the board showing one's own colour at the end of the game. The game ends when there are no more possible moves and the winner is the player with the most pieces.

Rules
-------------
1. Black always moves first.

2. If on your turn you cannot outflank and flip at least one opposing disc, your turn is forfeited and your opponent moves
again. However, if a move is available to you, you may not forfeit your turn. 

3. Players may not skip over their own colour disc(s) to outflank an opposing disc. 

4. Disc(s) may only be outflanked as a direct result of a move and must fall in the direct line of the disc placed down.

5. All discs outflanked in any one move must be flipped, even if it is to the player's advantage not to flip them at all. 

5. Once a disc is placed on a square, it can never be moved to another square later in the game. 

7. When it is no longer possible for either player to move, the game is over. Discs are counted and the player with the majority of their colour showing is the winner.

Note: It is possible for a game to end before all 64 squares are filled.

Rules were obtained from https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english

Deployment
-------------
The game is deployed on Vercel and can be played here:<br>
https://reversi-proj1.vercel.app/

How to play
-------------
This version of Tetris allows some flexibility by allowing a range of board sizes to be chosen.

![](https://i.imgur.com/MOwoghP.png)

<br>

Using the official rules from the [World Orthello Federation](https://www.worldothello.org/), black would start first and the objective of this game is to obtain more points than your opponent by having more of your colour covering the board. 

<br>

![](https://i.imgur.com/zuZcAHL.png)

<br>

Take over the opponents pieces by flanking them with your colour and turning them into your colour. It is possible to reverse multiple pieces in the 8 directions in one turn.

<br>

![](https://i.imgur.com/FQdzkO4.png)

<br>

Possible placements are shown on the board and you may select one of the placements to make your move. Once your piece is placed, the turn goes over to your opponent. The game ends when all pieces are placed or there are no moves left for both players.

Development Progress
-------------
By breaking down the game according to feature priority, I came up with the following development stages:
- **Stage 1:** Generate the board data in array form
- **Stage 2:** Create the render functions 
- **Stage 3:** Create the Reversi game logicts
- **Stage 4:** Ability to track scores and check winner
- **Stage 5:** Detect possible moves
- **Stage 6:** Feature to skip turn if no possible moves
- **Stage 7:** End the game early if both players have no moves

Key Learnings
-------------
1. Using functions to break down code by purpose so it can be reused and is easier to identify which code has what purpose.
2. Implement the MVC (Model-View-Controller) approach to separate the game logic and display.
3. It is helpful to place logs at checkpoints and coordinates to help to trace which part of the array is throwing errors and allows to narrow down the problem.
4. Sometimes checks may look outside of the array which can create unexpected results and errors. Creating a border is one useful method to work around this issue.
5. Testing a feature separately before merging into the main program can make it easier to narrow down a problem.

Arrays
-------------
An array is a collection of data and can store multiple values such as strings and numbers in a single variable. An array can be created within an array for things such as coordinate values and the values can be accessed using the array's index.

![](https://i.imgur.com/nJOWaBl.png)

Conditional statements
-------------
Conditional staments are used to perform different actions based on different conditions

![](https://i.imgur.com/HrVp1Ub.png)

Bridging HTML and CSS using DOM
-------------
By using query selectors and event listeners, we can pull user input data to be processed and exported once the logic is processed.
![](https://i.imgur.com/44fFMLa.png)
<br>
![](https://i.imgur.com/SijX2mk.png)

Functions
-------------
Functions allows us to reuse code and trigger repeated scenarios together with Conditional Statements and the DOM.

![](https://i.imgur.com/jRhyteb.png)

Favourite Functions
-------------
While coming up with the logic, my favourite function would be the one that flips all the tiles in a row. When a piece is placed, the computer does not know how many tiles to check and so a while loop is used. At the same time it counts the number of checks it made. Once it meets a matching piece, it will backtrack and flip all the tiles it checked earlier. 

![](https://i.imgur.com/0DOhInD.png)

**Features**
Skip turn
-------------
Skips a player's turn if there are no moves available

![](https://i.imgur.com/6NkMQE5.jpg)

End game early
-------------
Ends the game if both players have no moves left and the player with most points win

![](https://i.imgur.com/E7lZVU8.jpg)

Summary
-------------
While this game seemed simple enough with some visual complexity, trying to recreate it in code was much more complex than expected. Trying to implement features and ensuring that they all work together relied heavily on understanding the code flow together with trial and error. 

As the first step is always the hardest, starting small with simple structures will lead to more development paths opening up.

Asset Attributions
-------------
Some background formatting was done with assets from other creators. All rights belong to the original artists and owners. Below are the links that are used:
<br>
- [Gradient background](https://www.makeuseof.com/css-background-patterns-examples/)
