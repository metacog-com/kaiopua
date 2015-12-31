(function(ADAGE, Metacog, KAIOPUA){


  /*
   * return a base object to be used to build the other data types
   */
  adage_data = function(props){
     props.application_name= 'kaiopua';
     props.application_version= '0.1';
     props.adage_version= '0.1';
     props.timestamp= Date.now();
     props.session_token= Metacog.Config.session.session_id;
     props.game_id= Metacog.Config.session.application_id;
     props.ada_base_types= '';
     props.key= 'unknown';
    return props;
  }

  adage_context_start = function(props, name){
    props.name = name;
    props.parent_name = "none"; 
    props.success = false;
    return props; 
  }

  adage_game_event = function(props){
    props.virtual_context = "undefined";
    return props; 
  }

  /*we are going to use the existing adage types, but also let extend some custom events*/
  var EventGameStarted = function(){
    var p = adage_data({});
    ADAGE.Data.call(this, p); 
    this.type = function(){return "GameStarted";}; 
  };
  EventGameStarted.prototype = Object.create(ADAGE.Data.prototype);
  EventGameStarted.prototype.constructor = EventGameStarted;

  var EventPuzzleStarted = function(name){
    var p = adage_data({});
    p = adage_context_start(p, name); 
    ADAGE.ContextStart.call(this, p); 
    this.type = function(){return "PuzzleStarted";}; 
  };
  EventPuzzleStarted.prototype = Object.create(ADAGE.ContextStart.prototype);
  EventPuzzleStarted.prototype.constructor = EventPuzzleStarted;

  var EventPuzzleStopped = function(puzzle){
    var p = adage_data({});
    p = adage_context_start(p, puzzle.name); 
    ADAGE.ContextEnd.call(this, p); 
    this.numElementsMin = puzzle.numElementsMin;
    this.numElementsUsed = puzzle.numElementsUsed;
    this.numShapesRequired = puzzle.numShapesRequired;
    this.completed = puzzle.completed;
    this.score = puzzle.score;
    this.scorePct = puzzle.scorePct;
    this.type = function(){return "PuzzleStopped";}; 
  };
  EventPuzzleStopped.prototype = Object.create(ADAGE.ContextEnd.prototype);
  EventPuzzleStopped.prototype.constructor = EventPuzzleStopped;

  var EventPlantPlanted = function(map){
    var p = adage_data({});
    p = adage_game_event(p);
    ADAGE.GameEvent.call(this, p); 
    this.map = map; 
    this.type = function(){return "PlantPlanted";}; 
  };
  EventPlantPlanted.prototype = Object.create(ADAGE.GameEvent.prototype);
  EventPlantPlanted.prototype.constructor = EventPlantPlanted;

  var EventPlantRemoved = function(map){
    var p = adage_data({});
    p = adage_game_event(p);
    ADAGE.GameEvent.call(this, p); 
    this.map = map; 
    this.type = function(){return "PlantRemoved";}; 
  }
  EventPlantRemoved.prototype = Object.create(ADAGE.GameEvent.prototype);
  EventPlantRemoved.prototype.constructor = EventPlantRemoved;


  /*------------------------------------------------
   * helper methods
   * -----------------------------------------------*/

  /**
   * returns a string-codified version of the status of the current puzzle
   */
  function map(){
    //this is not null only transiently..
    var map = ""; 
    var separator = "";
    
    if(KAIOPUA.shared.player.planting.module){
      var grid = KAIOPUA.shared.player.planting.module.grid;
    }else {
      grid = KAIOPUA.shared.player.planting.puzzle.grid;
    }

    grid.children.forEach(function(c){
      map = map + separator + (c.occupied?"1":"0");
      separator=",";
    });
    return map; 
  }


 /*----------------------------------------- 
  Kaiopua's Signals listeners
 -------------------------------------------*/
   function onAssetReady( ){
     //console.log("onAssetReady "); console.log( arguments );
     }
 function onError( ){console.log("onError "); console.log( arguments );}
 function onFocusGained( ){
   //console.log("onFocusGained "); console.log( arguments );
   }
 function onFocusLost( ){
   //console.log("onFocusLost "); console.log( arguments );
 }
 function onGamePaused( ){console.log("onGamePaused "); console.log( arguments );}
 function onGamePointerDoubleTapped(){console.log("onGamePointerDoubleTapped "); console.log( arguments );}
 function onGamePointerDragEnded(){console.log("onGamePointerDragEnded "); console.log( arguments );}
 function onGamePointerDragStarted(){console.log("onGamePointerDragStarted "); console.log( arguments );}
 function onGamePointerDragged(){
   //console.log("onGamePointerDragged "); console.log( arguments );
}
 function onGamePointerHeld( ){console.log("onGamePointerHeld "); console.log( arguments );}
 
 function onGamePointerMoved( ){
   //console.log("onGamePointerMoved "); 
   //console.log( arguments );
  }
 
 function onGamePointerTapped(){
   //console.log("onGamePointerTapped "); console.log( arguments );
   } 
 function onGamePointerWheel( ){
   //console.log("onGamePointerWheel "); console.log( arguments );
   }
 function onGameResumed( ){console.log("onGameResumed "); console.log( arguments );}

 //triggered only once, when pressing the start button 
 function onGameStarted( ){
  console.log("*************onGameStarted************"); console.log( arguments );
  KAIOPUA.shared.player.planting.onPlantSelected.add(onPlantSelected);
  KAIOPUA.shared.player.planting.onPlantStarted.add(onPlantStarted);
  KAIOPUA.shared.player.planting.onPlantStopped.add(onPlantStopped);
  KAIOPUA.shared.player.planting.onPlanted.add(onPlanted);
  KAIOPUA.shared.player.planting.onPlantedMulti.add(onPlantedMulti);
  KAIOPUA.shared.player.planting.onPlantedSingle.add(onPlantedSingle);
  KAIOPUA.shared.player.planting.onPuzzleSelected.add(onPuzzleSelected);
  KAIOPUA.shared.player.planting.onPuzzleStarted.add(onPuzzleStarted);
  KAIOPUA.shared.player.planting.onPuzzleStopped.add(onPuzzleStopped);
  var ev = new EventGameStarted();
  ADAGE.log(ev); 
  }

 function onGameStopped( ){console.log("onGameStopped "); console.log( arguments );}
 function onGameUpdated( ){
   //called each frame!
   //console.log("onGameUpdated "); console.log( arguments );
 }
 function onKeyPressed( ){
  var p = KAIOPUA.shared.player;
  if(p.state.moving){
    var pc = adage_data({
      x: p.position.x, 
      y: p.position.y,
      z: p.position.z,
      rotx: p.rotation.x,
      roty: p.rotation.y,
      rotz: p.rotation.z
    });
    ADAGE.log(new ADAGE.PositionalContext(pc)); 
  }
 }

 function onKeyReleased( ){
   //console.log("onKeyReleased "); console.log( arguments );
   }

 function onLoadAllCompleted( ){
   //console.log("onLoadAllCompleted "); console.log( arguments );
   }
  
 function onLoadItemCompleted(){
   //console.log("onLoadItemCompleted "); console.log( arguments );
   } 

 function onLoadListCompleted(){
  // console.log("onLoadListCompleted "); console.log( arguments );
 }
 function onUpdated( ){
   //called each frame! 
   //console.log("onUpdated "); console.log( arguments );
 }
 function onWindowResized( ){
   //console.log("onWindowResized "); console.log( arguments );
 }


  function onPlantSelected(){
    console.log("***********onPlantSelected************");
    console.log(arguments); 
  };
  function onPlantStarted(){
    console.log("************onPlantStarted***********");
    console.log(arguments); 
  };
  function onPlantStopped(){
    console.log("**********onPlantStopped***********");
    //this object becomes undefined if dragging a plant outside of the puzzle
    if(!KAIOPUA.shared.player.planting.module){
      ADAGE.log(new EventPlantRemoved(map()));  
    }
  };
  
  function onPlanted(){
    console.log("*******onPlanted**********");
    ADAGE.log(new EventPlantPlanted(map())); 
  };

  function onPlantedMulti(){
    console.log("**********onPlantedMulti**********");
    console.log(arguments); 
  };

  function onPlantedSingle(){
    console.log("************onPlantedSingle********");
    console.log(arguments); 
  };

 function onPuzzleSelected(){
  console.log("onPuzzleSelected");
  console.log(arguments); 
 };
  
  function onPuzzleStarted(puzzle){
    console.log("********* onPuzzleStarted "+ puzzle.name);
    puzzle.onCompleted.add(onCompleted);
    puzzle.onShapeAdded.add(onShapeAdded);
    puzzle.onShapeRemoved.add(onShapeRemoved);
    puzzle.onShapesNeeded.add(onShapesNeeded);
    puzzle.onShapesReady.add(onShapesReady);
    puzzle.onStateChanged.add(onStateChanged);

    ADAGE.log(new EventPuzzleStarted(puzzle.name)); 
  };
  
  function onPuzzleStopped(puzzle){
    console.log("**********onPuzzleStopped**************");
    //console.log(KAIOPUA.shared.player.planting.puzzle);
    //console.log(KAIOPUA.shared.player.planting.puzzleLast);
    ADAGE.log(new EventPuzzleStopped(puzzle));
  };

  function onCompleted(){console.log("onCompleted");};
 
  function onShapeAdded(){
    console.log("onShapeAdded");
    console.log(arguments); 
  };
  function onShapeRemoved(){
    console.log("onShapeRemoved");
    console.log(arguments); 
  };
  function onShapesNeeded(){console.log("onShapesNeeded");};
  function onShapesReady(){console.log("onShapesReady");};
  
  function onStateChanged(){
    console.log("onStateChanged");
    console.log(arguments); 
  };

 /*-------------------------------
  * attaching listeners to signals
  * --------------------------------*/
 KAIOPUA.shared.signals.onAssetReady.add( onAssetReady);
// KAIOPUA.shared.signals.onError.add( onError);
 KAIOPUA.shared.signals.onFocusGained.add( onFocusGained);
 KAIOPUA.shared.signals.onFocusLost.add( onFocusLost);
 KAIOPUA.shared.signals.onGamePaused.add( onGamePaused);
 KAIOPUA.shared.signals.onGamePointerDoubleTapped.add( onGamePointerDoubleTapped);
 KAIOPUA.shared.signals.onGamePointerDragEnded.add( onGamePointerDragEnded);
 KAIOPUA.shared.signals.onGamePointerDragStarted.add( onGamePointerDragStarted);
 KAIOPUA.shared.signals.onGamePointerDragged.add( onGamePointerDragged);
 KAIOPUA.shared.signals.onGamePointerHeld.add( onGamePointerHeld);
 KAIOPUA.shared.signals.onGamePointerMoved.add( onGamePointerMoved);
 KAIOPUA.shared.signals.onGamePointerTapped.add( onGamePointerTapped);
 KAIOPUA.shared.signals.onGamePointerWheel.add( onGamePointerWheel);
 KAIOPUA.shared.signals.onGameResumed.add( onGameResumed);
 KAIOPUA.shared.signals.onGameStarted.add( onGameStarted);
 KAIOPUA.shared.signals.onGameStopped.add( onGameStopped);
 KAIOPUA.shared.signals.onGameUpdated.add( onGameUpdated);
 KAIOPUA.shared.signals.onKeyPressed.add( onKeyPressed);
 KAIOPUA.shared.signals.onKeyReleased.add( onKeyReleased);
 KAIOPUA.shared.signals.onLoadAllCompleted.add( onLoadAllCompleted);
 KAIOPUA.shared.signals.onLoadItemCompleted.add( onLoadItemCompleted);
 KAIOPUA.shared.signals.onLoadListCompleted.add( onLoadListCompleted);
 KAIOPUA.shared.signals.onUpdated.add( onUpdated);
 KAIOPUA.shared.signals.onWindowResized.add( onWindowResized);

  Metacog.init({
    "session": {
        "publisher_id": '9d10ead1',
        "application_id": 'c7f16e0b559f05489e2b900f52f08a99',
        "widget_id": 'kaiopua'
    },
    "log_tab":true,
    mode:"production"
  });

  Metacog.Logger.start(); 

})(window.ADAGE, window.Metacog, window.KAIOPUA);
