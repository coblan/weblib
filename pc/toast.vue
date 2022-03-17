<!--template的内容-->
<template>
    <div class="my-toast">
        <slot>{{message}}</slot>
    </div>
</template>

<script>
//script的内容
export default {
    name: 'toast',
    props:{
        message:{},
    },
    data(){
        return {
            duration: 2000, //默认toast消失的时间
         
        }
    },
    mounted(){
        setTimeout(()=>{
            this.$emit('finish')
            // this.$destroy(true);
            // this.$el.parentNode.removeChild(this.$el);
        }, this.duration)
    }
}
</script>

<style scoped lang='scss'>
.my-toast{
    position:fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.6);
    color: white;
    padding: 6px 16px;
    border-radius: 2px;
    z-index: 99999;
}
</style>
