"use strict";
var State = function(){
	var state = {};
	state.startGrowing = function(){
		this.state = GROWING;
		GRID.startGrowing();
	}
	state.finishGrowing = function(){
		this.finishTurn();
	}
	state.finishTurn = function(){
		toggleTurn();
		sendMessage("state", {}, true);	
	}
	
	return state;
}