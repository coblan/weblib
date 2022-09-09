<template>
    <div>
        <van-field
            v-model="row[head.name]"
            :name="head.name"
            :label="head.label"
            :placeholder="head.placeholder || '请输入'"
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