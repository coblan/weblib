
// import axios from 'axios';
// import cfg from '../pc_cfg';
// import cfg from '../pc_cfg';
// import axios from 'axios';
import {FreePromise} from 'weblib/ex/promise'

export var network ={
    async axios_get(url,  ctx){
        if(cfg.js_lib){  // 判断是否在后台环境
            await this.load_js(cfg.js_lib.axios)
            const config = {
                headers:{
                  realtype:'json_get'
                }
              };
              
            // 因为有时请求的参数过于复杂，使用原始的get请求会出问题，所以使用了post+header来模拟get请求。
            // 后台识别到realtype=='json_get'时，就会使用fast_director_view去调用director_view。
              return axios.post(url,ctx.params,config)
        }
        else{
            return axios.get(url,ctx.params)
        }
       
      
        // return axios.get(url,ctx)
    },
    async axios_post(url,formData,config){
        if(cfg.js_lib){
            await this.load_js(cfg.js_lib.axios)
        }
       
        try{
            return await axios.post(url,formData,config)
        }catch(error){
            cfg.showError(error.toString())
        }
        
    },
    async cache(getter,setter){
        var resp =await  Promise.resolve(getter())
        if(resp){
            return resp
        }else{
            var resp = await Promise.resolve(setter()) 
            return resp
        }
    },
    async uploadFile(url,file_src,{file_name='default',process_handler= (progressEvent) => console.log(progressEvent.loaded)  }={} ){
        let config = {
            headers:{'Content-Type':'multipart/form-data;charset=UTF-8'},
            onUploadProgress: process_handler
          }; //添加请求头
          let formData = new FormData();
          formData.append(file_name, file_src);
        //   await this.load_js(cfg.js_lib.axios)
        //   return axios({
        //     url: url,
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     },
        //     data: formData,
        //   })
        
          return  this.axios_post(url,formData,config)
    },
    director_get(director_name,kws,option){
        if(option){
            option.get=true
        }else{
            option = {get:true}
        }
        return this._director_call(director_name,kws,option)
    },
     director_post(director_name,kws,option){
        return this._director_call(director_name,kws,option)
    },
    async _director_call(director_name,kws,option={}){
        // 在director中使用时，可能会和原来的ex.director_call冲突，所以重命名
        var success = new FreePromise()
        if(cfg.baseUrl){
            var url = `${cfg.baseUrl}/dapi/${director_name}`
        }else{
            var url = `/dapi/${director_name}`
        }
        try{
            if(option.get){
                var resp = await this. axios_get(url, { params: kws })
            }else{
                var resp = await this.axios_post(url,kws)
            }
            if(resp.data.success){
                success.resolve(resp.data.data)
            }else{
                cfg.showError(resp.data.msg)
                cfg.hide_load()
            }
            return await success.promise
        }catch(error){
            console.log(error)
            cfg.hide_load()
            if(option.empty401){
                return {}
            }
            if( error.response.status==401){
                if(cfg.login_fun){
                    cfg.login_fun()
                }else{
                    // cfg.toast('请先登录')
                    cfg.showMsg('请先登录')
                }
                
            }else{
                if (error.message){
                    cfg.showError(error.message)
                }else{
                    cfg.showError(error.toString())
                }
            }
            // throw error
        }
    },
    // async director_call(director_name,kws,option={}){
    //     var success = new FreePromise()
    //     if(cfg.baseUrl){
    //         var url = `${cfg.baseUrl}/dapi/${director_name}`
    //     }else{
    //         var url = `/dapi/${director_name}`
    //     }
    //     try{
    //         if(option.get){
    //             var resp = await this. axios_get(url, { params: kws })
    //         }else{
    //             var resp = await this.axios_post(url,kws)
    //         }
    //         if(resp.data.success){
    //             success.resolve(resp.data.data)
    //         }else{
    //             cfg.showError(resp.data.msg)
    //             cfg.hide_load()
    //         }
    //         return await success.promise
    //     }catch(error){
    //         console.log(error)
    //         cfg.hide_load()
    //         if(option.empty401){
    //             return {}
    //         }
    //         if( error.response.status==401){
    //             if(cfg.login_fun){
    //                 cfg.login_fun()
    //             }else{
    //                 // cfg.toast('请先登录')
    //                 cfg.showMsg('请先登录')
    //             }
                
    //         }
    //         throw error
    //     }
    // },
    // get:function(url){
    //     //replace $.get
    //     return this.axios_get(url)
    // },
    post:function(url,data,callback){
        if(callback){
            ex._post(url,data,callback)
        }else{
            var p = new Promise(function(resolve,reject){
                ex._post(url,data,function(resp){
                    resolve(resp)
                },(rt)=>{
                    reject(rt)
                })
            })
            return p
        }
    },
    _post:function(url,data,callback,fail){
        var self=this
        var wrap_callback=function (resp) {
            var msg = []
            if(resp.msg ){
                if(typeof resp.msg == 'string'){
                    msg.push(resp.msg)
                }else{
                    msg = msg.concat(resp.msg)
                }
            }
            // 业务逻辑里面的msg 由正常函数去处理
            //for(var k in resp){
            //    if(resp[k] && resp[k].msg){
            //        if(typeof resp[k].msg == 'string'){
            //            msg.push(resp[k].msg)
            //        }else {
            //            msg=msg.concat(resp[k].msg)
            //        }
            //    }
            //}

            var success=true
            if(resp.success ==false ){
                success = false
            }
            if(resp.status && typeof resp.status == 'string' && resp.status != 'success'){
                success = false
            }
            //if(! success){
            //    hide_upload(300)
            //    if(resp.msg){
            //        cfg.showError(resp.msg)
            //    }
            //}else{
            //    if(resp.msg){
            //        cfg.showMsg(resp.msg)
            //    }
            //    callback(resp)
            //}

            //if (resp.status && typeof resp.status == 'string' && resp.status != 'success') {
            if (!success) {
                cfg.hide_load() // sometime
                if(fail){
                    fail(rt)
                }
            } else {
                var rt = callback(resp)
                if(rt==false){
                    return  // 模拟事件冒泡，返回false，就不继续执行下面的语句了。
                }
            }

            if(msg.length!=0){
                if(!success){
                    cfg.showError(msg.join('\n'))
                }
                // 业务逻辑里面的msg 由正常函数去处理
                //else{
                //    cfg.showMsg(msg.join('\n'))
                //}
            }


        }
        if(typeof data == "object"){
            data = JSON.stringify(data)
        }
        return $.post(url,data,wrap_callback)
    },
    load_js:function(src,success){
        if(success){
            return ex._load_js(src,success)
        }else{
            var p = new Promise((resolve,reject)=>{
                this._load_js(src,function(){
                    resolve()
                })
            })
            return p
        }
    },
    _load_js: function(src,success) {
        success = success || function(){};
        var name = src //btoa(src)
        if(!window['__js_hook_'+name]){
            window['__js_hook_'+name]=[]
        }
        window['__js_hook_'+name].push(success)
        var hooks=window['__js_hook_'+name]
        if(window['__js_loaded_'+name]){
            while (hooks.length>0){
                hooks.pop()()
            }
        }
        if(! window['__js_'+name]){
            window['__js_'+name]=true
            var domScript = document.createElement('script');
            domScript.src = src;

            domScript.onload = domScript.onreadystatechange = function() {
                if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                    window['__js_loaded_'+name]=true
                    while (hooks.length>0){
                        hooks.pop()()
                    }
                    this.onload = this.onreadystatechange = null;
                    // 让script元素显示出来
                    //this.parentNode.removeChild(this);
                }
            }
            document.getElementsByTagName('head')[0].appendChild(domScript);
        }
    },
    load_js_list:function(js_list,success){
        return new Promise( (resolve,reject)=>{
            var length = js_list.length
            ex.each(js_list,function(js){
                ex.load_js(js,function(){
                    length -=1
                    if(length ==0){
                        if(success){
                            success()
                        }
                        resolve()
                    }
                })

            })
        })

    },
    load_css:function (src) {
        var name = btoa(src)
        if(window['__src_'+name]){
            return
        }
        window['__src_'+name]=true
        var domScript = document.createElement('link');
        domScript.href = src;
        domScript.type='text/css'
        domScript.rel='stylesheet'
        document.getElementsByTagName('head')[0].appendChild(domScript);

        //$('head').append('<link rel="stylesheet" href="'+src+'" type="text/css" />')
    },
    append_css:function(style){
        if(!window.md5){
            var pro = ex.load_js('https://cdn.jsdelivr.net/npm/blueimp-md5@2.10.0/js/md5.min.js')
        }else{
            var pro = 1
        }
        Promise.all([pro]).then(()=>{
                let key = md5(style)
                if(!window['__css_'+key]){
                    $("<style type='text/css'> "+style + " </style>").appendTo("head");
                    window['__css_'+key]=true
                }
        })

    },
    load_image(url) {
        // 可以用来预加载图片
        var img = new Image();
        img.src = url;

        var p = new Promise(function(resolve,reject){
            if(img.complete) {
                //接下来可以使用图片了
                //do something here
                resolve()
            }
            else {
                img.onload = function() {
                    //接下来可以使用图片了
                    //do something here
                    resolve()
                };
            }
        })
        return p
    },
    // director_call:function(director_name,kws,callback){
    //     //var post_data=[{fun:"director_call",director_name:director_name,kws:kws}]
    //     if(callback && typeof callback=='function'){
    //             if(ex.isEmpty(kws)){
    //                 var post_data = {}
    //             }else{
    //                 var post_data= JSON.stringify(kws)
    //             }
    //         ex.post('/dapi/'+director_name,post_data,function(resp){
    //             if(resp.success){
    //                 callback( resp.data )
    //             }
    //         })
    //     }else{
    //         var worker = new DirectorCall(director_name,kws,callback)
    //         return worker.run()
    //     }
    // },
    //director_call:function(director_name,kws,callback){
    //    //var post_data=[{fun:"director_call",director_name:director_name,kws:kws}]
    //    if(ex.isEmpty(kws)){
    //        var post_data = {}
    //    }else{
    //        var post_data= JSON.stringify(kws)
    //    }
    //    if (callback && typeof callback =='object'){
    //        var option = callback
    //    }else{
    //        var option ={}
    //    }
    //    if(option.cache ){
    //        window._director_cache =  window._director_cache || {}
    //        var key = md5(director_name+JSON.stringify(kws))
    //
    //        if(window._director_cache[key]){
    //            var cache_value = window._director_cache[key]
    //            if(Array.isArray( cache_value) && typeof cache_value[0] =='function' ){
    //                // 表示前面的请求还在进行中
    //                return new Promise((resolve,reject)=>{
    //                    cache_value.push((resp)=>{
    //                        resolve(resp)
    //                    })
    //                })
    //            }else{
    //                return Promise.resolve(cache_value)
    //            }
    //        }else {
    //            // 第一个 请求 放个空函数，触发后面的 往 cache里面 插入 function
    //            window._director_cache[key] = [()=>{}]
    //        }
    //    }
    //    if(callback && typeof callback=='function'){
    //        ex.post('/dapi/'+director_name,post_data,function(resp){
    //            if(resp.success){
    //                callback( resp.data )
    //            }
    //
    //        })
    //    }else{
    //        var post_url = '/dapi/'+director_name
    //        if(option.transaction != undefined){
    //            post_url = ex.appendSearch(post_url,{transaction:option.transaction})
    //        }
    //
    //        return new Promise(function(resolve,reject){
    //         return   ex.post(post_url,post_data).then(
    //                function(resp){
    //                    if(resp.success) {
    //                        if(resp._question){
    //                            ex.eval(resp._question,{director_name:director_name,kws:kws,resolve:resolve})
    //                        }else{
    //                            resolve(resp.data)
    //                            // 缓存代码
    //                            if(option.cache ){
    //                                var cache_value = window._director_cache[key]
    //                                if(Array.isArray( cache_value) && typeof cache_value[0] =='function' ){
    //                                    ex.each( window._director_cache[key],func=>{
    //                                        func(resp.data)
    //                                    })
    //                                }
    //                                window._director_cache[key] = resp.data
    //                            }
    //                        }
    //                    }
    //                }
    //            ).catch(()=>{
    //                 reject()
    //            })
    //        })
    //    }
    //
    //},
    director(director_name){
        // 为了兼容性，暂时屏蔽 Proxy 版本的代码
        //let handler = {
        //    get: function(target, attr_name){
        //        return function (kws){
        //            if(kws == undefined){
        //                kws = {}
        //            }
        //            return ex.director_call('d.director_element_call',{director_name:director_name,attr_name:attr_name,kws:kws})
        //        }
        //    }
        //};
        //return new Proxy({},handler)

        return {
            call(methed,kws){
                  if(kws == undefined){
                       kws = {}
                   }
                 return ex.director_call('d.director_element_call',{director_name:director_name,attr_name:methed,kws:kws})
            }
        }
    },
    download:function(strPath){
            var varExt = strPath.split('.');
            //alert(varExt.length);
            if (varExt[varExt.length - 1] == "txt") {
                window.open(strPath);
            }
            else {
                var iframe;
                iframe = document.getElementById("hiddenDownloader");
                if (iframe == null) {
                    iframe = document.createElement('iframe');
                    iframe.id = "hiddenDownloader";
                    // iframe.style.visibility = 'hidden';
                    iframe.style.display = 'none';
                    iframe.style.display='none'
                    document.body.appendChild(iframe);
                }
                iframe.src = strPath;
            }
            return false;
    },
    downLoadImage(downloadName, url) {
        //url是dataurl ,或者 url
        var getImageDataURL = (image)=> {
            // 创建画布
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            // 以图片为背景剪裁画布
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // 获取图片后缀名
            const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
            // 某些图片 url 可能没有后缀名，默认是 png
            return canvas.toDataURL('image/' + extension, 1);
        }

        const tag = document.createElement('a');
        // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
        tag.setAttribute('download', downloadName.replace(/\./g, '。'));

        const image = new Image();
        // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
        image.src = url //+ '?time=' + new Date().getTime();
        //重要，设置 crossOrigin 属性，否则图片跨域会报错
        image.setAttribute('crossOrigin', 'Anonymous');
        // 图片未加载完成时操作会报错
        image.onload = () => {
            tag.href = getImageDataURL(image);
            tag.click();
        };
    },
    selectFile({accept}={}){
        return new Promise((resolve,reject)=>{
            if(!window._director_uploadfile_input) {
                window._director_uploadfile_input = true

                var input = document.createElement("input");
                input.type = 'file'
                input.id = '__director-upload-file-input'
                input.style = 'display: none'
                document.body.appendChild(input)
            }else {
                var input = document.querySelector('#__director-upload-file-input')
            }
            if(accept){
                input.accept = accept
            }
            input.value=''
            input.onchange = function(event){
                // this.__on_filechange(event)
                resolve(event.target.files)
            }
            input.click()
                // $('#__director-upload-file-input').click()

        })
    },
   async  uploadfile({url,accept}={}){
        // TODO 这个函数是从director继承过来的，分拆出了this.selectFile函数，但是后面上传逻辑还未落实
        this.__upload_url =url
        var new_selected_files = await  this.selectFile({accept})
        var up_url = this.__upload_url || '/d/upload?path=general_upload&split=date'
        cfg.show_load()
        this.uploads(new_selected_files,up_url,function(url_list){
            cfg.hide_load()
            var input = document.querySelector('#__director-upload-file-input')
            // $('#__director-upload-file-input').val('')
            input.value =''
            resolve(url_list)
        })



    },
    refresh_row(row){
        return ex.director_call(row._director_name,{pk:row.pk}).then(resp=>{
            ex.vueAssign(row,resp.row)
        })
    }
}