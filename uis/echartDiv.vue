<template>
    <div class="echarts-div">
        <div  class="mychart" ></div>
    </div>

</template>
<script>

 export default {
     props:{
        option:{}
     },
     setup(props){
     },
     mounted(){
         this.draw()
     },
     methods:{
         async draw(){
             var dom = this.$el.querySelector('.mychart')
             var myChart = echarts.init(dom);
        
             // 使用刚指定的配置项和数据显示图表。
             myChart.setOption(this.option);
         }
     }
 }
</script>

<style scoped lang="scss">
    .echart-base{
        display: inline-block;
        position: relative;
    }
    .mychart{
        width: 100%;
        height: 100%;
    }
</style>
