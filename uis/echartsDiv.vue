<template>
    <div class="echarts-div">
        <div  class="mychart"></div>
    </div>

</template>
<script>
import ex from 'weblib/ex'
 export default {
     props:{
        option:{}
     },
     mounted(){

     },
     methods:{
         async draw(option){
             await ex.load_js(cfg.js_lib.echarts)
             console.log(cfg.js_lib.echarts)

           if(!this.myChart){
             var dom = this.$el.querySelector('.mychart')
             // var dom = document.getElementById('mychart')
             this. myChart = echarts.init(dom);
           }
             // 使用刚指定的配置项和数据显示图表。
           if(option){
             this.myChart.setOption(option);
           }else{
             this.myChart.setOption(this.option);
           }

         },
     }
 }
</script>

<style scoped lang="scss">
.echarts-div{
    display: inline-block;
    position: relative;
}
.mychart{
    width: 100%;
    height: 100%;
}
</style>
