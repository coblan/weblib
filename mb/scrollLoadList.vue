<template>
    <div class="scroll-load-list beauty-scorll-bar">
        <div class="inn-wrap">
            <slot></slot>
        </div>
        <div class="footer" v-if="finished || value">
            <van-loading v-if="value" size="24px">加载中...</van-loading>
            <div v-if="finished">{{finishedText}}</div>
        </div>
        
    </div>
</template>
<script>
export default{
    props:{
        value:{},
        finished:{},
        finishedText:{
            default:"--没有更多--"
        },

    },
    data(){
        return {
            // loading:false,
            // finish:false,
        }
       
    },
    mounted(){
        this.listen()
    },
    methods:{
        listen(){
            let box = this.$el // .querySelector(".inn-wrap");
            box.addEventListener("scroll",  (e)=> {

                let scrollTop = e.target.scrollTop;
                let clientHeight = e.target.clientHeight;
                let scrollHeight = e.target.scrollHeight;
                // console.log(scrollTop+clientHeight,scrollHeight)
                if(scrollTop + clientHeight > scrollHeight -50){
                    if(this.finished || this.value){
                        return
                    }else{
                        this.$emit('input',true)
                        this.$emit('load')
                    }
                   
                }
                this.$emit('scrollTop',scrollTop)
            })
        },
        check(){
            var div = this.$el.querySelector('.inn-wrap')
            if ( div.scrollTop + div.clientHeight <  div.scrollHeight  ){

            }
        }
       
    }
}
</script>
<style scoped lang="scss">
.scroll-load-list{
    overflow: auto;
}
.footer{
    background-color: rgb(237, 237, 237);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
</style>