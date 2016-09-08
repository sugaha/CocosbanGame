//thirdScene.js
//nextScene.js
var ClearLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("GameClear!!", "Arial", 26);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

       label2 = cc.LabelTTF.create("→NEXTGAME", "Arial", 26);
        label2.setPosition(size.width / 2, size.height / 4);
        this.addChild(label2, 1);

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },
    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        cc.director.runScene(new gameScene());

    if(stage == 0){
      var level = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 3, 0, 2, 0, 1],
        [1, 0, 0, 4, 0, 0, 1],
        [1, 0, 3, 1, 2, 0, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];
      var back_map = [  //リセット用
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 3, 0, 2, 0, 1],
        [1, 0, 0, 4, 0, 0, 1],
        [1, 0, 3, 1, 2, 0, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];
    }
    else if(stage == 1){
      var level = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 3, 0, 0, 1],
        [1, 1, 3, 0, 2, 0, 1],
        [1, 0, 0, 4, 0, 2, 1],
        [1, 0, 3, 1, 2, 0, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];
      var back_map = [  //リセット用
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 3, 0, 0, 1],
        [1, 1, 3, 0, 2, 0, 1],
        [1, 0, 0, 4, 0, 2, 1],
        [1, 0, 3, 1, 2, 0, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];
     }
     else if(stage == 2){
       var level = [
         [1, 1, 1, 1, 1, 1, 1],
         [1, 1, 0, 3, 0, 0, 1],
         [1, 1, 3, 0, 2, 0, 1],
         [1, 0, 0, 4, 0, 0, 1],
         [1, 0, 3, 1, 2, 0, 1],
         [1, 0, 0, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1]
       ];
       var back_map = [  //リセット用
         [1, 1, 1, 1, 1, 1, 1],
         [1, 1, 0, 3, 0, 0, 1],
         [1, 1, 3, 0, 2, 0, 1],
         [1, 0, 0, 4, 0, 0, 1],
         [1, 0, 3, 1, 2, 0, 1],
         [1, 0, 0, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1]
       ];
      }
  },
});

var ClearScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        //格子状に配置するレイヤー
        var layer1 = new ClearLayer();
        this.addChild(layer1);

    }
});
