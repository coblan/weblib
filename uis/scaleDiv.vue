<template>
    <div class='scale-div' :style="containStyle">
      <div class="inn-wrap" :style="mystyle">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
      width:{},
      height:{}
    },
    data(){
      return {
        ratio:1
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.updateRatio()
      })

    },
    methods:{
      updateRatio(){

          var p_width= this.$el.offsetWidth
          var p_heith = this.$el.offsetHeight
          var w_ratio = p_width / this.width
          var h_ratio = p_heith / this.height
          this.ratio = Math.min(w_ratio,h_ratio)
      }
    },
    computed:{
      mystyle(){
        return {
          width:this.width+'px',
          height: this.height+'px',
        }
      },
      containStyle(){
        return {
          '--vv':this.ratio
        }
      }
    }
}
</script>
<style scoped lang='scss'>
.scale-div{
    position: relative;
    //border: 1px solid blue;
    .inn-wrap{
      position: absolute;
      top:50%;
      left: 50%;
      transform: scale( var(--vv) ) translate(-50%,-50%) ;
      //background-color: red;
      //transform: scale(1.2);
      transform-origin: 0 0 ;
    }
}
</style>