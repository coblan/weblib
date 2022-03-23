<template>
    <div class="echarts-div">
        <div  class="mychart"></div>
    </div>

</template>
<script>

 export default {
     props:{
        option:{}
     },
     mounted(){

     },
     methods:{
         async draw(option){
             await ex.load_js(cfg.js_lib.echarts)
             
             var dom = this.$el.querySelector('.mychart')
            // var dom = document.getElementById('mychart')
             var myChart = echarts.init(dom);
        
             // 使用刚指定的配置项和数据显示图表。
           if(option){
             myChart.setOption(option);
           }else{
             myChart.setOption(this.option);
           }

         }
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
