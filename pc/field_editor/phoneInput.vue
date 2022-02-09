<template>
  <el-input placeholder="请输入手机号码" v-model="row[head.name]"
            :readonly="head.readonly"
            @focus="is_focus=true"
            @blur="is_focus=false"
            class="input-with-select phone-input"
            :class="{focus:is_focus}"
            >
  </el-input>
</template>
<script>
export  default  {
  props:{
      head:{},
      row:{},
  },
  data(){
    return {
      is_focus:false,
    }
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
.phone-input{
  border:1px solid #dadada;
  border-radius:4px;
  &.focus{
    border:1px solid #e5c878;
  }
  ::v-deep{
    .el-input-group__prepend{
      border: none;
      background-color: white;
      input{
        width:100px ;
      }
      position: relative;
      &:after{
        content: '';
        position: absolute;
        top:8px;
        bottom: 8px;
        right: 3px;
        width: 1px;
        background-color: #C4C4C4;
      }
    }
    .el-input__inner{
      border: none;
    }
  }

}
</style>