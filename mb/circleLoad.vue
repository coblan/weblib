<template>

<!--  <div style="background-color: transparent">-->
<!--    hello world-->
<!--  </div>-->
  <van-circle v-model="currentRate" :rate="100" :speed="myspeed"  :stroke-width="60"
              fill="white"
              layer-color="#e8e8e8" >
    <!--              color="green"-->

    <div class="center-text">{{text}}</div>
  </van-circle>

</template>
<script>
import { Circle } from 'vant';
export default {
  props:{
    duration:{}
  },
  data(){
    return {
      currentRate: 0,
    }
  },
  computed: {
    myspeed(){
      return 100/ this.duration
    },
    text() {
      // return  `剩余${100-this.currentRate.toFixed(0)}秒`
      return this.currentRate.toFixed(0) + '%';
    },
  },
  watch:{
    currentRate(nv){
      if(nv>99){
        this.$emit('finish',true)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.center-text{
  color: #626060;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>