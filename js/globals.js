"use strict";
var GAME;

var GRID;
var STATE;
var CURRENT_ABILITY;

var infector;
var myTurn;

var PICKING_ABILITY = 5;
var PLACING_ABILITY = 6;
var GROWING = 7;
var MOVING = 8;

var ABILITY_INFECT = 5;
var ABILITY_SPAWN = 10;

var GAME_WIDTH = 60;
var GAME_HEIGHT = 40;
var TILES_ACROSS = 10;
var TILES_DOWN = 8;
var TILE_SIZE = 5;
var GRID_WIDTH = TILES_ACROSS * (TILE_SIZE-1)+1;
var GRID_HEIGHT = TILES_DOWN * (TILE_SIZE-1)+1;
var ABILITY_SIZE = 7;

var X_GAP = (GAME_WIDTH - GRID_WIDTH - ABILITY_SIZE)/3;
var SCALE = 15;
var COLOUR =[];

COLOUR.bacteria = 0x7b2323; 
COLOUR.immune = 0xfff48c; 
COLOUR.grid = 0x415463; 
COLOUR.hub = 0x643287; 
COLOUR.dark = 0x221111; 

var MESSAGE_INFECT = "infect";
var MESSAGE_STATE = "state";