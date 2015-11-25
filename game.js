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
          var rect = new cc.DrawNode();
          rect.drawRect(cc.p(0,0),cc.p(300,300),cc.color(),5,cc.color(255,0,0,255));
          this.addChild(rect);
          rect.setPositionX(size.width/2);
          rect.setPositionY(size.height/2);

          rect.setContentSize(cc.size(300,300));
          rect.setAnchorPoint(cc.p(0.5,0.5));


          this.schedule(function(f){
            rect.setRotation(rect.getRotation()+1);
          })
        }
      });
      cc.director.runScene(new MyScene());
    }, this);
  };
  cc.game.run("gameCanvas");
};