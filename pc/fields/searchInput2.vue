<template>
    <div class="search-input2">
      <input class="my-input" type="text" @keyup.enter="onSubmit" v-model="word" placeholder="请输入查询信息">
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
    flex-grow: 10;
    background-color: #dadada;
    &:focus{
      background-color: white;
    }
  }
  .my-button{
    cursor: pointer;
    background-color: #94030e;
    color: white;
    font-size: 90%;
    padding: 3px 8px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>