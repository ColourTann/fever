"use strict";
var Ability = function(image, colour){
	var ability = []
	ability.test=5;
	var buttonSprite = GAME.add.sprite(0,0,"button");
	buttonSprite.tint = colour;
	ability.buttonSprite = buttonSprite;

	var abilitySprite = GAME.add.sprite(1,1,"add");
	abilitySprite.tint = colour;
	buttonSprite.addChild(abilitySprite);
	buttonSprite.x=X_GAP;
	buttonSprite.y=(GAME_HEIGHT-ABILITY_SIZE)/2;

	buttonSprite.inputEnabled = true;
	buttonSprite.events.onInputDown.add(buttonListener, ability);
	function buttonListener(){
		
		if(STATE.state==PICKING_ABILITY){
			STATE.state = PLACING_ABILITY;
		}
	}

	return ability;
}