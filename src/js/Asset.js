import Hilo from "hilojs";
export default Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,  // 下载类
    gold: null,   // 金
    wood: null,   // 木
    water: null,   // 水
    fireElement: null,   // 火
    soil: null, // 土
    person: null, // 道士
    score0: null,   // -1分
    score1: null,   // +1分
    score2: null,   // +2分
    load() {
        let imgs = [
        {
            id: 'wood',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_wood.png'
        },
        {
            id: 'fire',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_fire.png'
        },
        {
            id: 'gold',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_gold.png'
        },
        {
            id: 'person',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_person.png'
        },
        {
            id: 'soil',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_soil.png'
        },
        {
            id: 'water',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/game_water.png'
        }
        ];
        this.queue = new Hilo.LoadQueue();
        this.queue.add(imgs);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.on('error', (e) => {
            console.log('加载出错', e)
        })
        this.queue.start();
    },
    onComplete() { //加载完成
        console.log('加载完成')
        this.gold = this.queue.get('gold').content;
        this.wood = this.queue.get('wood').content;
        this.water = this.queue.get('water').content;
        this.fireElement = this.queue.get('fire').content;
        this.soil = this.queue.get('soil').content;
        this.person = this.queue.get('person').content;
        // this.score0 = this.queue.get('score0').content;
        // this.score1 = this.queue.get('score1').content;
        // this.score2 = this.queue.get('score2').content;
 
        //删除下载队列的complete事件监听
        this.queue.off('complete');
        // complete暴露
        this.fire('complete');
    }
})