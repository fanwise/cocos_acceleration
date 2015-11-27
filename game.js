window.onload = function(){
  cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(450,800,cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(["HelloWorld.png",res.Background], function () {
      var MyScene = cc.Scene.extend({
        ctor:function(){
          this._super();

          cc.log("HelloWorld init")



          return true;
        },
        onEnter:function () {
          this._super();
                              
          var size = cc.winSize;

          var SPEED = 10;

          var bg = new cc.Sprite(res.Background);  
          bg.x = size.width/2;  
          bg.y = 1250; 
          this.addChild(bg, 0, 0);  

          var ball = new cc.Sprite(res.Player);
          ball.x = size.width/2;
          ball.y = size.height/4;
          this.addChild(ball,10);

          var ballPosition = 0;
          var ballState = false; 

          cc.inputManager.setAccelerometerEnabled(true);
          
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION, 
                callback: function(acc, event){ 
                    var size = cc.director.getWinSize();  
                    var s = ball.getContentSize();
                    var p0 = ball.getPosition();
                                   
  
                    if(acc.x > -0.28 && acc.x < 0.28)
                    {
                      ballState = true;
                    }

                    if(acc.x < -0.3 && ballState)
                    {
                      if(ballPosition != -1)
                      {
                        ballPosition--;
                      }
                      ballState = false;
                    }

                    if(acc.x > 0.3 && ballState)
                    {
                      if(ballPosition != 1)
                      {
                        ballPosition++;
                      }
                      ballState = false;
                    }

                    var p1x = 0;
                    var p1y = p0.y;
                    if(ballPosition === 0)
                    {
                      p1x = size.width/2;
                    }else if(ballPosition === 1){
                      p1x = size.width*3/4;
                    }else if(ballPosition === -1){
                      p1x = size.width/4;
                    }



  
                    // var p1x =  p0.x + acc.x * SPEED ;  
                    // if ((p1x - s.width/2) <0) {  
                    //     p1x = s.width/2;
                    // }  
                    // if ((p1x + s.width / 2) > size.width) {
                    //     p1x = size.width - s.width / 2; 
                    // }  
  
  
                    // var p1y =  p0.y + acc.y * SPEED ;   
                    // if ((p1y - s.height/2) < 0) {  
                    //     p1y = s.height/2;  
                    // }  
                    // if ((p1y + s.height/2) > size.height) {  
                    //     p1y = size.height - s.height/2;  
                    // }  
                    ball.runAction(cc.place(cc.p( p1x, p1y))); 
                }  
            }, ball);  
            this.schedule(function(f){
              if(bg.getPosition().y > -450)
                bg.y = bg.getPosition().y - 0.5;
              else if(ball.getPosition().y < 600)
                ball.y = ball.getPosition().y + 0.5;
            });
        }
      });
      cc.director.runScene(new MyScene());
    }, this);
  };
  cc.game.run("gameCanvas");
};