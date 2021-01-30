<template>
  <div class="hilo" ref="hilo">
    <img src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_one.png" style="display:none" alt="">
    <img src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_two.png" style="display:none" alt="">
    <img src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_three.png" style="display:none" alt="">
    <img src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_four.png" style="display:none" alt="">
    <!-- 背景音频 -->
    <audio id="audio" preload="auto" autoplay loop src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/audio/sxyx/sx_bgm.mp3"></audio>
    <audio id="audio2" preload="auto" autoplay src=""></audio>
    <!-- 背景 -->
    <!-- <div class="hilo_bg hilo_bg_one" :class="{'hide': hiloBg != 'one'}"></div>
    <div class="hilo_bg hilo_bg_two" :class="{'hide': hiloBg != 'three'}"></div>
    <div class="hilo_bg hilo_bg_three" :class="{'hide': hiloBg != 'two'}"></div>
    <div class="hilo_bg hilo_bg_four" :class="{'hide': hiloBg != 'four'}"></div> -->
    <div class="hilo_bg_long"></div>
    <!-- 场景title -->
    <div class="scene yujie" v-show="hiloBg == 'one'"></div>
    <div class="scene sejie" v-show="hiloBg == 'two'"></div>
    <div class="scene wusejie" v-show="hiloBg == 'three'"></div>
    <div class="scene sifantian" v-show="hiloBg == 'four'"></div>
    <!-- 倒计时 -->
    <div class="count_bg">{{gameTime + 's'}}</div>
    <!-- 云朵 -->
    <!-- 白色 -->
    <div class="cloud_div" v-show="hiloBg == 'one'">
      <img class="cloud1" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_white1.png" alt="">
      <img class="cloud2" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_white2.png" alt="">
      <img class="cloud3" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_white3.png" alt="">
      <img class="cloud4" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_white4.png" alt="">
    </div>
    <!-- 灰色 -->
    <div class="cloud_div" v-show="hiloBg == 'three'">
      <img class="cloud1" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_grey1.png" alt="">
      <img class="cloud2" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_grey2.png" alt="">
      <img class="cloud3" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_grey3.png" alt="">
      <img class="cloud4" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_grey4.png" alt="">
    </div>
    <!-- 粉色 -->
    <div class="cloud_div" v-show="hiloBg == 'two'">
      <img class="cloud1" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_pink1.png" alt="">
      <img class="cloud2" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_pink2.png" alt="">
      <img class="cloud3" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_pink3.png" alt="">
      <img class="cloud4" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_pink4.png" alt="">
    </div>
    <!-- 彩色 -->
    <div class="cloud_div" v-show="hiloBg == 'four'">
      <img class="cloud1" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_color1.png" alt="">
      <img class="cloud2" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_color2.png" alt="">
      <img class="cloud3" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_color3.png" alt="">
      <img class="cloud4" src="https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_color4.png" alt="">
    </div>
  </div>
</template>

<script>
// import Hilo from "hilojs";
import Game from "../js/game";
export default {
  name: 'Home',
  data () {
    return {
      game: new Game(),
      hiloBg: 'one'
    }
  },
  watch: {
    gameTime (val) {
      if (val == 30) {
        this.hiloBg = 'two'
      } else if (val == 20) {
        this.hiloBg = 'three'
      } else if (val == 10) {
        this.hiloBg = 'four'
      }
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
    // window.$('#audio')[0].play();

    document.addEventListener("WeixinJSBridgeReady", function () {
      window.$('#audio')[0].play();
      window.$('#audio2')[0].play();
    }, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hilo{
  width: 100%;
  height: 100%;
  /* background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/yujie_bg.png) no-repeat center/cover; */
}
.hilo_bg_long{
  position: absolute;
  width: 100%;
  height: 3222px;
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_long.jpg) no-repeat center/100% 100%;
  animation: drop 40s infinite linear;
  -webkit-animation: drop 40s infinite linear;
}
@keyframes drop {
  0% {
    top: calc(-3222px + 100vh);
  }
  100% {
    top: 0;
  }
}
@-webkit-keyframes drop {
  0% {
    top: calc(-3222px + 100vh);
  }
  100% {
    top: 0;
  }
}

.hilo_bg{
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 2s linear;
}
.hide{
  opacity: 0;
}
.hilo_bg_one{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_one.png) no-repeat center/cover;
}
.hilo_bg_two{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_two.png) no-repeat center/cover;
}
.hilo_bg_three{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_three.png) no-repeat center/cover;
}
.hilo_bg_four{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/cloud_bg_four.png) no-repeat center/cover;
}
#audio{
  position: absolute;
  left: 1000000px;
}
#audio2{
  position: absolute;
  left: 1000000px;
}
.count_bg{
  position: absolute;
  width: 42px;
  height: 42px;
  top: 23px;
  right: 10px;
  z-index: 10;
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/count_bg.png) no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #343a43;
}
.cloud_div{
  position: absolute;
  width: 100%;
  height: 100%;
  top: -100%;
  left: 0;
  animation: rise 10s 1 linear;
  -webkit-animation: rise 10s 1 linear;
}
.cloud1{
  position: absolute;
  width: 222px;
  height: 226px;
  left: 0px;
  top: 0px;
  pointer-events: none;
}
.cloud2{
  position: absolute;
  width: 209px;
  height: 259px;
  right: 0px;
  top: 50%;
  transform: translateY(calc(-50% - 80px));
  pointer-events: none;
}
.cloud3{
  position: absolute;
  width: 112px;
  height: 171px;
  left: 0px;
  top: 50%;
  transform: translateY(calc(-50%));
  pointer-events: none;
}
.cloud4{
  position: absolute;
  width: 363px;
  height: 236px;
  right: 0px;
  bottom: 34px;
  pointer-events: none;
}
@keyframes rise {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes rise {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

.scene{
  position: absolute;
  width: 129px;
  height: 49px;
  top: 19px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.yujie{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/yujie.png) no-repeat center/100% 100%;
}
.sejie{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/sejie.png) no-repeat center/100% 100%;
}
.wusejie{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/wusejie.png) no-repeat center/100% 100%;
}
.sifantian{
  background: url(https://sightppp.oss-cn-shanghai.aliyuncs.com/projects/luyi/sifantian.png) no-repeat center/100% 100%;
}
</style>
