<template>
    <div class="slide-swiper" >
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                    <slot>

                    <!-- <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                    <div class="swiper-slide">Slide 4</div>
                    <div class="swiper-slide">Slide 5</div>
                    <div class="swiper-slide">Slide 6</div>
                    <div class="swiper-slide">Slide 7</div>
                    <div class="swiper-slide">Slide 8</div>
                    <div class="swiper-slide">Slide 9</div> -->

                    </slot>
            </div>

            <!-- Add Pagination -->
            <div v-if="showPagination" class="swiper-pagination swiper-pagination-white"></div>
            <!-- Add Arrows -->
            <template v-if='showArrow'>
                <div class="swiper-button-next swiper-button-white"></div>
                 <div class="swiper-button-prev swiper-button-white"></div>
            </template>

                        
            
        </div>



    </div>
</template>
<script>

import cdn from '../cdn.js'
import ex from 'weblib/ex'
export default {
    props:{
        showPagination:{
          default: false,
        },
        showArrow:{
            default:false
        },
        slidesPerView:{
            default:'auto',
        },
        delay:{
            default:3000,
        },
        speed:{
            default:3000,
        },
      direction: {
          default:"horizontal",//"vertical"
      },

    },
    components:{

    },
     data(){
        return {
            // activeIndex:0,
        }
    },
    mounted(){
        // Vue.nextTick(()=>{
        //     this.init()
        // })
    },
    computed:{
    },
    methods:{
        async update(){
            ex.load_css(cfg.js_lib.swiper_css)
            await ex.load_js(cfg.js_lib.swiper_js)
            var self =this
            var mySwiper = new Swiper(this.$el.querySelector('.swiper-container'), {
                slidesPerView: this.slidesPerView ,
                freeMode: true,
                speed:this.speed,
                spaceBetween: 20,
                 centeredSlides: false,
                // effect: 'fade',
                loop: true,
                // autoplay:true,
                // autoplay:{
                //     delay:100,
                // },
                autoplay: {
                    delay: this.delay ,
                    disableOnInteraction: false,
                },
                // pauseOnMouseEnter:true,
                direction:this.direction,
                pagination: {
                    el: this.$el.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: self.$el.querySelector('.swiper-button-next'),
                    prevEl: self.$el.querySelector('.swiper-button-prev'),
                },
                // on:{
                //     transitionStart: function(){
                //         self.activeIndex = ( this.activeIndex -1 ) % self.items.length
                //     },
                //     transitionEnd: function(){
                //
                //     },
                // },
            });

            this.mySwiper = mySwiper

            // mySwiper.el.onmouseover = function(){
            //     mySwiper.autoplay.stop();
            //     console.log('sotp....')
            // }
            // mySwiper.el.onmouseout = function(){
            //     mySwiper.autoplay.start();
            //     console.log('start....')
            // }
        },
        stop(){
            if(this.mySwiper){
                this.mySwiper.autoplay.stop()
            }
        },
        play(){
            if(this.mySwiper){
                this.mySwiper.autoplay.start()
            }
        },
        on_click(item){

        }
    }
}
</script>
<style scoped lang='scss'>
//替换箭头颜色用的
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev,
.swiper-button-prev, 
.swiper-container-rtl .swiper-button-next{
    background-image: none;
}


.slide-swiper{
  position: relative;
}

.swiper {
  width: 100%;
  height: 100%;
}


.swiper-slide {
 text-align: center;
 font-size: 18px;
 //background: #fff;

 /* Center slide text vertically */
 display: -webkit-box;
 display: -ms-flexbox;
 display: -webkit-flex;
 display: flex;
 -webkit-box-pack: center;
 -ms-flex-pack: center;
 -webkit-justify-content: center;
 justify-content: center;
 -webkit-box-align: center;
 -ms-flex-align: center;
 -webkit-align-items: center;
 align-items: center;
}

// .swiper-slide img {
//  display: block;
//  width: 100%;
//  height: 100%;
//  object-fit: cover;
// }

.swiper-button-my-color{
  color: grey;
  background-color: grey;
}


.swiper-button-next,
.swiper-button-prev,
.swiper-container-rtl .swiper-button-prev,
.swiper-container-rtl .swiper-button-next{
  fill: grey;
  transform: scale(0.6);
  //position: relative;
}

.swiper-container-free-mode>.swiper-wrapper { 
    -webkit-transition-timing-function: linear; /*之前是ease-out*/ 
    -moz-transition-timing-function: linear; 
    -ms-transition-timing-function: linear; 
    -o-transition-timing-function: linear; 
    transition-timing-function: linear; 
    margin: 0 auto; 
}

</style>