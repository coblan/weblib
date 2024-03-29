
export function get_validator(){
    var validator =  {
        validate(dc,validate_dc){
            /*  
            @dc: {key1:'xxx',key2:'bbb'}
            @validate_dc:{key1:[notNull('please input value')],key2:[]}
             */
            return new Promise((resolve,reject)=>{
                var has_error = false
                for(var k in validate_dc){
                    if(has_error){break}
                    let validator_list = validate_dc[k]
                    for(var i=0;i<validator_list.length;i++){
                        let vldtor =validator_list[i] 
                        let error_msg = vldtor(dc[k])
                        if(error_msg){
                            has_error=true
                            resolve(error_msg)
                            // this.notify(error_msg)
                            // reject(error_msg)
                            break
                        }
                    }
                }
                if(!has_error){
                    resolve()
                }
            })
        },
        syncValidate(dc,validate_dc){
            var has_error = false
            for(var k in validate_dc){
                if(has_error){break}
                let validator_list = validate_dc[k]
                for(var i=0;i<validator_list.length;i++){
                    let vldtor =validator_list[i]
                    let error_msg = vldtor(dc[k])
                    if(error_msg){
                        has_error=true
                        return error_msg
                    }
                }
            }
        },
        // notify(error){
        //     cfg.toast(error)
        // },

        notNull(msg){
            return function(value){
                if(value==''||!value){
                    return msg
                }
            }
            
        },
        email(msg){
            return function(value){
                // if(!/^([a-zA-Z0-9_-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.exec(value)){
                if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(value)){
                    return msg
                }
            }
        },
        gt0(msg){
            return function(value){
                if(!value){return msg}
                else if(parseInt(value) <=0){return msg}
            }
        },
        list_not_empty(msg){
            return function(value){
                if(value.length ==0){
                    return msg
                }
            }
        },
        isTrue(msg){
            return function(value){
                if(!value){
                    return msg
                }
            }
        },
        equal(msg,word){
            return function(value){
                if(value !=word){
                    return msg
                }
            }
        },
        isChinesePhone(msg){

            return function (value){
                var valid_value = value.replace('+86-','')
                if(! /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(valid_value)){
                    return msg
                }
            }

        },
        isInt(msg){
            return function (value){
                var jj = /^\d+$/.exec(value)
                if(!jj){
                    return msg
                }
            }
        }
    }

    return validator
}
