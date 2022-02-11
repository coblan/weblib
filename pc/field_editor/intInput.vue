<template>
  <el-input 
            :placeholder="head.placeholder"
            :size="head.size"
            :style="mystyle"
            @keypress.native="isNumber($event)"
            v-model="row[head.name]" >

      <template slot="append">
        <slot name="append"></slot>
      </template>
  </el-input>
</template>
<script>
export  default {
  props:{
    head:{},
    row:{},
  },
  data(){
    return {
    }
  },
  computed:{
    mystyle(){
      if(this.head.width){
        return {
          width:this.head.width
        }
      }


    }
  },
  methods:{
       isNumber(evt){
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if(charCode== 46){
                return evt.preventDefault();
            }

            if ((charCode >= 48 && charCode <= 57) || charCode== 46 || charCode== 45) {
                if(charCode==46 && this.row[this.head.name].indexOf('.')!=-1){
                    return evt.preventDefault();
                }else{
                    return true
                }
            }else{
                return evt.preventDefault();
            }
        }
  }
}
</script>
<style scoped lang="scss">


</style>