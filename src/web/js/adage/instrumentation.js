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






 /*----------------------------------------- 
  Kaiopua's Signals listeners
 -------------------------------------------*/
   function onAssetReady( ){console.log("onAssetReady "); console.log( arguments );}
 function onError( ){console.log("onError "); console.log( arguments );}
 function onFocusGained( ){console.log("onFocusGained "); console.log( arguments );}
 function onFocusLost( ){console.log("onFocusLost "); console.log( arguments );}
 function onGamePaused( ){console.log("onGamePaused "); console.log( arguments );}
 function onGamePointerDoubleTapped(){console.log("onGamePointerDoubleTapped "); console.log( arguments );}
 function onGamePointerDragEnded(){console.log("onGamePointerDragEnded "); console.log( arguments );}
 function onGamePointerDragStarted(){console.log("onGamePointerDragStarted "); console.log( arguments );}
 function onGamePointerDragged(){console.log("onGamePointerDragged "); console.log( arguments );}
 function onGamePointerHeld( ){console.log("onGamePointerHeld "); console.log( arguments );}
 
 function onGamePointerMoved( ){console.log("onGamePointerMoved "); console.log( arguments );}
 
 function onGamePointerTapped(){console.log("onGamePointerTapped "); console.log( arguments );} 
 function onGamePointerWheel( ){console.log("onGamePointerWheel "); console.log( arguments );}
 function onGameResumed( ){console.log("onGameResumed "); console.log( arguments );}
 function onGameStarted( ){console.log("onGameStarted "); console.log( arguments );}
 function onGameStopped( ){console.log("onGameStopped "); console.log( arguments );}
 function onGameUpdated( ){
   //called each frame!
   //console.log("onGameUpdated "); console.log( arguments );
 }
 function onKeyPressed( ){
  //console.log("onKeyPressed "); console.log( arguments );
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

 function onKeyReleased( ){console.log("onKeyReleased "); console.log( arguments );}
 function onLoadAllCompleted( ){console.log("onLoadAllCompleted "); console.log( arguments );}
 function onLoadItemCompleted(){console.log("onLoadItemCompleted "); console.log( arguments );} 
 function onLoadListCompleted(){console.log("onLoadListCompleted "); console.log( arguments );}
 function onUpdated( ){
   //called each frame! 
   //console.log("onUpdated "); console.log( arguments );
 }
 function onWindowResized( ){console.log("onWindowResized "); console.log( arguments );}

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
