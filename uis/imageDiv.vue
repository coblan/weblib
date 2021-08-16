<template>
    <div class="image-div" :style="myStyle"></div>
</template>
<script>
/* 图片作为 background ，可以按div的大小显示图片

*/
export default {
    props:{
        src:{}
    },
    computed:{
        myStyle(){
            return {
                'background-image':'url('+this.src+')'
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

}
    
</style>
