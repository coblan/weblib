<template>
  <div class="out-wrap">
    <div class="inn-wrap beauty-scorll-bar">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import ex from 'weblib/ex'
export default {
    mounted(){
       this.updateSize()
    },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
    methods:{
      myEventHandler(){
        this.updateSize()
      },
        updateSize(){
          var dom = this.$el.querySelector('.inn-wrap')
                function fullsize(){
                  dom.style.width = '100vw'
                  dom.style.height = '100vh'
                  document.documentElement.style.fontSize ='13.33333vw'
                    // cfg.updateSizeConfig()
                }
                function fullheight(){
                  var hh = window.innerHeight*0.563
                  dom.style.width = hh +'px'
                  dom.style.height = window.innerHeight +'px'
                  // html.style.fontSize= (hh/750)+'px'
                  document.documentElement.style.fontSize = hh/7.5 +'px'
                  // $('html').css('font-size',hh * 0.1333)

                    // cfg.updateSizeConfig()
                }
                function fullwidth(){
                    var hh = window.innerWidth / 0.563
                    dom.style.height=  hh +'px'
                    dom.style.width = window.innerWidth +'px'

                    // cfg.updateSizeConfig()
                }
                if(ex.os.isPc && !ex.os.isTablet){
                    fullheight()
                }else if(ex.os.isTablet){
                    fullsize()

                }else{
                    fullsize()
                }
        }
    }
}

</script>
<style>
.out-wrap{
  background-color: grey;
  width: 100vw;
  height: 100vh;
}
.inn-wrap{
  background-color: white;
  margin: auto;
  overflow: auto;

}
</style>

