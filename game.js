window.onload = function(){
  cc.game.onStart = function(){
    cc.LoaderScene.preload(["HelloWorld.png"], function () {
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
          bg.y = size.height/2;  
          this.addChild(bg, 0, 0);  

          var ball = new cc.Sprite(res.Ball);
          ball.x = size.width/2;
          ball.y = size.height/2;
          this.addChild(ball,10);

          cc.inputManager.setAccelerometerEnabled(true);
          
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION, 
                callback: function(acc, event){ 
                    var size = cc.director.getWinSize();  
                    var s = ball.getContentSize();
                    var p0 = ball.getPosition();  
  
  
                    var p1x =  p0.x + acc.x * SPEED ;  
                    if ((p1x - s.width/2) <0) {  
                        p1x = s.width/2;
                    }  
                    if ((p1x + s.width / 2) > size.width) {
                        p1x = size.width - s.width / 2; 
                    }  
  
  
                    var p1y =  p0.y + acc.y * SPEED ;   
                    if ((p1y - s.height/2) < 0) {  
                        p1y = s.height/2;  
                    }  
                    if ((p1y + s.height/2) > size.height) {  
                        p1y = size.height - s.height/2;  
                    }  
                    ball.runAction(cc.place(cc.p( p1x, p1y))); 
                }  
            }, ball);  
        }
      });
      cc.director.runScene(new MyScene());
    }, this);
  };
  cc.game.run("gameCanvas");
};