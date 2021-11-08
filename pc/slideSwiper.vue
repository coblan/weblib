<template>
    <div class="slide-swiper" >
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                    <slot name='content'>

<!--                      <div class="swiper-slide">Slide 1</div>-->
<!--                      <div class="swiper-slide">Slide 2</div>-->
<!--                      <div class="swiper-slide">Slide 3</div>-->
<!--                      <div class="swiper-slide">Slide 4</div>-->
<!--                      <div class="swiper-slide">Slide 5</div>-->
<!--                      <div class="swiper-slide">Slide 6</div>-->
<!--                      <div class="swiper-slide">Slide 7</div>-->
<!--                      <div class="swiper-slide">Slide 8</div>-->
<!--                      <div class="swiper-slide">Slide 9</div>-->

<!--                        <imageCtn class="swiper-slide" -->
<!--                            v-for="item in items" -->
<!--                            :key='item.name' -->
<!--                            :imageUrl='item.image_url'-->
<!--                            :label='item.label'-->
<!--                            :click-express='item.click_express'-->
<!--                            ></imageCtn>-->
                    </slot>
<!--              swiper滚动到最右侧，最后一个显示不出来，所以加一个占位的-->
<!--              在这里放，可能引起 第一个元素 异常！！！  现在最好放到slot里面去-->
<!--              <div class="swiper-slide"></div>-->
            </div>

            <!-- Add Pagination -->
            <div v-if="showPagination" class="swiper-pagination swiper-pagination-white"></div>
            <!-- Add Arrows -->
<!--                          <div class="swiper-button-next swiper-button-white"></div>-->
<!--                          <div class="swiper-button-prev swiper-button-white"></div>-->

<!--            <template v-if='showArrow'>-->
<!--              <div class="swiper-button-prev">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>-->
<!--              </div>-->
<!--              <div class="swiper-button-next">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>-->
<!--              </div>-->
<!--            </template>-->
            
        </div>
      <div class="swiper-container2" v-show='showArrow && loaded'>
          <div class="swiper-button-prev" :style="mystyle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>
          </div>
          <div class="swiper-button-next" :style="mystyle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>
          </div>
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
.slide-swiper{
  position: relative;

}
.swiper-container2{
  position: absolute;
  top:0;
  left: -50px;
  right: -50px;
  bottom: 0;
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
  fill: grey;
  transform: scale(0.6);
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