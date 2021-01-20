import Hilo from "hilojs";
import Asset from './Asset'
import Zongzi from './Zongzi'
import Hand from './hand'
export default class game {
    constructor(page) {
        this.page = page
        //设置的游戏时间
        this.setGameTime = 30
        this.gameTime = 0
        this.gameStatus = "ready"
        /*
          play 游戏开始
          ready 游戏结束
        **/
        // 下载队列
        this.asset = new Asset()
 
        // 画布对象
        this.stage = null
 
        // 画布信息 
        this.width = innerWidth * 2
        // this.height = innerHeight * 2 < 1334 ? innerHeight * 2 : 1334
        this.height = innerHeight * 2
        this.scale = 0.5
 
        // 定时器对象
        this.ticker = null
 
        //粽子对象
        this.Zongzi = null
        //粽子下落速度
        this.enemySpeed = 700
        //粽子生成速度
        this.createSpeed = 600
        //接粽子的手
        this.hand = null
        //开始按钮
        this.beginBtn = null
        //血条
        this.blood = 3
        // 金币
        this.coin = 0
        // 是否有护盾
        this.protect = false
        this.speedTimeout = null
 
 
    }
    init() {
        this.asset.on('complete', function () {
            this.asset.off('complete')
            this.initStage()
        }.bind(this));
        this.asset.load()
    }
    initStage() {
        // 舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale,
            container: this.page
        });
        this.stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END]);
 
        // 启动定时器刷新页面 参数为帧率
        this.ticker = new Hilo.Ticker(60)
        // 舞台添加到定时队列中
        this.ticker.addTick(this.stage)
        // 添加动画类到定时队列
        this.ticker.addTick(Hilo.Tween);
        //启动ticker
        this.ticker.start(true);

 
        this.startGame();
 
        //this.initZongzi();
 
        //this.initHand();
 
    }

    startGame() {   //开始游戏
        this.initZongzi();
        this.initHand()
        //this.beginBtn.removeFromParent()
        this.stage.removeChild(this.beginBtn)
        this.gameTime = this.setGameTime;
        this.score = 0;
        this.gameStatus = "play"
        this.calcTime()
    }
    calcTime() { //游戏时间
        setTimeout(() => {
            if (this.gameTime > 0) {
                this.gameTime--;
                this.calcTime()
            } else {
                this.gameOver()
            }
        }, 1000);
    }
    gameOver() {//游戏结束
        if (this.speedTimeout) {
            clearTimeout(this.speedTimeout);
            this.speedTimeout = null;
        }
        this.Zongzi.stopCreateEnemy()
        this.gameStatus = "ready"
        // this.initBeginBtn()
        //this.hand.removeChild(this.hand.score)
        this.stage.removeChild(this.hand)
    }
    initZongzi() {//初始化粽子
        this.Zongzi = new Zongzi({
            id: 'Zongzi',
            height: this.height,
            width: this.width,
            enemySpeed: this.enemySpeed,
            createSpeed: this.createSpeed,
            pointerEnabled: false, // 不关闭事件绑定 无法操作舞台
            zongziList: [this.asset.gold, this.asset.wood, this.asset.water, this.asset.fireElement, this.asset.soil]
        }).addTo(this.stage, 2)
        //舞台更新
        this.stage.onUpdate = this.onUpdate.bind(this);
    }
    initHand() {//初始化手
        this.hand = new Hand({
            id: 'hand',
            img: this.asset.person,
            height: this.asset.person.height,
            width: this.asset.person.width,
            x: this.width / 2 - this.asset.person.width / 4,
            y: this.height - this.asset.person.height / 2 - 40
        }).addTo(this.stage, 1);
        Hilo.util.copy(this.hand, Hilo.drag);
        this.hand.startDrag([-this.asset.person.width / 4, this.height - this.asset.person.height / 2 - 40, this.width, 0]);
        
        this.hand.addScore(this.asset.blood3);
    }
    onUpdate() {//舞台更新
        if (this.gameStatus == 'ready') {
            return
        }
        this.Zongzi.children.forEach(item => {
            if (this.hand.checkCollision(item)) {
                // 碰撞了
                item.over();
                // this.score += item.score;
                switch (item.score) {
                    case 'coin':
                        window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/gold.mp3')
                        // window.$('#audio2')[0].play();
                        this.coin+=10;
                        break;
                    case 'minus':
                        window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/fire.mp3')
                        if (this.protect) {
                            this.protect = false;
                            this.hand.removeShield(this.asset.shield);
                            return
                        }

                        if (this.blood == 3) {
                            this.blood = 2;
                            this.hand.addScore(this.asset.blood2)
                        } else if (this.blood == 2) {
                            this.blood = 1;
                            this.hand.addScore(this.asset.blood1)
                        } else if (this.blood == 1) { // 游戏失败，结束游戏
                            window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/sx_fail.mp3')
                            this.blood = 0;
                            this.hand.addScore(this.asset.blood0);
                            this.gameOver()
                        }
                        
                        break;
                    case 'plus':
                        window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/wood.mp3')
                        if (this.blood >= 2) {
                            this.blood = 3;
                            this.hand.addScore(this.asset.blood3)
                        } else if (this.blood == 1) {
                            this.blood = 2;
                            this.hand.addScore(this.asset.blood2)
                        }
                        break;
                    case 'speed':
                        window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/water.mp3')
                        this.enemySpeed = 1200;
                        this.Zongzi.stopCreateEnemy();
                        this.initZongzi();
                        if (this.speedTimeout) {
                            clearTimeout(this.speedTimeout);
                            this.speedTimeout = null;
                        }
                        this.speedTimeout = setTimeout(() => {
                            this.enemySpeed = 700;
                            this.Zongzi.stopCreateEnemy();
                            this.initZongzi();
                        }, 5000)
                        break;
                    case 'shield':
                        window.$('#audio2').attr('src', 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/soil.mp3')
                        if (!this.protect) {
                            this.protect = true;
                            this.hand.addShield(this.asset.shield)
                        } else {
                            // this.protect = false;
                            // this.hand.removeShield(this.asset.shield)
                        }
                        
                        break;
 
                    default:
                        break;
                }
            }
        })
    }
}