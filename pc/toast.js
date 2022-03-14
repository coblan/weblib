import Vue from 'vue';
import toast from './toast.vue';

let ToastConstructor = Vue.extend(Toast);

let instance;
let instances = [];

const Toast = function(options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    instance = new ToastConstructor({
        data: options
    });
    instance.id = id;
    instance.$slots.default = [instance.message];
    instance.message = null;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instances.push(instance);
    return instance.vm;
};

export default Toast;