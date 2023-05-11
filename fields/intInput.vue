<template>
  <input type="tel" v-model="inn_value" @keypress="isNumber($event)" @keyup="androidAdapt($event)" :placeholder="placeholder">
</template>
<script>
export default {
  props:{
    value:{},
    placeholder:{},
  },
  data(){
    return {
      inn_value:this.value
    }
  },
  watch:{
    value(nv){
      this.inn_value = nv
    },
    inn_value(nv){
      var nv_str = nv.toString()
      var v = nv_str.replace('.','')
      this.$emit('input',v)
    }
  },
  methods:{
    regularValue(){
      var v = this.inn_value.replaceAll(/[^\d]/g,'')
      this.inn_value =v
      this.$emit('input',v)
    },
    androidAdapt(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode ==229){
        // android webview里面 全部按键都是229
        setTimeout(()=>{
          this.regularValue()
        },20)
        return
      }
    },
    isNumber(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode== 46 ){
        return evt.preventDefault();
      }
      if ((charCode >= 48 && charCode <= 57) || charCode== 46 || charCode== 45) {
        if(charCode==46 && this.row[this.head.name].indexOf('.')!=-1){
          return evt.preventDefault();
        }else{
          return true
        }
      }else{
        return evt.preventDefault();
      }
    }
  }
}
</script>