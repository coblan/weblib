<template>
    <div>
        <van-field
            :name="head.name"
            :label="head.label"
        >
            <template v-slot:input>
                <div class="contry-code" v-if="head.country_code">
                    +86
                </div>
                <input class="my-input" v-model="row[head.name]" type="text" :placeholder="head.placeholder || '请输入手机'">
                
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
    .my-input{
        background-color: inherit;
        border: none;
    }
    .contry-code{
        color: inherit;
        margin-right: 5px;
        padding-right: 5px;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            top:5px;
            bottom: 5px;
            right: 0;
            width: 1px;
            background-color: gray;
        }
    }
</style>