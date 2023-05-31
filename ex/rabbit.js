//rabbit={{ rabbit | jsonify }}
// import cdn from 'weblib/cdn.js'
import  {collection} from  './collection'
export var rabbit={
    /*
     ctx={
        url:'ws://localhost:15674/ws',
        user:'guest',
        pswd:'guest',
    }
    * */

    getStomp({url,user,pswd}){
        return new Promise((resolve,reject)=>{
             ex.load_js(cfg.js_lib.stompjs).then(()=>{
                let client = Stomp.client(url);
                client.reconnect_delay = 5000;
                function on_connect(x){
                    resolve(client)
                }
                function on_error(x){
                    console.log('stompjs link error')
                    setTimeout(()=>{
                        client.connect(user, pswd, on_connect, on_error, '/');
                    },10000)
                }
                client.connect(user, pswd, on_connect, on_error, '/');
             })
           
        })
      
    },

    stompInit(ctx){
        var self = this
        var stompObj ={
            _stomp_client:null,
            // _lstool_list:[],
            _lstool:null,
            init(){
                this._stomp_client = Stomp.client(ctx.url);
                var on_connect = (x)=> {
                    //gb.toast("websocket 链接成功")
                    // ex.each(this._lstool_list,(lstool)=>{
                    //     lstool.peekListen()
                    // })
                    if(this._lstool){
                        this._lstool.peekListen()
                    }
    
                };
    
                var on_error =  (e)=> {
                    console.log(e)
                    if(this._lstool){
                        this._lstool.cacheListened()
                    }
                    setTimeout( ()=> {
                        this._stomp_client = Stomp.client(ctx.url);
                        this._stomp_client.connect(ctx.user, ctx.pswd, on_connect, on_error, ctx.virtual_host || '/');
                        this.updateClient()
                    }, 10000)
                };
                this._stomp_client.connect(ctx.user, ctx.pswd, on_connect, on_error, ctx.virtual_host || '/');
                this.updateClient()

                
            },
            stompListen(url,callback){
                this._lstool.addListen(url,callback)
                // if(!this._lstool){
                //     this._lstool = new ListenTool(this, ele => {
                //         return this._stomp_client.subscribe(url, callback);
                //     });
                // }else{
                //     this._lstool.addListen(url,callback)
                // }
                
                // this._lstool.addListen(url)

                // this._lstool_list.push(lstool)

                // var lstool = new ListenTool(this, ele => {
                //     return this._stomp_client.subscribe(url, callback);
                // });
                // lstool.addListen(url)
                // this._lstool_list.push(lstool)
            },
            stompUnListen(url){
                if(this._lstool){
                    this._lstool.unListen(url)
                }
            },
            oneListen(url,callback){
                let ls =[...this._lstool.needListen,...this._lstool.listened ]  
                if(!self.isin(url,ls)){
                    this._lstool.addListen(url,callback)
                }
            },
            replaceListen(url,callback){
                let ls =[...this._lstool.needListen,...this._lstool.listened ]  
                if(self.isin(url,ls)){
                    this._lstool.unListen(url)
                }
                this._lstool.addListen(url,callback)
            },
            regStopListen(regexp){
                let ls =[...this._lstool.needListen,...this._lstool.listened ] 
                let reg = new RegExp(regexp) 
                self.each(ls,url=>{
                    if(reg.exec(url)){
                        this._lstool.unListen(url)
                    }
                })
            },
            closeDebug(){
                this.close_debug=true
                this.updateClient()
            },
            updateClient(){
                if(this._stomp_client){
                    if(this.close_debug){
                        this._stomp_client.debug=null
                    }
                }
               
            }
        }
        stompObj._lstool=new ListenTool(stompObj)
        this.load_js(cfg.js_lib.stompjs, ()=> {
            stompObj.init()
        })
        return stompObj
    },


}



class ListenTool {
    constructor(par) {
        this.needListen = [];
        this.listened = [];
        this.callbacks = {};
        this.par=par
        // this.stomp_client = stomp_client;
        this.listenedSocket = {};
    }
    addListen(ele,callback) {
        // ele的核心作用是标识该 订阅对象， 以便在初始，出错重连等情况下的 排队，
        if(!this.callbacks[ele]){
            this.callbacks[ele] = [callback]
        }else{
            this.callbacks[ele].push(callback)
        }

        if (collection.isin(ele, this.listened) || collection.isin(ele, this.needListen)) {
            this.listened.push(ele);
        } else {
            this.needListen.push(ele);
            this.peekListen();
        }
    }
    peekListen() {
        if (!this.needListen || !this.par._stomp_client || !this.par._stomp_client.connected) {
            return;
        }
        let self = this;
        this.needListen.forEach(ele => {
            this.listened.push(ele);
            if (!this.listenedSocket[ele]) {
                this.listenedSocket[ele] = this.par._stomp_client.subscribe(ele, (resp)=>{
                    collection.each(this.callbacks[ele],callback=>{
                        callback(resp)
                    })
                });  
               } 
        });
        this.needListen = [];
    }
    unListen(ele) {
        if(this.listenedSocket[ele]){
            this.listenedSocket[ele].unsubscribe()
            delete this.listenedSocket[ele]
        }
        delete this.callbacks[ele]
        collection.remove(this.listened,ele)
        collection.remove(this.needListen,ele)
    
       
        // 现在直接停止该项url的监听
        // if(ex.isin(ele,this.listened)){
        //     this.listened.splice(this.listened.indexOf(ele),1)
        // }else if(ex.isin(ele,this.needListen )){
        //     this.needListen.splice(this.needListen.indexOf(ele),1)
        // }

        // if (
        //     !ex.isin(ele, this.listened) &&
        //     !ex.isin(ele, this.needListen) &&
        //     this.listenedSocket[ele]
        // ) {
        //     this.listenedSocket[ele].unsubscribe();
        //     delete this.listenedSocket[ele];
        // }
    }
    cacheListened() {
        if (this.listened.length > 0) {
            this.needListen = this.needListen.concat(this.listened);
            this.listened = [];
        }
        this.listenedSocket = {};
    }

}



