import Vue from 'vue';

import { Toast } from 'vant';
Vue.use(Toast);

import { Dialog } from 'vant';



import 'vant/lib/toast/index.css';

// import { MessageBox, } from 'mint-ui';
// import 'mint-ui/lib/indicator/style.css'; Indicator
// import 'mint-ui/lib/message-box/style.css';

// import './base.scss'
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
    show_load(){
        // return Indicator.open({spinnerType: 'fading-circle'})
        Toast.loading({
            // message: '加载中...',
            duration:0,
            forbidClick: true,
          });
    },
    toast(msg){
        Toast(msg);
    },
    hide_load(){
        // Indicator.close()
        Toast.clear()
    }
}