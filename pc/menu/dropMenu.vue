<template>
  <el-dropdown class="drop-menu" trigger="click">
    <span class="el-dropdown-link">
        <span>{{label}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="op in options" @click.native="onClick(op)" :key="op.name"> {{op.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

</template>
<script>
export default {
  props:{
    label:{},
    options:{}
  },
  methods:{
    onClick(op){
      if(op.onClick){
         op.onClick()
      }
    }

  }
}
</script>

<style scoped lang='scss'>
.drop-menu{
    color: inherit;
}
</style>