<template>
    <van-form @submit="onSubmit">
        <component class="field-row" v-for="head in heads" :key="head.name" :is="head.editor" :head="head" :row="row"></component>

<!--        <van-field-->
<!--            v-model="username"-->
<!--            name="用户名"-->
<!--            label="用户名"-->
<!--            placeholder="用户名"-->
<!--            :rules="[{ required: true, message: '请填写用户名' }]"-->
<!--        />-->
<!--        <van-field-->
<!--            v-model="password"-->
<!--            type="password"-->
<!--            name="密码"-->
<!--            label="密码"-->
<!--            placeholder="密码"-->
<!--            :rules="[{ required: true, message: '请填写密码' }]"-->
<!--        />-->

    </van-form>
</template> 

<script>
import fields_editor from './fields_editor/index.js'
    export default {
        props:{
            heads:{},
            row:{},
        },
        data(){
            return {
                username:'',
                password:''
            }
        },
        methods:{
            onSubmit(){
                
            }
        }
    }
</script>

<style scoped lang="scss">
.label-none{
  ::v-deep{
    .van-field__label{
      display: none;
    }
  }
}
.label-top{
  ::v-deep{
    .van-cell{
      display: block;
    }
  }
}
.dark{
  ::v-deep{
    .van-field{
      background-color: rgba(255,255,255,.1);
    }
    .van-cell{
      padding: .26rem .3rem;
    }
    input{
      color: white;
    }
    .van-cell::after{
      border-bottom: none;
    }
    .van-cell__title{
      color: white;
    }
    .van-field__control{
      color: white;
    }
    .validate-btn{
      color: #ccc8ce;
      background-color: #4a474d;
      font-size: 80%;
      border-radius: .3rem;
    }
  }
}
.split-row{
  .field-row{
    margin: .2rem 0;
  }
}
</style>
