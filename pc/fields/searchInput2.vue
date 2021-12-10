<template>
    <div class="search-input2">
      <input class="my-input" type="text" @keyup.enter="onSubmit" v-model="word">
      <div class="my-button" @click="onSubmit"><i class="fa fa-search" aria-hidden="true"></i>搜索</div>
    </div>
</template>
<script>

export default{
  data(){
    return {
      word:''
    }
  },
  methods:{
    onSubmit(){
      if(this.word){
        this.$emit('search',this.word)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-input2{
  display: flex;
  .my-input{
    outline: none;
    border: none;
  }
  .my-button{
    background-color: red;
    color: white;
  }
}
</style>