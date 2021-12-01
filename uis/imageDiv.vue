<template>
    <div class="image-div" :class="[type]" :style="myStyle">
      <slot></slot>
    </div>
</template>
<script>
/* 图片作为 background ，可以按div的大小显示图片

*/
export default {
    props:{
        src:{},
        type:{},
        defaultSrc:{}
    },
    data(){
      return {
        loaded:false
      }
    },

  computed:{
      realsrc(){
        if(this.loaded || !this.defaultSrc){
          return this.src
        }else{
          return  this.defaultSrc
        }
      },
        myStyle(){
            return {
                'background-image': `url(${this.realsrc})`  //'url('+this.src+')'
            }
        }
    },
  mounted() {
      this.updateSrc()
  },
  watch:{
      src(nv){

       this.updateSrc()
      }
  },
  methods:{
      updateSrc(){
        this.loaded=false
        if(this.defaultSrc){
          ex.load_image(this.src).then(()=>{
            this.loaded=true
          })
        }
      }
  }
}

/* .image-div{
    background-size: cover;
    background-position: center;  
} */
</script>
<style lang='scss' scoped >
.image-div{
    background-size: cover;
    background-position:center;
    background-repeat: no-repeat;
}
.stretch.image-div{
  background-size: 100% 100%;
}
</style>
