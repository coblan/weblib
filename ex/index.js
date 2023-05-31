// import { cfg } from "../mb_cfg/main"

import {urlparse} from './urlparse'
import {vuetool} from './vuetools'
import {network} from './network.js'
import {code} from './code'
// import validate from './validate'
import  {collection} from  './collection'
import  {os} from './os'
import {get_validator} from './validator'
import {rabbit} from  './rabbit'
import {FreePromise} from './promise'
import {obj_control} from './obj'
import {old} from './old'
import math from "./math";
import local from "./local";
import file from './file'
// import animate from './animate'
var dayjs =  require('./dayjs.min.js') //require('dayjs')

var ex ={
    dayjs:dayjs,
    _current_index:1,
    getIndex(){
        this._current_index +=1
        return this._current_index
    },
    _bind_popstate:false,
    _popstate_map:{},
    pushState(state, unused, url,callback){
        state._index = this.getIndex()
        state.test = 123
        history.replaceState(state, unused, '');
        history.pushState('', '', url);
        if(callback){
            this._popstate_map[state._index] = callback
        }
     
        if(!this._bind_popstate){
            
            this._bind_popstate = true
            window.addEventListener('popstate' , (event) =>{
                if(event.state && event.state._index ){
                    if( this._popstate_map[event.state._index] ){
                        this._popstate_map[event.state._index] (event)
                        delete this._popstate_map[event.state._index]
                    }
                }
            })
            
        }
        
    },
    // _back_index:window.history.length,
    // canBack(){
    //     debugger
    //     if(window.history.length > this._back_index){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
}

Object.assign(ex,urlparse)
Object.assign(ex,network)
Object.assign(ex,vuetool)
Object.assign(ex,code)
// Object.assign(ex,validate)
Object.assign(ex,collection)
Object.assign(ex,rabbit)
Object.assign(ex,obj_control)
Object.assign(ex,old)
Object.assign(ex,math)
Object.assign(ex,local)
Object.assign(ex,file)
// Object.assign(ex,animate)

ex.os = os
ex.vld = get_validator()
ex.FreePromise=FreePromise

// window.ex = ex
export default ex
