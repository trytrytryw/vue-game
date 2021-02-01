import Hilo from "hilojs";
import SmallZongzi from './SmallZongzi'
let Enemy = Hilo.Class.create({
    Extends: Hilo.Container,
    SmallZongziImg: null,
    timer: null, // 定时器
    zongziList: [],
    enemySpeed: 0,
    createSpeed: 0,
    score: ['coin', 'plus', 'speed', 'minus', 'shield'],
    tween: null,
 
    constructor: function (properties) {
        Enemy.superclass.constructor.call(this, properties);
 
        //this.onUpdate = this.onUpdate.bind(this);
        //this.createSmallZongzi()
        this.tween = Hilo.Tween;
        this.creatEnemy();
        this.beginCreateEnemy();
    },
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    creatEnemy() { // 生成粽子
        let number = this.random(0, 100);
        let index = null;
        if (number < 20) {  //生成不同种类粽子概率
            index = 0
        } else if (number < 40) {
            index = 1
        } else if (number < 60) {
            index = 2
        } else if (number < 80) {
            index = 3
        } else {
            index = 4
        }
        let hold = new SmallZongzi({
            image: this.zongziList[index],
            rect: [0, 0, this.zongziList[index].width, this.zongziList[index].height],
            width: this.zongziList[index].width / 2,
            height: this.zongziList[index].height / 2
            // scaleX: 0.5,
            // scaleY: 0.5,
        }).addTo(this);
 
        hold.x = this.random(0, (this.width - this.zongziList[0].width / 2));
 
        hold.y = -300 * Math.random();
 
        hold.score = this.score[index]
 
        this.tween.to(hold, {
            y: this.height + 200
        }, {
            duration: 1400 / this.enemySpeed * 1000,
            loop: false,
            onComplete: () => {
                hold.removeFromParent()
            }
        });
 
    },
    beginCreateEnemy() {//开始生成
        this.timer = setInterval(() => {
            this.creatEnemy();
 
        }, this.createSpeed);
    },
    updateEnemySpeed(speed = 500) {//开始生成
        this.enemySpeed = speed;
    },
    stopCreateEnemy() {//停止生成并全部移除
        clearInterval(this.timer)
        this.removeAllChildren()
    },
    checkCollision(enemy) {//碰撞检测
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (enemy.hitTestObject(this.children[i], true)) {
                return true;
            }
        }
        return false;
    }
})
 
export default Enemy