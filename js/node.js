"use strict";
var Node = function(x, y){
	var node = [];
	node.x=x;
	node.y=y;
	node.makeCenter=function(){
		this.center=true;
		var sprite = GAME.add.sprite(this.x*(TILE_SIZE-1)-1,this.y*(TILE_SIZE-1)-1,"pixel");
		sprite.scale.setTo(3,3);
		sprite.tint=COLOUR.hub;
		GRID.group.addChild(sprite);
		this.centerSprite=sprite;
	}

	return node;

}