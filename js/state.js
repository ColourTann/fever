"use strict";
var State = function(){
	var state = [];
	state.state=PICKING_ABILITY;
	state.startGrowing = function(){
		this.state = GROWING;
		GRID.startGrowing();
	}
	state.finishGrowing = function(){
		this.state=PICKING_ABILITY;
		sendMessage("state", {}, true);
	}
	
	return state;
}