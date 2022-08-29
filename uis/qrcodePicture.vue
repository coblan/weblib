<template>
  <div class="qrcode-picture">
    <div class="mycode" style="height: 100%;width: 100%"></div>
  </div>

</template>
<script>
import  ex from 'weblib/ex'
export default {
  props:{
    code:{},
  },
  async mounted(){
    await ex.load_js('https://lib.baomitu.com/qrcodejs/1.0.0/qrcode.min.js')
    if(this.code){
      this.updatePicture()
    }
  },
  watch:{
    code(nv){
      this.updatePicture()
    }
  },
  methods:{
    updatePicture(){
      var self = this
      var dom = this.$el.querySelector('.mycode')
      var qrcode = new QRCode( dom , {
        text: self.code,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  }
}
</script>
<style scoped lang="scss">
.qrcode-picture{
  position: relative;

}
.mycode{
  ::v-deep{
    img{
      width: 100%;
      height: 100%;
    }
  }

}
</style>