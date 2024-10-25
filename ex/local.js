export default {
    localGet(key,def=null){ 
        var resp = localStorage.getItem(key)
        if(resp==null){
            return def
        }else{
            return JSON.parse(resp)
        }
    },
    localSet(key,value){
        var value_str = JSON.stringify(value)
        localStorage.setItem(key,value_str)
    },
    defaultGet(value,def){
        if(value !=undefined){
            return value
        }else{
            return def
        }
    },
    localSetEx(key,value,mini_second){
        var value_str = JSON.stringify(value)
        var dc = {
            mini_second:mini_second,
            start:Date.now(),
            data:value_str
        }
        localStorage.setItem(key,JSON.stringify(dc))
    },
    localGetEx(key,def=null){
        var resp = localStorage.getItem(key)
        if(resp==null){
            return def
        }else{
            var dc = JSON.parse(resp)
            var now = Date.now()
            if(now - dc.start <dc.mini_second){
                return JSON.parse(dc.data)
            }else{
                localStorage.removeItem(key)
                return def
            }
        }
    }

}