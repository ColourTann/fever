"use strict";
var State = function(){
	var state = [];
	state.state=PICKING_ABILITY;
	state.startGrowing = function(){
		this.state = GROWING;
		GRID.startGrowing();
	}
	return state;
}