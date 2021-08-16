<template>
    <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      :class="ctx.content_class"
      @touchmove.stop
    >
    <van-pull-refresh  v-model="freshing" @refresh="onRefresh">
        <slot name='content'>
            <component class="content-wrap" 
                :is="table_editor" 
                :heads="ctx.heads" 
                :rows="childStore.rows" 
                 @select="triggerBlockClick($event)"></component>
        </slot>
       
    </van-pull-refresh>
    </van-list>
    </div>
</template>
<script>
export default {
    props:['ctx'],
    data(){
        return {
            freshing:false,
            loading:false,
            finished:false,
            childStore:childStore,
            table_editor: this.ctx.table_editor || 'com-ctn-table-van-cell',
            scrollOptions: {
                /* lock x-direction when scrolling horizontally and  vertically at the same time */
                directionLockThreshold: 0,
                click:true,
                pullDownRefresh:{
                    txt:'刷新成功!',
                },
                pullUpLoad:{
                    txt:{ more: '', noMore: '没有更多了!' }
                },

            },
        }
    }
}
</script>
