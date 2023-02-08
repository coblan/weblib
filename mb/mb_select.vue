<template>
  <div >
    <div v-if="readonly">{{showLabel}}</div>
    <div v-else @click="showPicker = true">{{showLabel}}</div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          title="请选择"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
      />
    </van-popup>
  </div>


</template>
<script>
import  ex from '@/weblib/ex'
export  default {
  props:{
    options:{},
    value:{},
    readonly:{
      default:false,
    }
  },
  data(){
    return {
      showPicker:false,
    }
  },
  computed:{
    columns(){
      return ex.map(this.options,item=>{
        return item.label
      })
    },
    showLabel(){
      if(this.value){
        var ob= ex.findone(this.options,{value:this.value})
        return ob.label
      }else{
        return  '选择'
      }
    }
  },
  methods:{
    onConfirm(value, index){
      var op = this.options[index]
      this.$emit('input',op.value)
      this.showPicker = false
    },
    onCancel(){
      this.$emit('finish')
      this.showPicker = false
    },
    onChange(){

    }
  }
}

</script>