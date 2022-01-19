<template>
  <div class="search-input"  >
    <input id="myinput"  type="text" v-model="word" @keyup.enter="onSubmit" :placeholder="placeholder">
     <img style="position: relative;top:1px;display: inline-block;margin-left: 6px;" @click="onSubmit" class="clickable" :src="require('weblib/assets/search.png')" alt="">
  </div>
</template>
<script>
export  default  {
  props:{
    placeholder:{
      default:'搜索'
    },
    value:{

    }
  },
  data(){
    return {
      stretched:false,
      word:this.value
    }
  },
  watch:{
    value(nv){
      this.word = nv
    }
  },
  methods:{
    onSubmit(){
      this.$emit('input',this.word)
    },
  }
}
</script>
<style scoped lang="scss">
.search-input{
  display:  inline-block;
  display: flex;

  background-color: #F6F6F6;
  padding: 5px 8px;
  align-items: center;

  input{
    //transition: all linear .3s;
    border: none;
    outline: none;
    background-color: transparent;
  }
}
//.other-place{
//  position: fixed;
//  top:0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  background-color: red;
//  z-index: -1;
//}
</style>