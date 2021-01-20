<template>
  <div class="hilo" ref="hilo">
    <!-- 背景音频 -->
    <audio id="audio" preload="auto" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/sx_bgm.mp3"></audio>
    <audio id="audio2" preload="auto" autoplay src=""></audio>
  </div>
</template>

<script>
// import Hilo from "hilojs";
import Game from "../js/game";
export default {
  name: 'Home',
  data () {
    return {
      game: new Game()
    }
  },
  computed: {
    coin() {
      return this.game.coin
    },
    gameTime() {
      return this.game.gameTime
    }
  },
  methods: {},
  mounted() {
    this.game.page = this.$refs.hilo;
    this.game.init();
    window.$('#audio')[0].volume = 0.7;
    window.$('#audio')[0].play();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hilo{
  width: 100%;
  height: 100%;
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/yujie_bg.png) no-repeat center/cover;
}
#audio{
  position: absolute;
  left: 1000000px;
}
#audio2{
  position: absolute;
  left: 1000000px;
}
</style>
