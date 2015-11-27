window.onload = function(){
  cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(450,800,cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(["HelloWorld.png",res.Background], function () {
      var MyScene = cc.Scene.extend({
        ctor:function(){
          this._super();

          cc.log("HelloWorld init");



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

          var stateLabel = new cc.LabelTTF("labelTTF", "Arial", 24);
          stateLabel.setString("Alive");
          this.addChild(stateLabel,15);
          stateLabel.setPosition(cc.p(100,750));

          var anti = new cc.Sprite(res.Anti);
          anti.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
          anti.y = size.height - 40;
          this.addChild(anti,10);

          var anti2 = new cc.Sprite(res.Anti);
          anti2.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
          anti2.y = size.height - 240;
          this.addChild(anti2,10);

          var anti3 = new cc.Sprite(res.Anti);
          anti3.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
          anti3.y = size.height - 440;
          this.addChild(anti3,10);

          var anti4 = new cc.Sprite(res.Anti);
          anti4.x = size.width/4;
          anti4.y = size.height - 640;
          this.addChild(anti4,10);

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

              function Reset(){
                bg.x = size.width/2;  
                bg.y = 1250;

                ball.x = size.width/2;
                ball.y = size.height/4;

                anti.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti.y = size.height - 40;

                anti2.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti2.y = size.height - 240;

                anti3.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti3.y = size.height - 440;


                anti4.x = size.width/4;
                anti4.y = size.height - 640;

                stateLabel.setString("Alive");
              }

              if(bg.getPosition().y > -450)
                bg.y = bg.getPosition().y - 0.5;
              else if(ball.getPosition().y < 600)
                ball.y = ball.getPosition().y + 0.5;
              else{
                Reset();
              }

              function Crash(player){
                if(player.x == ball.x)
                  if(player.y - ball.y < 80)
                    Reset();
                    //stateLabel.setString("Death");
              }

              anti.y = anti.getPosition().y - 1.5;
              Crash(anti);
              if(anti.y < -40)
              {
                anti.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti.y = size.height - 40;
              }

              anti2.y = anti2.getPosition().y - 1.5;
              Crash(anti2);
              if(anti2.y < -40)
              {
                anti2.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti2.y = size.height - 40;
              }

              anti3.y = anti3.getPosition().y - 1.5;
              Crash(anti3);
              if(anti3.y < -40)
              {
                anti3.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti3.y = size.height - 40;
              }

              anti4.y = anti4.getPosition().y - 1.5;
              Crash(anti4);
              if(anti4.y < -40)
              {
                anti4.x = size.width/2 + (Math.round(Math.random()*2)-1)*size.width/4;
                anti4.y = size.height - 40;
              }
            });
        }
      });
      cc.director.runScene(new MyScene());
    }, this);
  };
  cc.game.run("gameCanvas");
};