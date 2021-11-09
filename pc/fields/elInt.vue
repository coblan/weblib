<template>
  <el-input 
            :placeholder="placeholder"
            @keypress.native="isNumber($event)"
            v-model="inn_value" >

      <template slot="append">
        <slot name="append"></slot>
      </template>
  </el-input>
</template>
<script>
export  default {
  props:{
    value:{},
    placeholder:{},
    type:{
      default:()=>'text'
    }
  },
  data(){
    return {
      inn_value:this.value
    }
  },
  watch:{
    value(nv){
      this.inn_value=nv
      // if(nv!=this.inn_value){
      //   this.inn_value=nv
      // }
    },
    inn_value(nv){
        var mt = /\d+/.exec(nv)
        if(mt){
            var value = parseInt(mt[0]) 
        }else{
            var value =''
        }

        if(this.value!=value){
            this.$emit('input',value)
        }
        if(this.inn_value!=value){
            this.inn_value=value
        }

    //   this.$emit('input',nv)
      // if(nv!=this.value){
      //   this.$emit('input',nv)
      // }
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

.vip{
    ::v-deep{
        .el-input__inner:focus{border-color:#e5c878}
    }
}


</style>