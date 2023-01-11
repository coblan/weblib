<template>
  <van-picker
      :title="title"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
  />
</template>
<script>
import  ex from '@/weblib/ex'
export  default {
  props:{
    options:{},
    title:{
      default:''
    }
  },
  computed:{
    columns(){
      return ex.map(this.options,item=>{
        return item.label
      })
    }
  },
  methods:{
    onConfirm(value, index){
      var op = this.options[index]
      this.$emit('finish',op.value)
    },
    onCancel(){
      this.$emit('finish')
    },
    onChange(){

    }
  }
}

</script>