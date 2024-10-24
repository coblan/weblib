
// import axios from 'axios';
// import cfg from '../pc_cfg';
// import cfg from '../pc_cfg';
// import axios from 'axios';
import cdn from '../cdn.js'
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
            // axios.get不支持参数，所以这里自动给他补上
            if(ctx.params){
                var real_url = this.appendSearch(url,ctx.params)
            }else{
                var real_url = url
            }
            // return axios.get(url,ctx.params)
            return axios.get(real_url)
        }
       
      
        // return axios.get(url,ctx)
    },
    async axios_post(url,formData,config,retry=0){
        if(cfg.js_lib){
            await this.load_js(cfg.js_lib.axios)
        }
       
        try{

            return await axios.post(url,formData,config)
        }catch(error){
            if(retry <=0){
                cfg.showError(error.toString())
            }else{
               
                var next_retry = retry-1
                console.log(`等待2秒重试,剩余重试次数${next_retry}`)
                await this.sleep(2000)
                return await this.axios_post(url,formData,config,next_retry)
            }
           
        }
        
    },
    async sleep(min_second){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve()
            }, min_second);
        } ) 
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
    async uploadFile(url,file_src,{field_name='file', file_name='default',retry=5,process_handler= (progressEvent) => console.log(progressEvent.loaded)  }={} ){
        let config = {
            headers:{'Content-Type':'multipart/form-data;charset=UTF-8'},
            onUploadProgress: process_handler
          }; //添加请求头
          let formData = new FormData();
          formData.append(field_name, file_src,file_name);
          // 上传文件默认重试5次
          return  this.axios_post(url,formData,config,retry=retry)
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
            this._post(url,data,callback)
        }else{
            var p = new Promise(function(resolve,reject){
                this._post(url,data,function(resp){
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
            return this._load_js(src,success)
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
            this.each(js_list,function(js){
                this.load_js(js,function(){
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
            var pro = this.load_js('https://cdn.jsdelivr.net/npm/blueimp-md5@2.10.0/js/md5.min.js')
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
    director(director_name){
        // 为了兼容性，暂时屏蔽 Proxy 版本的代码
        let handler = {
           get: function(target, attr_name){
               return function (kws){
                   if(kws == undefined){
                       kws = {}
                   }
                   return ex.director_post(`element/${director_name}/${attr_name}`,kws)
                //    return ex.director_call('d.director_element_call',{director_name:director_name,attr_name:attr_name,kws:kws})
               }
           }
        };
        return new Proxy({},handler)

        // return {
        //     call(methed,kws){
        //           if(kws == undefined){
        //                kws = {}
        //            }
        //          return this.director_call('d.director_element_call',{director_name:director_name,attr_name:methed,kws:kws})
        //     }
        // }
    },
    download:function(strPath){
        //老的下载，可能有问题。使用downloadFile
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
     downloadFile(url, fileName) {
        if(!fileName){
            const url_obj = new URL(url,location.origin) 
            var rt = /[^\/]+$/.exec(  url_obj.pathname )
            if(rt){
                fileName = rt[0]
            }else{
                fileName = url
            }
        }
        fetch(url, {
            method: "get",
            mode: "no-cors",
            referrerPolicy: "no-referrer",
        })
            .then((res) => res.blob())
            .then((res) => {
                const aElement = document.createElement("a");
                aElement.setAttribute("download", fileName);
                const href = URL.createObjectURL(res);
                aElement.href = href;
                aElement.setAttribute("target", "_blank");
                aElement.click();
                URL.revokeObjectURL(href);
            });
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
        /*
        这个应该是与direcor里面的update_row同一个功能啊。应该去掉
         */
        return ex.director_call(row._director_name,{pk:row.pk}).then(resp=>{
            ex.vueAssign(row,resp.row)
        })
    },
    async getFile(url){
        await this.load_js(cdn.axios)
        var pro = new FreePromise()
        axios({
            method: 'get',
            url: url,
            data: {},
            responseType: 'blob'
        }).then(res => {
            const { data } = res
            const blob = new Blob([data])
            pro.resolve(blob)
            
            // let disposition = decodeURI(res.headers['content-disposition'])
            // // 从响应头中获取文件名称
            // let fileName = disposition.substring(disposition.indexOf('fileName=') + 9, disposition.length)
            // if ('download' in document.createElement('a')) {
            //     // 非IE下载
            //     const elink = document.createElement('a')
            //     elink.download = fileName
            //     elink.style.display = 'none'
            //     elink.href = URL.createObjectURL(blob)
            //     document.body.appendChild(elink)
            //     elink.click()
            //     URL.revokeObjectURL(elink.href) // 释放URL 对象
            //     document.body.removeChild(elink)
            // } else {
            //     // IE10+下载
            //     navigator.msSaveBlob(blob, fileName)
            // }
        }).catch((error) => {
                console.log(error)
                pro.reject(error)
        })

        return pro.promise
    },
    lock_key:{},
    async keyCache(key,fun){
        var cachekey = `_cached_${key}`
        if(window[cachekey]){
            return window[cachekey]
        }else{
            if(!this.lock_key[cachekey]){
                this.lock_key[cachekey] = new ex.FreePromise()
                var rt = await fun()
                window[cachekey] = rt
                this.lock_key[cachekey].resolve(rt)
                setTimeout(()=>{
                    delete  this.lock_key[cachekey]
                },10)
                return rt
            }else{
                return  await this.lock_key[cachekey].promise
            }
            
        }

    }
}