// [TODO] 还未完成

export default  {
    // uploads:function (files,url,success,progress) {
    //     if(ex.is_fun(url)){
    //         var progress = success
    //         var success = url
    //         var url='/d/upload'
    //     }else{
    //         var url=url||'/d/upload'
    //     }

    //     var fd = new FormData();
    //     for(var x=0;x<files.length;x++){
    //         var file=files[x]
    //          fd.append(file.name,file);
    //     }
    //     $.ajax({
    //         url:url,
    //         type:'post',
    //         data:fd,
    //         contentType: false,
    //         success:success,
    //         processData:false, 
    //        xhr:function() {
    //             var xhr = new window.XMLHttpRequest();
    //             xhr.upload.addEventListener("progress", function(evt) {
    //                 if (progress &&evt.lengthComputable) {
    //                     var percentComplete = evt.loaded / evt.total;
    //                     progress(percentComplete)
    //                     //console.log('进度', percentComplete);
    //                 }
    //             }, false);

    //             return xhr;
    //         }
    //     })
    // },
    async uploadFormData(FormData,url){
        // 上传formdata，可以携带文件，blob等等
        await this.load_js(cfg.js_lib.axios)
        // return axios.post(url, FormData, {'Content-Type':'multipart/form-data'})
       return axios({
            method: 'post',
            url: url,
            data: FormData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
    },
 
 
}