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
    },
    leafOnly:{
      default:true,
    }
  },
  // computed:{
  //   columns(){
  //     return [
  //       {
  //         text: '浙江',
  //         children: [
  //           {
  //             text: '杭州',
  //           },
  //           {
  //             text: '温州',
  //           },
  //         ],
  //       },
  //       {
  //         text: '福建',
  //         children: [
  //             ''
  //         ],
  //       },
  //     ]
  //   }
  // },
  data(){
    return {
      columns:[]
    }
  },
  mounted() {
    this.adaptOption()
  },
  methods:{
    adaptOption(){
        var options = ex.copy(this.options)
        var dc = {}
        ex.each(options,item=>{
          dc[item.value] = item
          item.text=item.label
        })
        ex.each(options,item=>{
          if(item.parent){
            if(!dc[item.parent].children){
              if(this.leafOnly){
                dc[item.parent].children =[]
              }else{
                dc[item.parent].children =[
                  {text:'全部'}
                ]
              }
            }
            dc[item.parent].children.push(item)
          }else{
            // 顶级选项
            this.columns.push(item)
          }
        })
    },
    onConfirm(value, index){
      var out_value = {
        labels:[],
        values:[]
      }
      var level_dc = this.columns
      for(var i=0;i<index.length;i++){
        var ii = index[i]
        level_dc = level_dc[ii]
        if(level_dc.value){
          out_value.values.push(level_dc.value)
          out_value.labels.push(level_dc.label)
          level_dc = level_dc.children
        }else{
          break
        }
      }

      // if(this.leafOnly){
      //
      // }else{
      //   out_value.labels = value
      //   out_value.value =
      // }
      var op = this.options[index]
      this.$emit('finish',out_value)
    },
    onCancel(){
      this.$emit('finish')
    },
    onChange(){

    }
  }
}

</script>