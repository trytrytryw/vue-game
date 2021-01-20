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
    blood0: null,   // 空血
    blood1: null,   // 1滴血
    blood2: null,   // 2滴血
    blood3: null,   // 3滴血
    shield: null, // 防护罩
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
        },
        {
            id: 'blood0',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/blood0.png'
        },
        {
            id: 'blood1',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/blood1.png'
        },
        {
            id: 'blood2',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/blood2.png'
        },
        {
            id: 'blood3',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/blood3.png'
        },
        {
            id: 'shield',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/shield.png'
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
        this.blood0 = this.queue.get('blood0').content;
        this.blood1 = this.queue.get('blood1').content;
        this.blood2 = this.queue.get('blood2').content;
        this.blood3 = this.queue.get('blood3').content;
        this.shield = this.queue.get('shield').content;
 
        //删除下载队列的complete事件监听
        this.queue.off('complete');
        // complete暴露
        this.fire('complete');
    }
})