<template>
  <input type="number" v-model="inn_value" @keypress="isNumber($event)" :placeholder="placeholder">
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
      var v = nv.replace('.e','')
      this.$emit('input',v)
    }
  },
  methods:{
    isNumber(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode== 46){
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