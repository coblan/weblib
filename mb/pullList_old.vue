<template>
    <div class="pull-wrap beauty-scroll-bar">
    <van-list
        ref='vanlist'
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :immediate-check="false"
        @load="onLoad"
        @touchmove.stop
    >
            <!-- :immediate-check="false" -->
    <van-pull-refresh  v-model="freshing" @refresh="onRefresh" style="min-height: 100%;">
        <!-- <div class="myinn"> -->
            <slot>
                    here is content

            </slot>
      
    </van-pull-refresh>
    </van-list>
    </div>
</template>
<script>
export default {
    props:{
        // pageIndex:{
        //     default:1
        // },
        pageSize:{
            default:10
        },
        getRows:{

        },
        value:{},
        // rows:{},
        finishedText:{
            default:'没有更多了'
        },
        autoload:{
            default:true
        }
    },
    data(){
        return {
            page_index:0,
            freshing:false,
            loading:false,
            finished:false,
            scrollOptions: {
                /* lock x-direction when scrolling horizontally and  vertically at the same time */
                directionLockThreshold: 0,
                click:true,
                pullDownRefresh:{
                    txt:'刷新成功!',
                },
                pullUpLoad:{
                    txt:{ more: '', noMore: this.finishedText }
                },

            },
        }
    },
    mounted(){
        // setInterval(() => {
        //     console.log( this.$refs.vanlist.check() )
        // }, 1000);
        if(this.autoload){
            this.$nextTick(()=>{
                this.onRefresh()
            })
        }
        
        
    },
    methods:{
      search(){
        this.onRefresh()
      },
        check(){
            this.$refs.vanlist.check()
        },

        async onLoad(){
           if(this.pageSize*this.page_index > this.value.length){
               // 防止无畏的加载页面
               return
           }
            this.page_index+=1
            var rows = await this.getRows(this.page_index,this.pageSize,)
            // this.rows.push(...rows)
            this.value.push(...rows)

            // Vue.nextTick(()=>{
                if(rows.length < this.pageSize){
                    this.finish()
                }else{
                    this.loadOver()
                }
            // })
            
        },
        async onRefresh(){
            this.page_index = 1
            this.finished=false
            var rows = await this.getRows(this.page_index,this.pageSize,)

            // this.$emit('update:rows',rows)
            this.$emit('input',rows)
            // Vue.nextTick(()=>{
            if(rows.length < this.pageSize){
                this.finish()
            }else{
                this.loadOver()
            }
            if(!this.finish){
                this.check()
            }
           
            // })
        },


        loadOver(){
            this.freshing=false
            this.loading=false
            this.freshing =false
            
        },
        finish(){
            this.finished = true
            this.loading=false
            this.freshing =false
            
        },
        // onLoad(){
        //     // this.$emit('update:pageIndex',this.pageIndex)
        //     // this.$emit('load')
        //     this.on_load()
        // },
        // onRefresh(){
        //     this.finished=false
        //     // this.$emit('update:pageIndex',1)
        //     // this.$emit('refresh')
        //     this.on_refresh()
        // }
    }
}
</script>
<style scoped lang="scss">
.pull-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //overflow: auto;
}
.myinn{
    /* min-height: 100%; */
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // overflow: auto;
}
.pull-wrap ::v-deep{
    //  .van-list{
    //     height: 100%;
    // }
    .van-pull-refresh{
        min-height: 100%;
        //  height: 100%;
        // overflow: auto;
    }
}
</style>
