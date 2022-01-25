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
    }

}