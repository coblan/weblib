<template>
    <div class="free-swiper" :style="us_style">
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                    <slot name='content'>
<!--                        <div class="swiper-slide">Slide 1</div>-->
<!--                        <div class="swiper-slide">Slide 2</div>-->
<!--                        <div class="swiper-slide">Slide 3</div>-->
<!--                        <div class="swiper-slide">Slide 4</div>-->
<!--                        <div class="swiper-slide">Slide 5</div>-->
<!--                        <div class="swiper-slide">Slide 6</div>-->
<!--                        <div class="swiper-slide">Slide 7</div>-->
<!--                        <div class="swiper-slide">Slide 8</div>-->
<!--                        <div class="swiper-slide">Slide 9</div>-->

                    </slot>
            </div>

            <!-- Add Pagination -->
            <div v-if="showPagination" class="swiper-pagination swiper-pagination-white"></div>
            <!-- Add Arrows -->
<!--                         <div class="swiper-button-next swiper-button-white"></div>-->
<!--                         <div class="swiper-button-prev swiper-button-white"></div>-->

            <template v-if='showArrow'>
              <div class="swiper-button-prev" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>
              </div>
              <div class="swiper-button-next" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>
              </div>
            </template>
            
        </div>
    </div>
</template>
<script>
require('./style/swiper_cus.scss')
import cdn from '../cdn.js'

// import { ref, reactive,computed ,onMounted,getCurrentInstance } from '@vue/composition-api'
import Vue from "vue";

export default {
    props:{
        showPagination:{
          default: false,
        },
        showArrow:{
            default:true
        },
        slidesPerView:{
            default:3,
        },
        spaceBetween:{
            default:30, // 这个属性好像在free模式下没用，全部由slidesPerView 进行控制了
        },
        arrowScale:{
           default:0.6
        },
        arrowColor:{
          default:'grey'
        }

    },
    components:{

    },
     data(){
        return {
            // activeIndex:0,
            loaded:false,
        }
    },
    mounted(){
        // Vue.nextTick(()=>{
        //     this.init()
        // })
    },
    computed:{
      us_style(){
        return {
          '--arrow_color':this.arrowColor,
          '--arrow-scale':`scale(${this.arrowScale})`,
        }
      },
      mystyle(){
        if(this.arrowScale){
          return {
            transform:`scale(${this.arrowScale})`
          }
        }else{
          return  {}
        }
      }
    },
    methods:{
        async update(){
            ex.load_css(cdn.swiper_css)
            await ex.load_js(cdn.swiper_js)
            var self =this
            var swiper = new Swiper(this.$el.querySelector('.swiper-container'), {
                slidesPerView:  this.slidesPerView || 'auto' ,
                freeMode: true,
                spaceBetween: this.spaceBetween,
                // effect: 'fade',
                // loop: true,
                // autoplay: {
                //     delay: this.delay ,
                //     disableOnInteraction: false,
                // },

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
            this.loaded = true
        },
        on_click(item){

        }
    }
}
</script>
<style scoped lang='scss'>
.free-swiper{
  position: relative;
  width: 100%;
  height: 100%;
}
.slide-swiper{
  position: relative;
}

.swiper {
  width: 100%;
  height: 100%;
}


//.swiper-slide {
//  text-align: center;
//  font-size: 18px;
//  background: #fff;
//
//  /* Center slide text vertically */
//  display: -webkit-box;
//  display: -ms-flexbox;
//  display: -webkit-flex;
//  display: flex;
//  -webkit-box-pack: center;
//  -ms-flex-pack: center;
//  -webkit-justify-content: center;
//  justify-content: center;
//  -webkit-box-align: center;
//  -ms-flex-align: center;
//  -webkit-align-items: center;
//  align-items: center;
//}
.swiper-slide{
  //height: 200px;
  //width: 50px;
}
//.swiper-slide img {
//  display: block;
//  width: 100%;
//  height: 100%;
//  object-fit: cover;
//}

.swiper-button-my-color{
  color: grey;
  background-color: grey;
}


.swiper-button-next,
.swiper-button-prev,
.swiper-container-rtl .swiper-button-prev,
.swiper-container-rtl .swiper-button-next{
  fill: var(--arrow_color) ; // grey;
  transform: var(--arrow-scale); //  scale(0.6);
  //position: relative;
}
.swiper-button-next{
  //right: -50px;
  // max-width: 30px;
  // max-height: 30px;
}
.swiper-button-prev{
  //left: -50px;
  // max-width: 30px;
  // max-height: 30px;
  // overflow: hidden;
}

</style>