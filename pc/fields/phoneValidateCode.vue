<template>

  <el-input placeholder="请输入验证码" v-model="inn_value"
            prefix-icon="el-icon-mobile"
  >
    <template v-slot:append>
<!--      <button type="dark" @click="sendPhoneCode" :disabled="elaspe>0" style="line-height: 28px;" class="send-code">-->
<!--        <span v-if="elaspe<=0"  >发送验证码</span>-->
<!--        <span v-else>{{elaspe}}s</span>-->
<!--      </button>-->

        <span v-if="elaspe<=0" class="clickable"  @click="sendPhoneCode">发送验证码</span>
        <span v-else>{{elaspe}}s</span>

    </template>
  </el-input>



<!--  <div class="phone-validate">-->
<!--    <el-input placeholder="请输入验证码" v-model="inn_value"></el-input>-->
<!--    <button type="dark" @click="sendPhoneCode" :disabled="elaspe>0" style="line-height: 28px;" class="send-code">-->
<!--      <span v-if="elaspe<=0"  >发送验证码</span>-->
<!--      <span v-else>{{elaspe}}s</span>-->
<!--      </button>-->
<!--  </div>-->
</template>
<script>

// import popImageValidate from './popImageValidate'
// import {pop_vue_com_ele} from 'weblib/pc_cfg/elePop'
export  default  {
  props:{
    value:{},
    phone:{},
    sendCode:{

    }
  },
  data(){

    return {
      inn_value:this.value,
      elaspe:0,
      vkey:'',
      code:'',
    }
  },
  watch:{
    value(nv){
      if(nv!=this.inn_value){
        this.inn_value=nv
      }
    },
    inn_value(nv){
      if(nv!=this.value){
        this.$emit('input',nv)
      }
    }
  },
  methods:{
    sendPhoneCode(){
      if(!this.phone){
        cfg.toast('请先输入手机号码')
        return
      }
      var myreg=/^1[3-9]\d{9}$/;
      if (!myreg.test(this.phone)) {
        cfg.toast('手机号码不正确')
        return;
      }
      this.sendCode(this.phone)
    },
    ticktock(){
      this.elaspe -=1
      if(this.elaspe>0){
        setTimeout(()=>{
          this.ticktock()
        },1000)
      }

    }
  }

}
</script>
<style lang="scss" scoped>
.phone-validate{
  display: flex;
}
.phone-validate{
  ::v-deep{
    .el-input__inner:focus{border-color:#e5c878}
  }
}
.send-code{
  display: inline-block;
  width: 130px;
  text-align: center;
  margin-left: 10px;
}
</style>