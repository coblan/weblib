<template>
    <div class="slide-swiper" >
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                    <slot name='content'>

                      <div class="swiper-slide">Slide 1</div>
                      <div class="swiper-slide">Slide 2</div>
                      <div class="swiper-slide">Slide 3</div>
                      <div class="swiper-slide">Slide 4</div>
                      <div class="swiper-slide">Slide 5</div>
                      <div class="swiper-slide">Slide 6</div>
                      <div class="swiper-slide">Slide 7</div>
                      <div class="swiper-slide">Slide 8</div>
                      <div class="swiper-slide">Slide 9</div>
<!--                        <imageCtn class="swiper-slide" -->
<!--                            v-for="item in items" -->
<!--                            :key='item.name' -->
<!--                            :imageUrl='item.image_url'-->
<!--                            :label='item.label'-->
<!--                            :click-express='item.click_express'-->
<!--                            ></imageCtn>-->
                    </slot>
            </div>

            <!-- Add Pagination -->
            <div class="swiper-pagination swiper-pagination-white"></div>
            <!-- Add Arrows -->
          <!--                <div class="swiper-button-next swiper-button-white"></div>-->
          <!--                <div class="swiper-button-prev swiper-button-white"></div>-->

<!--            <template v-if='showArrow'>-->
<!--              <div class="swiper-button-prev">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>-->
<!--              </div>-->
<!--              <div class="swiper-button-next">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>-->
<!--              </div>-->
<!--            </template>-->
            
        </div>
      <div class="swiper-container2" v-if='showArrow'>
          <div class="swiper-button-prev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>
          </div>
          <div class="swiper-button-next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>
          </div>
      </div>
<!--      <template v-if='showArrow'>-->
<!--        <div class="swiper-button-prev">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>-->
<!--        </div>-->
<!--        <div class="swiper-button-next">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>-->
<!--        </div>-->
<!--      </template>-->

    </div>
</template>
<script>
require('./style/swiper_cus.scss')
import cdn from '../cdn.js'

// import { ref, reactive,computed ,onMounted,getCurrentInstance } from '@vue/composition-api'
import Vue from "vue";

export default {
    /**
     * 因为需要fade效果，所以使用swiper库，官方地址:https://www.swiper.com.cn/
     * 
     * 现在已经自动引入下面链接了
     * ---使用该组件时，需要注入cdn连接:
     * ---https://cdn.jsdelivr.net/npm/swiper@4.5.0/dist/js/swiper.min.js
     * ---https://cdn.jsdelivr.net/npm/swiper@4.5.0/dist/css/swiper.min.css
     * 
     * -----@height:控制整个控件高度
     * class 外部class控制外部尺寸
     * @innClass: 通过class类名控制内部宽度
     * @delay：切换速度控制
     * ------@innWidth: 控制内部宽度，innClass和innWidth只能传递一个
     */
    props:{
        items:{
            default:()=>[]
        },
        delay:{
            default:5000
        },
        // height:{
        //     default:'500px'
        // },
        // innWidth:{
        //     default:'90%'
        // },
        innClass:{},
        showArrow:{
            default:true
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
        Vue.nextTick(()=>{
            this.init()
        })
    },
    computed:{
    },
    methods:{
        async init(){
            ex.load_css(cdn.swiper_css)
            await ex.load_js(cdn.swiper_js)
            var self =this
            var swiper = new Swiper(this.$el.querySelector('.swiper-container'), {
                slidesPerView: 3,
                freeMode: true,
                spaceBetween: 30,
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
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

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
.swiper-slide{
  height: 200px;
  width: 50px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
}
.swiper-button-prev{
  //left: -50px;
}

</style>