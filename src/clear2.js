//nextScene.js
var NextLayer2 = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();


        var label = cc.LabelTTF.create("GameClear!!", "Arial", 26);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        var label = cc.LabelTTF.create("→FINALGAME", "Arial", 26);
        label.setPosition(size.width / 2, size.height / 4);
        this.addChild(label, 1);
        return true;

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.bgm_mp3, true);
        }


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
        // 次のシーンに切り替える

        //cc.director.runScene(new SecondScene());


    },
});


var NextScene2 = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer4 = new NextLayer2();
        this.addChild(layer4);

    }
});
