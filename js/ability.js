"use strict";
var Ability = function(abilityType){
	var ability = []
	ability.abilityType = abilityType;
	var colour = abilityType<10?COLOUR.bacteria:COLOUR.immune;
	var buttonSprite = GAME.add.sprite(0,0,"button");
	buttonSprite.tint = colour;
	ability.buttonSprite = buttonSprite;
	var innerSpriteString;
	switch(abilityType){
		case ABILITY_INFECT:
			innerSpriteString = "add";
			break;
		case ABILITY_SPAWN:
			innerSpriteString = "add";	
			break;

	}

	var abilitySprite = GAME.add.sprite(1,1,innerSpriteString);
	abilitySprite.tint = colour;
	buttonSprite.addChild(abilitySprite);
	buttonSprite.x=X_GAP;
	buttonSprite.y=(GAME_HEIGHT-ABILITY_SIZE)/2;

	buttonSprite.inputEnabled = true;
	buttonSprite.events.onInputDown.add(buttonListener, ability);
	function buttonListener(){
		
		if(STATE.state==PICKING_ABILITY){
			STATE.state = PLACING_ABILITY;
			STATE.currentAbility = this.abilityType;
			console.log(STATE.currentAbility);
		}
	}

	return ability;
}