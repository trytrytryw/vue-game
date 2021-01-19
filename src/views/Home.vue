<template>
  <div class="hilo" ref="hilo"></div>
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
  methods: {},
  mounted() {
    this.game.page = this.$refs.hilo;
    this.game.init();
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
</style>
