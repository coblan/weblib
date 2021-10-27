<template>
      <el-dialog
        class='no-title'
        :visible.sync="centerDialogVisible"
        :width='ctx.width'
        center>
        <template v-slot:title>
            <!-- <div style="display:flex">
                <div>标题</div>
               <div>标题</div>
               <div>标题</div>
            </div> -->
            
        </template>
        <component :is='ctx.editor' :ctx='ctx.inn_ctx'></component> 
        </el-dialog>
</template>
<script>
import Vue from 'vue';
import { Dialog } from 'element-ui';

Vue.component(Dialog.name, Dialog);

var  elePop = {
    props:{
        ctx:{}
    },
    data(){
        return {
            centerDialogVisible:true
        }
    },
    watch:{
        centerDialogVisible(nv){
            if(!nv){
                this.$emit('finish',)
            }
        }
    }
}

import  {append_vue_dom} from 'weblib/pc_cfg/appendVueDom'

export function pop_vue_com_ele(editor,ctx){
    var pop_ctx = {
        editor:editor,
        width:ctx.width,
        inn_ctx:ctx
    }
    return append_vue_dom(elePop,pop_ctx)
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

</style>
