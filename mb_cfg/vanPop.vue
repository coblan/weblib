<template>
  <div class="my-pop">
<!--    <van-popup :closeable="ctx.closeable"  :position="ctx.position"-->
<!--               v-model="show" @close="onClose" :get-container="getContainer" :close-on-click-overlay="false">-->
      <component :is='ctx.editor' v-bind='ctx.inn_ctx' @finish="onFinish"></component>
<!--    </van-popup>-->
  </div>


</template>
<script>
import  {append_vue_dom} from 'weblib/pc_cfg/appendVueDom'
import { Popup } from 'vant';
export var vanPop = {
  components:{
    Popup
  },
  props:{
    ctx:{}
  },
  data(){
    return {
      show:true,
      hasfinish:false
    }
  },
  methods:{
    onClose(){
      if(!this.hasfinish){
        this.hasfinish=true
        this.$emit('finish',)
      }

    },
    onFinish(e){
      if(!this.hasfinish){
        this.hasfinish = true
        this.$emit('finish',e)
      }

    },

    getContainer(){
      return this.$el
    }
  }

}

export function pop_vue_com_vant(editor,ctx,option=null){
    var pop_ctx = {
      editor:editor,
      width:ctx.width ||ctx.meta_width ,
      showClose:ctx.showClose ||ctx.meta_showClose || false,
      position:ctx.meta_position,
      inn_ctx:ctx
    }
    return append_vue_dom(vanPop,{ctx:pop_ctx},option)
}
export default  vanPop;
</script>
<style scoped lang="scss">
.my-pop{
  //position: fixed;
  //transform: translate(-50%,-50%);
  //left: 50%;
  //top:50%;

  ::v-deep{
    .van-popup--center{
      background-color: transparent;
    }
  }
}

</style>