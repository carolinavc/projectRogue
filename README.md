# Rogue Game - JavaScript Project

## Introduction

This project was made in an academic context and is an implementation of a Rogue-like game in JavaScript. A Rogue-like game is a turn-based strategy game typically set in a fantasy world. In this game, the player controls a hero character, and for each move they make, the enemies in the game also have a chance to move. The objective is to navigate through various rooms, defeat enemies, and reach the final goal of the game.

## Objectives

The main goal of this project is to create the game engine for a Rogue-like game. The game should allow the player to explore rooms, encounter different types of enemies, and interact with objects that affect gameplay. Some of the key objectives include:

- Implementing character movements and interactions.
- Reading room configurations from files.
- Handling enemy movements and behavior.
- Implementing combat mechanics, including ranged attacks.
- Scoring and leaderboards to track the player's progress.

## Project Structure

The game is structured as follows:

- `index.html`: The HTML file for the game's interface.
- `rooms/`: Folder containing room configuration files.
- `src/`: Directory for the game's JavaScript source code.

## How to Play

1. Open `index.html` to start the game.
2. Use the arrow keys to move the hero character.
3. Defeat enemies by attacking them or using ranged attacks.
4. Collect objects that can help you on your journey.
5. Explore the rooms and try to reach the final goal.

## Requirements

- This project makes use of JavaScript features, including inheritance, polymorphism, lists, file input and output, and exception handling.
- Ensure that you have all the required image assets in the `images/` directory, each having a size of 48x48 pixels.

## Class Overview

- `Interface`: Manages the game's user interface, including the game window, status bar, and messaging.
- `Vector2d`: Represents two-dimensional vectors used for character movements.
- `Direction`: Represents movement directions and provides utility methods.
- `Position`: Represents the position of elements within the game.

## Getting Started

To get started with the project, open `index.html` in your browser. The game will launch in the browser window, and you can start playing.

## Acknowledgements

This project uses image assets from the game Pixel Dungeon, which can be found at [Pixel Dungeon Wiki](http://pixeldungeon.wikia.com/).

Feel free to explore and modify the code to meet your specific requirements and add new features to the game.

**Have fun playing the Rogue Game!**
