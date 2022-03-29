<template>
    <el-input class="validate-code" placeholder="验证码" v-model="inn_value">
          <template slot="append" ><img :src="imageUrl" alt=""></template>
     </el-input>
</template>
<script>
export default{
    props:{
        value:{},
        imageUrl:{},
    },
    data(){
        return {
            inn_value:this.value
        }
    },
    watch:{
        value(nv){
            this.inn_value = this.value
        },
        inn_value(nv){
            this.$emit('input',nv)
        }
    }
}
</script>

<style scoped lang="scss">
.validate-code ::v-deep .el-input-group__append{
  padding: 0;
  position: relative;
  img{
    height: 100%;
    width: 100px;
  }
}
</style>
