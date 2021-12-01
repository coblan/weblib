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

                        

           <!-- <template v-if='showArrow'>
             <div class="swiper-button-prev">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>
             </div>
             <div class="swiper-button-next">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>
             </div>
           </template> -->
            
        </div>

     <!-- <template v-if='showArrow'>
       <div class="swiper-button-prev">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" /></svg>
       </div>
       <div class="swiper-button-next">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" /></svg>
       </div>
     </template> -->

    </div>
</template>
<script>

import cdn from '../cdn.js'

export default {
    props:{
        showPagination:{
          default: true,
        },
        showArrow:{
            default:true
        },
        slidesPerView:{
            default:1,
        },
        delay:{
            default:3000,
        }

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
            ex.load_css(cdn.swiper_css)
            await ex.load_js(cdn.swiper_js)
            var self =this
            var swiper = new Swiper(this.$el.querySelector('.swiper-container'), {
                slidesPerView: this.slidesPerView ,
                // freeMode: true,
                spaceBetween: 30,
                // effect: 'fade',
                loop: true,
                autoplay: {
                    delay: this.delay ,
                    disableOnInteraction: false,
                },

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
.swiper-button-next{
  //right: -50px;
}
.swiper-button-prev{
  //left: -50px;
}

</style>