"use strict";
var Grid = function(){
	var grid = [];
	var allTiles = [];
	var allNodes = [];
	var tiles = new Array(GRID_WIDTH);
	var nodes = new Array(GRID_WIDTH+1);
	for(var i=0;i<tiles.length;i++){
		tiles[i] = new Array(GRID_HEIGHT);
	}
	for(var i=0;i<tiles.length+1;i++){
		nodes[i] = new Array(GRID_HEIGHT);
	}
	grid.allTiles = allTiles;
	grid.tiles = tiles;
	var group = GAME.add.group();
	var clickRegion = GAME.add.sprite(-1,-1,"blank");
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

    for(var x=0;x<TILES_ACROSS+1;x++){
        for(var y=0;y<TILES_DOWN+1;y++){
			if((x==0||x==TILES_ACROSS) && (y==0||y==TILES_DOWN)) continue;
            var node = new Node(x, y);
            nodes[x][y] = node;
            allNodes.push(tile);
        }    
    }
   


    clickRegion.inputEnabled = true;
	clickRegion.events.onInputDown.add(listener, grid);

	grid.getTile = function(x, y){
		if(x>=GRID_WIDTH||x<0) return null;
		return tiles[x][y];
	}

	grid.clickOnTile= function(tile, leftButton){
		if(!myTurn) return;
		switch(STATE.state){
			case PLACING_ABILITY:
				tile.infect(true, true);
				STATE.startGrowing();
				break;
			case GROWING:
				if(tile.isAdjacentToGrowing()){
					tile.infect(false, true);
					this.tilesToInfect--;
					if(this.tilesToInfect==0){
						this.startGrowing();
					}
				}
				break;
		}
	}

	grid.getNode = function(x, y){
		if(x>GRID_WIDTH||x<0) return null;
		return nodes[x][y];
	}

	grid.clickOnNode= function(node, leftButton){
		if(!myTurn) return;
		switch(STATE.state){
			case PLACING_ABILITY:
				node.spawn();
				STATE.state=MOVING;
				break;
			case MOVING:

			break;
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
				this.originateGrowth(tile);
				return;
			}
		}
		for(var i=0;i<allTiles.length;i++){
			allTiles[i].grown=false;
			allTiles[i].growing=false;
		}
		this.origin=null;
		STATE.finishGrowing();
	}

	grid.originateGrowth = function(tile){
		this.origin = tile;
		var adj = tile.getContiguousInfected();
		for(var i=0;i<adj.length;i++){
			adj[i].readyToGrow();
		}
		this.tilesToInfect = Math.floor(adj.length/3)+2;
	}
	
	grid.setup = function(){
		nodes[5][3].makeCenter();
	    nodes[3][5].makeCenter();
	    nodes[7][5].makeCenter();
	}

	function listener(test, pointer){
		var clickX = GAME.input.x-group.x;
		var clickY = GAME.input.y-group.y;
		if(STATE.currentAbility == ABILITY_INFECT){
			this.checkTileClicked(clickX, clickY);
		}

		if(STATE.currentAbility == ABILITY_SPAWN){
			this.checkNodeClicked(clickX, clickY);
		}



		
	}

	grid.checkTileClicked = function(clickX, clickY){
		
		var tileX = Math.floor(clickX / (TILE_SIZE-1));
		var tileY = Math.floor(clickY / (TILE_SIZE-1));
		var tile = this.getTile(tileX, tileY);
		if(tile!=null){
			this.clickOnTile(tile, GAME.input.activePointer.leftButton.isDown);
		}
	}

	grid.checkNodeClicked = function(clickX, clickY){
		
		clickY += .5; //hacky thing
		//console.log(clickX+":"+clickY);
		if(clickX%(TILE_SIZE-1) == 2 || clickY%(TILE_SIZE-1) == 2){ //gotta make this code better at some point
			return;
		}
		
		var nodeX = Math.floor((clickX+1) / (TILE_SIZE-1));
		var nodeY = Math.floor((clickY+1) / (TILE_SIZE-1));
		//console.log(clickX / (TILE_SIZE-1)+":"+clickY / (TILE_SIZE-1));
		var node = this.getNode(nodeX, nodeY);
		if(node!=null){
			this.clickOnNode(node, GAME.input.activePointer.leftButton.isDown);
		}
	}
	
	group.x=ABILITY_SIZE + X_GAP*2;
	group.y=(GAME_HEIGHT-GRID_HEIGHT)/2;
	return grid;
}