<template>
  <el-input class="password-input"
            :placeholder="placeholder||'请输入密码' "
            prefix-icon='el-icon-unlock'
            v-model="inn_value" show-password></el-input>
</template>
<script>
export  default {
  props:{
    value:{},
    placeholder:{}
  },
  data(){
    return {
      inn_value:this.value
    }
  },
  watch:{
    value(nv){
      if(nv!=this.inn_value){
        this.inn_value=nv
      }
    },
    inn_value(nv){
      if(nv!=this.value){
        this.$emit('input',nv)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.password-input{
  ::v-deep{
    .el-input__inner:focus{border-color:#e5c878}
  }
}

</style>