var size;
var level2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1],
  [1, 1, 3, 3, 2, 0, 1],
  [1, 0, 0, 4, 0, 0, 1],
  [1, 0, 3, 1, 2, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
];
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite2; //プレイヤーのスプライト
var cratesArray = []; //配置した木箱のスプライトを配列に保持する

var startTouch;
var endTouch;
var swipeTolerance = 10;//スワイプかを判断する閾値
var gameFlag = 0;
var crateFlag = 1;

var SecondScene = cc.Scene.extend({
  onEnter: function() {
    this._super();

    var layer2 = new gameLayer2();
    layer2.init();
    this.addChild(layer2);

    //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.bgm_mp3, true);
        }


  }
});

var gameLayer2 = cc.Layer.extend({
  init: function() {
    this._super();
    //スプライトフレームのキャッシュオブジェクトを作成する
    cache = cc.spriteFrameCache;
    //スプライトフレームのデータを読み込む
    cache.addSpriteFrames(res.spritesheet_plist);
    var backgroundSprite = cc.Sprite.create(cache.getSpriteFrame("background.png"));
    //アンチエイリアス処理を止める
    backgroundSprite.getTexture().setAliasTexParameters();

    backgroundSprite.setPosition(240, 160);
    //スプライトがとても小さいので拡大する
    backgroundSprite.setScale(5);
    this.addChild(backgroundSprite);

    var levelSprite = cc.Sprite.create(cache.getSpriteFrame("level.png"));
    levelSprite.setPosition(240, 110);
    levelSprite.setScale(5);
    this.addChild(levelSprite);

    for (i = 0; i < 7; i++) {　　　　　　
      cratesArray[i] = [];　 //配列オブジェクトの生成
      for (j = 0; j < 7; j++) {
        switch (level2[i][j]) {
          case 2:
            crateFlag += 1;
          break;
          case 4:
          case 6:
            playerSprite2 = cc.Sprite.create(cache.getSpriteFrame("player.png"));
            playerSprite2.setPosition(165 + 25 * j, 185 - 25 * i);
            playerSprite2.setScale(5);
            this.addChild(playerSprite2);
            playerPosition = {
              x: j,
              y: i
            };　　　　　　　　　　　　
            cratesArray[i][j] = null;　 //playerがいるので、その場所には木箱はないのでnullを代入する
            break;
          case 3:
          case 5:
            var crateSprite2 = cc.Sprite.create(cache.getSpriteFrame("crate.png"));
            crateSprite2.setPosition(165 + 25 * j, 185 - 25 * i);
            crateSprite2.setScale(5);
            this.addChild(crateSprite2);
            cratesArray[i][j] = crateSprite2;//(i,j)の位置にcrateSpriteを入れる
            break;
          default:
            cratesArray[i][j] = null;//木箱のコード以外の場合は、その場所に木箱がない値としてnullを代入する
            break;
        }
      }
    }
    //return true;
    cc.eventManager.addListener2(listener2, this);
  },
});

var listener2 = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: true,
onTouchBegan:function (touch,event) {
startTouch = touch.getLocation();
return true;
},
onTouchEnded:function(touch, event){
endTouch = touch.getLocation();
swipeDirection();
}
});
//スワイプ方向を検出する処理
function swipeDirection2(){
    var distX2 = endTouch.x - startTouch.x ;
    var distY2 = endTouch.y - startTouch.y ;
    if(Math.abs(distX2)+Math.abs(distY2)>swipeTolerance){
        if(Math.abs(distX2)>Math.abs(distY2)){
            if(distX2>0){//右方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x+25,playerSprite.getPosition().y);
                move2(1,0);
            }
            else{//左方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x-25,playerSprite.getPosition().y);
                move2(-1,0);
            }
        }
        else{
        //  console.log("endTouch.y "+endTouch.y );
        //  console.log("startTouch.y "+startTouch.y );
        //  console.log("distY "+ distY );
            if(distY2>0){ //上方向移動
            //  playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y+25);
               console.log("上 move2(0,-1) distY2 "+ distY2 );
              move2(0,-1);

            }
            else{ //下方向移動
              //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y-25);
              console.log("下 move2(0,1) distY2 "+ distY2 );
              move2(0,1);
            }
        }
    }
}

function move2(deltaX,deltaY){
switch(level2[playerPosition.y+deltaY][playerPosition.x+deltaX]){
    case 0:
    case 2:
        level2[playerPosition.y][playerPosition.x]-=4;
        playerPosition.x+=deltaX;
        playerPosition.y+=deltaY;
        level2[playerPosition.y][playerPosition.x]+=4;
        playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);

        if(level2[playerPosition.y+deltaY][playerPosition.x+deltaX] == 5){
        gameFlag -= 1;}
    break;
    case 3:
    case 5:
        if(level2[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==0 ||
           level2[playerPosition.y+deltaY*2][playerPosition.x+deltaX*2]==2){
            level2[playerPosition.y][playerPosition.x]-=4;
            playerPosition.x+=deltaX;
            playerPosition.y+=deltaY;
            level2[playerPosition.y][playerPosition.x]+=1;
            playerSprite.setPosition(165+25*playerPosition.x,185-25*playerPosition.y);
            level2[playerPosition.y+deltaY][playerPosition.x+deltaX]+=3;

            if(level2[playerPosition.y+deltaY][playerPosition.x+deltaX] == 5 )
            gameFlag += 1;

            if(gameFlag == crateFlag){
                cc.director.runScene(new NextScene2());
            }

            var movingCrate2 = cratesArray[playerPosition.y][playerPosition.x];
            movingCrate2.setPosition(movingCrate2.getPosition().x+25*deltaX,movingCrate2.
            getPosition().y-25*deltaY);
            cratesArray[playerPosition.y+deltaY][playerPosition.x+deltaX]=movingCrate2;
            cratesArray[playerPosition.y][playerPosition.x]=null;


        }
        break;

    }
}

var SecondScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer3 = new SecondScene();
        this.addChild(layer3);

    }
});
