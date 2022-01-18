<template>
  <div class="search-input"  @click.stop>

    <div>
      <input id="myinput"  type="text" v-model="word" @keyup.enter="onSubmit">
    </div>
    <div v-if="!stretched" @click="onStrech" class="search-placeholder">
      <span style="white-space: nowrap;font-size: 90%">{{placeholder}}</span>
    </div>
     <img style="position: relative;top:1px;display: inline-block;margin-left: 6px;" @click="onSubmit" class="clickable" :src="require('weblib/assets/search.png')" alt="">
  </div>
</template>
<script>
export  default  {
  props:{
    placeholder:{
      default:'搜索'
    }
  },
  data(){
    return {
      stretched:false,
      word:""
    }
  },
  methods:{
    onSubmit(){
      if(this.word){
        this.$emit('search',this.word)
      }
    },
    onStrech(){
      this.stretched = true
      document.body.addEventListener("click", ()=> {
        this.stretched = false
      }, {once : true});
      // this.$refs.myinput.
      this.$nextTick(()=>{
        this.$el.querySelector('#myinput').focus()
      })

    },
    onBlur(){
      this.stretched = false
    }
  }
}
</script>
<style scoped lang="scss">
.search-input{

  display: flex;
  border-radius: 14px;
  background-color: #F6F6F6;
  padding: 5px 8px;
  align-items: center;

  .search-placeholder{
    color: #8B8B8B;
    width: auto;
    opacity: .7;
  }
  input{
    //transition: all linear .3s;
    border: none;
    outline: none;
    background-color: transparent;
    width: 0px;
    &.stretched{
      width: 200px;
    }
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