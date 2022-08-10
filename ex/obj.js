export var obj_control={
    isEmpty:function(obj){
        if(typeof(obj)=='object'){
            var keys =Object.keys(obj)
            return keys.length == 0
        }else{
            return true
        }

        //for(var k in obj){
        //    if(/^[^_]/.exec(k)){
        //        return false
        //    }
        //}
        //return true
    },
    objContain(par,child){
        var is_contain = true
        for(var k in child){
            if(child[k] != par[k]){
                is_contain=false
                break
            }
        }
        return is_contain
    },
    mergeObject(dst,src){
        for(var k in src){
            if(dst[k] && src[k] && typeof(src[k])=='object'&& !Array.isArray(dst[k])&&!Array.isArray(src[k]) &&typeof(src[k])==typeof(dst[k]) ){
                ex.mergeObject(dst[k],src[k])
            }else{
                dst[k]=src[k]
            }
        }


        //if(Array.isArray(dst)){
        //    ex.each(dst,dst_item=>{
        //        ex.mergeObject()
        //    })
        //}
    },
    update_row(row){
        return ex.director_call('d.get_row',{pk:row.pk,director_name:row._director_name}).then((rt_row)=>{
            ex.vueAssign(row,rt_row)
        })
    },
    dotGet : function(o, s) {
        // ex.dotGet(a,'attr.att2') 访问 a.attr.att2  
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    },
    dotSet:function(par,name,obj){
        // ex.dotSet(a,'attr.att2','hello') 赋值 a.attr.att2 = 'hello'
        name = name.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        name = name.replace(/^\./, '');           // strip a leading dot
        var a = name.split('.');
        var o=par
        for (var i = 0; i < a.length-1; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return null;
            }
        }
        o[a[a.length-1]]=obj
        return o;
    },
}