<template>
  <div class="my-wrap">
    <slot></slot>
  </div>
</template>

<script>
import ex from 'weblib/ex'
export default {
    mounted(){
       
    },
    methods:{
        updateSize(){
                function fullsize(){
                    $('#main-panel').width( '100vw')
                    $('#main-panel').height( '100vh')
                    cfg.updateSizeConfig()
                }
                function fullheight(){
                    var hh = window.innerHeight*0.563
                    $('#main-panel').width( hh +'px')
                    $('#main-panel').height( window.innerHeight +'px')
                    $('html').css('font-size',hh * 0.1333)
            //        $(window).trigger('resize')
                    cfg.updateSizeConfig()
                }
                function fullwidth(){
                    var hh = window.innerWidth / 0.563
                    $('#main-panel').height( hh +'px')
                    $('#main-panel').width( window.innerWidth +'px')
            //        $(window).trigger('resize')
                    cfg.updateSizeConfig()
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

