"use strict";
var Cell = function(){
	var cell = {};
	cell.moved = false;
	var sprite = GAME.add.sprite(0, 0,"pixel");
	sprite.tint=COLOUR.immune;
	cell.sprite=sprite;
	GRID.group.addChild(sprite);
	cell.setPosition = function(node){
		this.sprite.x=node.x*(TILE_SIZE-1);
		this.sprite.y=node.y*(TILE_SIZE-1);
		node.cell=this;
		this.node=node;
	}
	cell.select = function(selected){
		sprite.tint=selected?COLOUR.bacteria:COLOUR.immune;
	}
	cell.moveTo = function(node, send){
		if(this.node.getDistance(node)>2)return false;
		var prevNode = this.node;
		this.moved = true;
		this.setPosition(node);
		this.select(false);
		if(send){
			sendMessage(MESSAGE_MOVE, {prevX:prevNode.x, toX:this.node.x, prevY:prevNode.y,toY:this.node.y})
		}
		return true;
	}
	cell.attack = function(){
		var tiles = this.node.getTiles();
		for (var i = 0; i < tiles.length; i++) {
			var tile = tiles[i];
			if(tile.infected){
				tile.treat(true);
				return;
			}
		}
	}
	return cell;
}