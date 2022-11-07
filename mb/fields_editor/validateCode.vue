<template>
    <div>
        <van-field
            v-model="row[head.name]"
            :name="head.name"
            :label="head.label"
            :placeholder="head.placeholder || '请输入验证码'"
        >
        <template v-slot:button>
            <!-- <van-button size="mini" plain >获取验证码</van-button> -->
            <div class="validate-btn" @click="sendCode">{{show_label}}</div>
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
        data(){
            return {
                elapse:0,
            }
        },
        mounted(){
            setInterval(()=>{
                if(this.elapse >0){
                    this.elapse -=1
                }
            },1000)
        },
        computed:{
            show_label(){
                if(this.elapse==0){
                    return '获取验证码'
                }else{
                    return  `${this.elapse}s` 
                }
            }
        },
        methods:{
            sendCode(){
                if(this.elapse ==0){
                    this.head.sendCode({vc:this})
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .validate-btn{
        display: block;
        padding: 1px 5px;
        // backdrop-filter: invert(10%);
        border-radius: 5px;
        overflow: hidden;
        min-width: 60px;
        text-align: center;
    }

</style>