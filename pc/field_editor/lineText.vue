<template>
    
    <el-input
        :placeholder="head.placeholder"
        :prefix-icon="head.prefix_icon"
        :show-password="head.show_password"
        :readonly="head.readonly"
        v-model="row[head.name]">
    </el-input>
</template>
<script>
export default {
    props:['head','row']
}
</script>
