<template>
<!-- no-border -->
      <el-dialog
        class='no-title'
        :visible.sync="centerDialogVisible"
        :width='ctx.width'
        :close-on-click-modal="false"
        :show-close="ctx.showClose==undefined?true:ctx.showClose"
        center>
        <template v-slot:title>
            <!-- <div style="display:flex">
                <div>标题</div>
               <div>标题</div>
               <div>标题</div>
            </div> -->
            
        </template>
        <component :is='ctx.editor' :ctx='ctx.inn_ctx' @finish="onFinish"></component>
        </el-dialog>
</template>
<script>
import Vue from 'vue';
import { Dialog } from 'element-ui';

// Vue.component(Dialog.name, Dialog);

var  elePop = {
    props:{
        /**
         * width:弹出窗口的宽度
         * no-border:无边框
         * borderRadius:5px  圆角
         */
        ctx:{}
    },
    components:{
      elDialog:Dialog
    },
    data(){
        return {
            centerDialogVisible:true,
            hasfinish:false,
            childStore:{name:'elePop',vc:this}
        }
    },
    watch:{
        centerDialogVisible(nv){
            if(!nv && !this.hasfinish){
                this.$emit('finish',)
            }
        }
    },
    computed:{
        // mystyle(){
        //     debugger
        //     if(this.ctx.borderRadius){
        //         return {
        //             borderRadius:this.ctx.borderRadius
        //         }
        //     }else{
        //         return {}
        //     }
        // }
    },
  methods:{
    close(){
      this.centerDialogVisible=false
    },
    onFinish(ee){
      // 必须prevent  finish事件会冒泡到 append_vue_dom函数中
      this.hasfinish=true
      this.centerDialogVisible = false
        this.$emit('finish',ee)
    }
  }
}

import  {append_vue_dom} from 'weblib/pc_cfg/appendVueDom'

export function pop_vue_com_ele(editor,ctx){
    var pop_ctx = {
        editor:editor,
        width:ctx.width,
        showClose:ctx.showClose || false,
        // borderRadius:ctx.borderRadius,
        inn_ctx:ctx
    }
    return append_vue_dom(elePop,{ctx:pop_ctx})
}
export default elePop

</script>
<style scoped lang='scss'>
.no-title ::v-deep .el-dialog__header{
        padding:0;
    }
.no-title ::v-deep .el-dialog__headerbtn{
    top:10px;
}
.no-title ::v-deep .el-dialog__body{
    padding: 0;
}
.no-title ::v-deep .el-dialog{
    background: none;
}
.no-border ::v-deep .el-dialog{
    border: none;
    box-shadow: none;
    background: none;
}



</style>
