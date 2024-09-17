import {network} from './network.js'
import ex from './index.js'
export default {
    // async call(func){
    //     var resp = await network.load_js('https://lib.baomitu.com/velocity/1.5.2/velocity.min.js')
    //     if ($.Velocity){
    //         window.Velocity = $.Velocity
    //     }
    //     func(Velocity)
    // },
    async velocityCall(func){
        if(!window.Velocity){
            var resp = await network.load_js('https://lib.baomitu.com/velocity/1.5.2/velocity.min.js')
            if ( window.$ && $.Velocity){
                window.Velocity = $.Velocity
            }
        }
        func()
    },

    async parallax(scene){
        await ex.load_js('https://lib.baomitu.com/parallax/3.1.0/parallax.min.js')
        var parallaxInstance = new Parallax(scene);
    },
    async animateCss (element, animation, prefix = 'animate__') {
         await ex.load_css(cfg.js_lib.animate_css)
         // We create a Promise and return it
        return   new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node =  element //document.querySelector(element);
    
            node.classList.add(`${prefix}animated`, animationName);
    
            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
                }
    
            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });

    }
   
}