<template>
    <div class="pull-wrap beauty-scroll-bar">
        <van-pull-refresh  v-model="freshing" @refresh="onRefresh" style="height: 100%;" :disabled="scroll_top>10">
                <!-- <van-list
                    ref='vanlist'
                    v-model="loading"
                    :finished="finished"
                    :finished-text="finishedText"
                    :immediate-check="false"
                    @load="onLoad"
                    @touchmove.stop
                >
                        <slot>
                                here is content

                        </slot>
                
            
                </van-list> -->
              <div v-show="finished && value.length==0">
                <slot name="empty">
                  <div style="height: 100px;display: flex;width: 100%;justify-content: center;align-items: center">没有数据</div>
                </slot>
              </div>
                <scrollLoadList
                    v-show="!finished || value.length !=0"
                    style="height: 100%;"
                    ref='vanlist'
                    v-model="loading"
                    :finished="finished"
                    :finished-text="finishedText"
                    @load="onLoad"
                    @touchmove.stop
                    @scrollTop="scroll_top=$event"
                >
                    <slot>
                                here is content

                        </slot>
                </scrollLoadList>
</van-pull-refresh>
    </div>
</template>
<script>
import scrollLoadList from './scrollLoadList.vue'
export default {
    components:{
        scrollLoadList,
    },
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
        },
        option:{

        }
    },
    data(){
        return {
            scroll_top:0,
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
            var rows = await this.getRows(this.page_index,this.pageSize,this.option)
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
            var rows = await this.getRows(this.page_index,this.pageSize,this.option)

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
