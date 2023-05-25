
var jsdelivr_over = true
var real_cdn = {
    wowjs:'https://cdn.jsdelivr.net/npm/wow.js@1.2.2/dist/wow.min.js',
    velocity:'https://cdn.jsdelivr.net/npm/velocity-animate@1.5.2/velocity.min.js',
    animate_css:'https://cdn.jsdelivr.net/npm/animate.css@3.7.2/animate.min.css',
    stompjs:'https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js',
    layer:'https://cdn.jsdelivr.net/npm/layerui@3.1.1/src/layer.min.js',
    jquery:'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
    swiper_js:'https://cdn.jsdelivr.net/npm/swiper@4.5.0/dist/js/swiper.min.js',
    swiper_css:'https://cdn.jsdelivr.net/npm/swiper@4.5.0/dist/css/swiper.min.css',
    font_awesome: 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
    echarts:'https://lib.baomitu.com/echarts/5.2.1/echarts.min.js',
}

if(jsdelivr_over){
    Object.assign(real_cdn,{
        font_awesome: 'https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css',
        stompjs:'https://cdn.bootcdn.net/ajax/libs/stomp.js/2.3.3/stomp.min.js',
        md5:'https://lib.baomitu.com/blueimp-md5/2.19.0/js/md5.min.js',
        swiper_js:'https://lib.baomitu.com/Swiper/4.5.1/js/swiper.min.js',
        swiper_css:'https://lib.baomitu.com/Swiper/4.5.1/css/swiper.min.css',
        velocity:'https://lib.baomitu.com/velocity/1.5.2/velocity.min.js',
        animate_css:'https://lib.baomitu.com/animate.css/3.7.2/animate.min.css',
        wowjs:'https://lib.baomitu.com/wow/1.1.2/wow.min.js',
        layer:'https://lib.baomitu.com/layer/3.5.1/layer.min.js',
        axios:"https://lib.baomitu.com/axios/0.26.1/axios.min.js",

        // swiper_js :'https://lib.baomitu.com/Swiper/6.8.4/swiper-bundle.min.js',
        // swiper_css:'https://lib.baomitu.com/Swiper/6.8.4/swiper-bundle.min.js'

        
    })
}

export default real_cdn