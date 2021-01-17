import Hilo from "hilojs";
export default Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,  // 下载类
    bg: null,   // 背景
    bigzZongzi: null,   // 大粽子
    zongzi: null,   // 小粽子
    fruit: null,   // 香蕉
    hand: null,   // 手
    beginBtn: null,   // 开始按钮
    score0: null,   // -1分
    score1: null,   // +1分
    score2: null,   // +2分
    load() {
        let imgs = [{
            id: 'bg',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/loading_bg@3x.png'
        },
        {
            id: 'bigzZongzi',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/speciality_dark@3x.png'
        },
        {
            id: 'zongzi',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/color_dark@3x.png'
        },
        {
            id: 'fruit',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/md_dark@3x.png'
        },
        {
            id: 'hand',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/operate_dark@3x.png'
        },
        {
            id: 'beginBtn',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/operate_dark@3x.png'
        },
        {
            id: 'score0',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/operate_dark@3x.png'
        },
        {
            id: 'score1',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/operate_dark@3x.png'
        },
        {
            id: 'score2',
            src: 'https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/focus/operate_dark@3x.png'
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
        this.bg = this.queue.get('bg').content;
        this.bigzZongzi = this.queue.get('bigzZongzi').content;
        this.zongzi = this.queue.get('zongzi').content;
        this.fruit = this.queue.get('fruit').content;
        this.hand = this.queue.get('hand').content;
        this.beginBtn = this.queue.get('beginBtn').content;
        this.score0 = this.queue.get('score0').content;
        this.score1 = this.queue.get('score1').content;
        this.score2 = this.queue.get('score2').content;
 
        //删除下载队列的complete事件监听
        this.queue.off('complete');
        // complete暴露
        this.fire('complete');
    }
})