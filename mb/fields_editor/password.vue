<template>
  <div>
    <van-field
        v-model="row[head.name]"
        :name="head.name"
        :label="head.label"
        type="password"
        :placeholder="head.placeholder || '请输入密码'"
    />
  </div>

</template>
<script>
export default {
  props:{
    head:[],
    row:[]
  }
}
</script>