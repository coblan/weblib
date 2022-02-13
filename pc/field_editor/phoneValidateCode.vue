<template>

  <el-input placeholder="请输入验证码" v-model="row[head.name]"
            prefix-icon="el-icon-mobile"
  >
    <template v-slot:append>

        <span v-if="elaspe<=0" class="send-btn"  @click="sendPhoneCode">发送验证码</span>
        <span v-else style="cursor: not-allowed">{{elaspe}}s</span>

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
    head:{},
    row:{},
    // value:{},
    // phone:{},
    // sendCode:{
    // }
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
    async sendPhoneCode(){
      var phone = this.row[this.head.phone_field]
      if(!phone){
        cfg.toast('请先输入手机号码')
        return
      }
      var myreg=/^1[3-9]\d{9}$/;
      if (!myreg.test(phone)) {
        cfg.toast('手机号码不正确')
        return;
      }
      var resp = await this.head.sendCode(phone)
      this.elaspe = 120
      this.ticktock()
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
/deep/{
  .el-input-group__append{
    width: 70px;
    text-align: center;
  }
}
.send-btn{
  cursor: pointer;
  color: #4a4a4a;
}
.send-code{
  display: inline-block;
  width: 130px;
  text-align: center;
  margin-left: 10px;
}
</style>