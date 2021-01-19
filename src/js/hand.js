import Hilo from "hilojs";
let hand = Hilo.Class.create({
    Extends: Hilo.Container,
 
    // 图
    img: null,
    //碗
    bowl: null,
    //分数
    score: null,
 
    constructor(properties) {
        hand.superclass.constructor.call(this, properties)
        this.initHand()
    },
    initHand() {  //初始化背景
        this.hand = new Hilo.Bitmap({
            id: 'hand',
            image: this.img,
            rect: [0, 0, this.img.width, this.img.height],
            width: this.img.width / 2,
            height: this.img.height / 2,
            // scaleX: 0.5,
            // scaleY: 0.5,
        }).addTo(this);
    },
    addScore(image) { //加分
        this.score = new Hilo.Bitmap({
            id: 'score',
            image: image,
            rect: [0, 0, image.width, image.height],
            x: (this.img.width - image.width) / 2,
            y: -image.height
        }).addTo(this);
 
        Hilo.Tween.to(this.score, {
            x: (this.img.width - image.width / 2) / 2,
            y: -2 * image.height,
            alpha: 0,
            width: image.width / 2,
            height: image.height / 2
        }, {
            duration: 600,
            //delay: 100,
            ease: Hilo.Ease.Quad.EaseIn,
            onComplete: () => {
                
            }
        });
    },
 
    // 碰撞检测
    checkCollision(enemy) {
        if (enemy.hitTestObject(this.hand, true)) {
            return true;
        }
        return false;
    }
})
 
export default hand