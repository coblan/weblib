// import Vue from 'vue';

import { Toast } from 'vant';
// Vue.use(Toast);

import { Dialog } from 'vant';
import ex from '../ex';
// Vue.use(Dialog);


// import 'vant/lib/toast/index.css';
import './page.scss'

import {pop_vue_com_vant} from './vanPop.vue'
import cdn from '../cdn'
export default {
    js_lib:cdn,
    async pop_vue_com(com,ctx){
        
        var option = {}
        ex.pushState({},'','',()=>{
            option.close()
        })

        var resp = await pop_vue_com_vant(com,ctx,option)
        history.back()
        // history.back造成后续 vant confirm之类的窗口 弹不出来。这里要等待几秒返回 才行。
         var p = new ex.FreePromise()
         setTimeout(()=>{
           p.resolve()
         },10)
         await p.promise
        return resp
    },
    showMsg(msg,{title,confirmButtonText='确定',}={}){
        // return  MessageBox.alert(msg)
        return Dialog({ message: msg, confirmButtonText,title});
    },
    showError(msg){
        // return  MessageBox.alert(msg)
        return Dialog.alert({
            message: msg,
          })
    },
    confirm(msg,{confirmButtonText='确定'}={}){
        // return MessageBox.confirm(msg)
        return Dialog.confirm({
            message: msg,
            confirmButtonText:confirmButtonText,
          })
    },
    show_load(msg){
        // return Indicator.open({spinnerType: 'fading-circle'})
        if(!this._loading){
            this._loading= Toast.loading({
                 message: msg,
                duration:0,
                forbidClick: true,
            });
        }
    },
    toast(msg){
        Toast(msg);
    },
    hide_load(){
        // Indicator.close()
        if(this._loading){
            this._loading .clear()
            delete this._loading
        }
        // Toast.clear()
    },

    // openPage(name,data){

    // }
}