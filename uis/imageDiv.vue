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
        type:{}
    },
    computed:{
        myStyle(){
            return {
                'background-image': `url(${this.src})`  //'url('+this.src+')'
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
