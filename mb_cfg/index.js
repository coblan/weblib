// import Vue from 'vue';

import { Toast } from 'vant';
// Vue.use(Toast);

import { Dialog } from 'vant';
// Vue.use(Dialog);


// import 'vant/lib/toast/index.css';
import './page.scss'

export default {
    showMsg(msg){
        // return  MessageBox.alert(msg)
        return Dialog({ message: msg });
    },
    showError(msg){
        // return  MessageBox.alert(msg)
        return Dialog.alert({
            message: msg,
          })
    },
    confirm(msg){
        // return MessageBox.confirm(msg)
        return Dialog.confirm({
            message: msg,
            
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