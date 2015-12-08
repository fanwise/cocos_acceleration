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
          cc.log(cc.container.width);



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
          var score = 0;
          stateLabel.setString("Socre:"+score);
          this.addChild(stateLabel,15);
          stateLabel.setPosition(cc.p(100,750));

          var fingerLabel = new cc.LabelTTF("labelTTF", "Arial", 24);
          fingerLabel.setString("notTouch");
          this.addChild(fingerLabel,15);
          fingerLabel.setPosition(cc.p(100,700));

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

                var pt = ball.getPosition();
                var ptx;
                                   
                if(acc.x > -0.24 && acc.x < 0.24 && ballState)
                {
                    ptx = size.width/2;
                    ballState = false;
                }

                if(acc.x < -0.25)
                {
                    ptx = size.width/4;
                    ballState = true;
                }

                if(acc.x > 0.25)
                {
                    ptx = size.width*3/4;
                    ballState = true;
                }
                var pty = pt.y;
                if(ballState)
                    ball.runAction(cc.place(cc.p( ptx, pty))); 
            }  
          }, ball);

          cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                fingerLabel.setString("Touched");
                this.touchLaction = touch.getLocation();
                return true;
            },
            onTouchMoved: function (touch, event) {
               fingerLabel.setString("Moving");
            },
            onTouchEnded: function (touch, event) {
              fingerLabel.setString("notTouch");

                var touchEnd = touch.getLocation();
                var delat = this.touchLaction.x - touchEnd.x;
                //delat取50为边界，确保不会因为误操作而变动；
                if (delat >= 50 || delat <= -50){
                    if (delat < -50){
                      if(ballPosition != 1)
                      {
                        ballPosition++;
                      }
                    }
                    else if (delat >50){
                      if(ballPosition != -1)
                      {
                        ballPosition--;
                      }
                    }

                    var p0 = ball.getPosition();
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
                    ball.runAction(cc.place(cc.p( p1x, p1y)));
                }
            }
        }, this);

          
            // cc.eventManager.addListener({
            //     event: cc.EventListener.ACCELERATION, 
            //     callback: function(acc, event){ 
            //         var size = cc.director.getWinSize();  
            //         var s = ball.getContentSize();
            //         var p0 = ball.getPosition();
                                   
  
            //         if(acc.x > -0.24 && acc.x < 0.24)
            //         {
            //           ballState = true;
            //         }

            //         if(acc.x < -0.25 && ballState)
            //         {
            //           if(ballPosition != -1)
            //           {
            //             ballPosition--;
            //           }
            //           ballState = false;
            //         }

            //         if(acc.x > 0.25 && ballState)
            //         {
            //           if(ballPosition != 1)
            //           {
            //             ballPosition++;
            //           }
            //           ballState = false;
            //         }

            //         var p1x = 0;
            //         var p1y = p0.y;
            //         if(ballPosition === 0)
            //         {
            //           p1x = size.width/2;
            //         }else if(ballPosition === 1){
            //           p1x = size.width*3/4;
            //         }else if(ballPosition === -1){
            //           p1x = size.width/4;
            //         }



  
            //         // var p1x =  p0.x + acc.x * SPEED ;  
            //         // if ((p1x - s.width/2) <0) {  
            //         //     p1x = s.width/2;
            //         // }  
            //         // if ((p1x + s.width / 2) > size.width) {
            //         //     p1x = size.width - s.width / 2; 
            //         // }  
  
  
            //         // var p1y =  p0.y + acc.y * SPEED ;   
            //         // if ((p1y - s.height/2) < 0) {  
            //         //     p1y = s.height/2;  
            //         // }  
            //         // if ((p1y + s.height/2) > size.height) {  
            //         //     p1y = size.height - s.height/2;  
            //         // }  
            //         ball.runAction(cc.place(cc.p( p1x, p1y))); 
            //     }  
            // }, ball);  
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
              }

              if(bg.getPosition().y > -450)
                bg.y = bg.getPosition().y - 0.5;
              else if(ball.getPosition().y < 620)
                ball.y = ball.getPosition().y + 0.5;
              else{
                score++;
                stateLabel.setString("Socre:"+score);
                Reset();
              }

              function Crash(player){
                if(player.x == ball.x)
                  if(player.y > ball.y && player.y - ball.y < 80)
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