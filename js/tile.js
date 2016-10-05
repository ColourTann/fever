"use strict";
var Tile = function(x, y){
	var tile = [];
	tile.grow=false;
	tile.infected = false;
	tile.x=x;
	tile.y=y;
	var sprite = GAME.add.sprite(x*(TILE_SIZE-1), y*(TILE_SIZE-1), 'tile');
	sprite.tint = COLOUR.grid;
	var infectSprite = GAME.add.sprite(1, 1, 'pixel');
	tile.infectSprite = infectSprite;
	infectSprite.width = TILE_SIZE-2;
	infectSprite.height = TILE_SIZE-2;
	sprite.addChild(infectSprite);
	
	var innerSprite = GAME.add.sprite(2, 2, 'pixel');
	innerSprite.tint=COLOUR.grid;
	innerSprite.alpha=0;
	tile.innerSprite=innerSprite;
    tile.sprite = sprite;
    sprite.addChild(innerSprite);

	tile.setColour = function(colour){
		this.infectSprite.tint = colour;
	}

	tile.showInner = function(show){
		this.innerSprite.alpha=show?1:0;
	}

	tile.setColour(COLOUR.dark);


	tile.readyToGrow = function(){
		this.growing = true;
		this.showInner(true);
		sendThing({test:1})
	}

	tile.stopGrowth = function(){
		this.growing = false;
		this.grown = true;
		this.showInner(false);
	}

	tile.getContiguousInfected = function(){
		var result = new Array();
		var open = new Array();
		if(this.infected){
			result.push(this);
			open.push(this);	
		}
		while(open.length>0){
			var tile = open[0];
			open.splice(0,1);
			var adjacents = tile.getAdjacent();
			for(var i=0;i<adjacents.length;i++){
				var potential = adjacents[i];
				if(result.indexOf(potential)!=-1 || !potential.infected) continue;
				result.push(potential);
				open.push(potential);
			}
		}
		return result;
	}

	tile.getAdjacent = function(){
		var result = new Array();
		for(var dx=-1;dx<=1;dx++){
			for(var dy=-1;dy<=1;dy++){
				if(Math.abs(dx)==Math.abs(dy))continue;

				var potential = GRID.getTile(this.x+dx, this.y+dy)
				if(potential!=null){
					result.push(potential);
				}
			}	
		}
		return result;
	}

	tile.infect = function(initial){
		this.infected=true;
		if(!initial) this.grow=true;
		this.infectSprite.tint=COLOUR.bacteria;
	}

	tile.isAdjacentToGrowing = function(){
		var adj = this.getAdjacent();
		for(var i=0;i<adj.length;i++){
			if(adj[i].growing) return true;
		}
		return false;
	}

	return tile;
}