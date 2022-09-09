<template>
    <div>
        <van-field
            v-model="row[head.name]"
            :name="head.name"
            :label="head.label"
            :placeholder="head.placeholder || '请输入'"
        >
        <template v-slot:button>
            <!-- <van-button size="mini" plain >获取验证码</van-button> -->
            <div class="validate-btn">获取验证码</div>
        </template>
    </van-field>
    </div>
</template>
<script>

    export default {
        props:{
            head:{},
            row:{}
        },
    }
</script>
<style scoped lang="scss">
    .validate-btn{
        display: block;
        padding: 1px 5px;
        // backdrop-filter: invert(10%);
        border-radius: 5px;
        overflow: hidden;
    }

</style>