"use strict";
var Node = function(x, y){
	var node = {};
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
	node.spawn = function(send){
		var cell = new Cell();
		this.cell=cell;
		GRID.allCells.push(cell);
		cell.setPosition(this);
		if(send){
			sendMessage(MESSAGE_SPAWN, {x:this.x,y:this.y});
		}
	}
	node.getDistance = function(node){
		return Math.abs(node.x-this.x)+Math.abs(node.y-this.y);
	}
	node.getTiles = function(){
		var tiles = [];
		for(var x=-1;x<=0;x++){
			for(var y=-1;y<=0;y++){
				tiles.push(GRID.getTile(this.x+x, this.y+y));
			}
		}
		return tiles;
	}
	return node;

}