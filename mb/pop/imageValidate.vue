<template>
  <div class="out-wrap">
    <div style="height: .6rem;width: 100%;text-align: center;font-weight: bold">验证码</div>
    <div class="my-input">
      <input style="width: 3.6rem;border: none;" type="text" placeholder="图形验证码" v-model="vcode">
      <img style="width: 2rem" @click="update_code" :src="img_url" alt="">
    </div>
    <div style="display: flex;justify-content: center">
      <div class="my-btn" style="width: 4rem;margin: .3rem auto" @click="submit">确定</div>
<!--      <van-button style="width: 4rem;margin: .3rem auto" @click.native="submit" type="primary" size="small">确定</van-button>-->
    </div>
  </div>
</template>
<script>
import  ex from 'weblib/ex'
// import mybtn from '@/components/mybtn.vue'
export default {
  components:{
    // mybtn,
  },
  props:{
    image_fun:{}
  },
  data(){
    return {
      img_url:'',
      vkey:'',
      vcode:'',
    }
  },
  async mounted() {
      this.update_code()
  },
  methods:{
    async update_code(){
      var resp  = await this.image_fun()
      this.img_url = resp.image_url
      this.vkey = resp.vkey
    },
    async submit(){
      var dc = {
        vcode:this.vcode
      }
      var error = await ex.vld.validate(dc,{
        vcode:[ex.vld.notNull('请输入图形验证码')]
      })
      if(error){
        cfg.toast(error)
        return
      }
      this.$emit('finish',{vkey:this.vkey,vcode:this.vcode})
    }
  }
}
</script>
<style scoped lang="scss">
.my-input{
  display: flex;
  border: 1px solid #c2c2c2;
  padding: .1rem;
  position: relative;
  justify-content: space-between;
  box-sizing: border-box;
}
.out-wrap{
  width: 6rem;
  height: 2.6rem;
  background-color: white;
  padding: .2rem;
  border-radius: .1rem;
}

.my-btn{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: .8rem;
  background-color: #f5900d;
  border-radius: .5rem;
  color: white;

}
</style>