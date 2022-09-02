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
 
    readLocalFile({accept='',encode='utf-8'}){
      return new Promise((resolve,reject)=>{
          ex.__on_filechange=function(event){
              let files = event.target.files
              var loadCount = 0 // 已读取文件数量
              // 读取单个文件
              var out_text=''
              var loadAFile = function(file) {
                  var reader = new FileReader()
                  reader.onload = function(e) {
                      var r = this.result
                      out_text += r
                      loadCount++
                      if (loadCount == files.length) {
                          console.log('读取完毕')
                          $('#_hide_file_input').val('')
                          resolve(out_text)
                      }
                  }
                  reader.readAsText(file, encode) // 以文本形式读取

              }
              for (var i = 0; i < files.length; i++) {
                  loadAFile(files[i])
              }

          }

          if(!window._hide_file_input){
              $('body').append('<input type="file" id="_hide_file_input" style="display: none" >')
              $('#_hide_file_input').change(function(event){
                  ex.__on_filechange(event)
              })
              window._director_uploadfile_input=true
              //if(accept){
                  $('#_hide_file_input').attr('accept',accept)
              //}
              $('#_hide_file_input').click()
          }else{
              //if(accept){
                  $('#_hide_file_inputt').attr('accept',accept)
              //}
              $('#_hide_file_input').click()
          }
      })

  },
  saveLocalFile  ({content,blob, filename}) {
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      if(!blob){
        var blob = new Blob([content]);
      }
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
  }
 
}