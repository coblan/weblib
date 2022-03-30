<template>
    <el-input class="validate-code" placeholder="验证码" v-model="row[head.name]">
          <template slot="append" ><img :src="head.validate_image" alt=""></template>
     </el-input>
</template>
<script>
export default{
    props:{
        head:{},
        row:{},
        // value:{},
        // imageUrl:{},
    },
    data(){
        return {
            inn_value:this.row[this.head.name]
        }
    },
 
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
