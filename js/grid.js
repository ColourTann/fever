"use strict";
var Grid = function(){
	var grid = [];
	var allTiles = [];
	var tiles = new Array(GRID_WIDTH);
	for(var i=0;i<tiles.length;i++){
		tiles[i] = new Array(GRID_HEIGHT);
	}
	grid.allTiles = allTiles;
	grid.tiles = tiles;
	var group = GAME.add.group();
	var clickRegion = GAME.add.sprite(0,0,"blank");
	group.addChild(clickRegion);
	clickRegion.width = GRID_WIDTH;
	clickRegion.height = GRID_HEIGHT;
	grid.clickRegion = clickRegion;

	grid.group=group;
	  for(var x=0;x<TILES_ACROSS;x++){
        for(var y=0;y<TILES_DOWN;y++){
			if((x==0||x==TILES_ACROSS-1) && (y==0||y==TILES_DOWN-1)) continue;
            var tile = new Tile(x, y);
            tiles[x][y] = tile;
            allTiles.push(tile);
            group.addChild(tile.sprite);
        }    
    }
    clickRegion.inputEnabled = true;
	clickRegion.events.onInputDown.add(listener, grid);

	grid.getTile = function(x, y){
		if(x>=GRID_WIDTH||x<0) return null;
		return tiles[x][y];
	}

	grid.clickOnTile= function(tile, leftButton){
		switch(STATE.state){
			case GROWING:
				tile.infect(false);
			break;
		}


		if(leftButton){
			tile.infect(true);	
		}
		else{
			
		}
		//console.log(tile.x+":"+tile.y+": clicked!")
		
		if(STATE.state == PLACING_ABILITY){
			
			/*STATE.state = GROWING;
			console.log(STATE)
			STATE.startGrowing();*/
		}	
	}

	grid.startGrowing = function(){
		if(this.origin!=null){
			var adj = this.origin.getContiguousInfected();
			for(var i=0;i<adj.length;i++){
				adj[i].stopGrowth();
			}
		}
		for(var i=0;i<allTiles.length;i++){
			var tile = allTiles[i];
			if(tile.infected && !tile.grown){
				console.log(tile.grow);
				console.log(tile);
				this.originateGrowth(tile);
				return;
			}
		}
	}

	grid.originateGrowth = function(tile){
		this.origin = tile;
		var adj = tile.getContiguousInfected();
		for(var i=0;i<adj.length;i++){
			adj[i].readyToGrow();
		}
	}
	

	function listener(test, pointer){
		var clickX = GAME.input.x-group.x;
		var clickY = GAME.input.y-group.y;
		var tileX = Math.floor(clickX / (TILE_SIZE-1));
		var tileY = Math.floor(clickY / (TILE_SIZE-1));
		var tile = tiles[tileX][tileY];
		if(tile!=null){
			//console.log(this);
			this.clickOnTile(tile, GAME.input.activePointer.leftButton.isDown);
		}
	}
	
	group.x=ABILITY_SIZE + X_GAP*2;
	group.y=(GAME_HEIGHT-GRID_HEIGHT)/2;
	return grid;
}