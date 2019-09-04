# TURN TIMER

## Introduction 

TURN TIMER is a web application created to refine the gameplay of board games.

app url: https://www.mateuszpeciak.pl/turn-timer

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Features](#features)

## General info
TURN TIMER is a web application created to refine the board games gameplay. Player after login joins virtual table board with 2-8 players. If player is active a countdown begins and when the time is up player is switched.
App allows you to set the duration of the round for each player and follow gameplay progress. This application is designed with the mobile-first approach and is responsive to screen size.
All data is stored in Cloud Firestore. While preforming CRUD operations, app subscribe on changes in Firebase collection and display asynchronous data.

## Screenshots
![mockup TURN TIMER](/mockup/mockup.png)

## Technologies
* Angular 7
* Cloud Firestore (Firebase)
* JavaScript
* SCSS

## Features
* start game with random player
* change player order
* set number of players
* set turn duration
* stop countdown
TBA:
* save overall player time for statistical purposes
* prevent screen sleep

## Launch
To run this project:
clone it, go to the project directory and install it locally using npm:

`$ npm install`     
`$ ng serve`
