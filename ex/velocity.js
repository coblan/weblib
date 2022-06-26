import {network} from './network.js'
export default {
    async call(func){
        var resp = await network.load_js('https://lib.baomitu.com/velocity/1.5.2/velocity.min.js')
        if ($.Velocity){
            window.Velocity = $.Velocity
        }
        func(Velocity)
    },
    async parallax(scene){
        await ex.load_js('https://lib.baomitu.com/parallax/3.1.0/parallax.min.js')
        var parallaxInstance = new Parallax(scene);
    }
}